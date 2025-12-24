import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';

export default function CreateCampaign() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const termsScrollRef = useRef(null);
  const [campaignForm, setCampaignForm] = useState({
    name: "",
    objective: "",
    goalAmount: "",
    endDate: "",
  });

  const [coverFile, setCoverFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [termsCanAccept, setTermsCanAccept] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function ensureProfileComplete() {
      try {
        const { data } = await api.getProfile();
        if (cancelled) return;
        if (!data?.isComplete) {
          toast.error('Please complete your profile before creating a campaign');
          navigate('/dashboard/profile', { replace: true });
        }
      } catch {
        // If profile fetch fails due to auth, dashboard guard will handle elsewhere.
      }
    }

    ensureProfileComplete();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  const coverPreviewUrl = useMemo(() => {
    if (!coverFile) return "";
    return URL.createObjectURL(coverFile);
  }, [coverFile]);

  useEffect(() => {
    return () => {
      if (coverPreviewUrl) URL.revokeObjectURL(coverPreviewUrl);
    };
  }, [coverPreviewUrl]);

  const submitCampaign = async () => {
    if (isSubmitting) return;

    if (!coverFile) {
      toast.error('Please upload a cover image');
      return;
    }

    setIsSubmitting(true);
    try {
      const { data: created } = await api.createCampaign({
        name: campaignForm.name,
        objective: campaignForm.objective,
        goal_amount: campaignForm.goalAmount,
        end_date: campaignForm.endDate,
      });

      const campaignId = created?.campaign?.id;
      if (!campaignId) throw new Error('Campaign was created but no id was returned');

      await api.uploadCampaignCover(campaignId, coverFile);

      toast.success('Campaign created');
      navigate('/dashboard');
    } catch (error) {
      console.error('Create campaign error:', error);
      const msg = error?.response?.data?.error || error?.message || 'Failed to create campaign';
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      const { data } = await api.getProfile();
      if (!data?.isComplete) {
        toast.error('Please complete your profile before creating a campaign');
        navigate('/dashboard/profile');
        return;
      }
    } catch {
      // ignore
    }

    if (!coverFile) {
      toast.error('Please upload a cover image');
      return;
    }

    setTermsCanAccept(false);
    setShowTerms(true);
    requestAnimationFrame(() => {
      const el = termsScrollRef.current;
      if (el) el.scrollTop = 0;
    });
  };

  return (
    <div className="min-h-screen bg-[#010415] text-white">
      <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
          
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#0A36F7] to-[#91F2F9] bg-clip-text text-transparent">
            Create campaign
          </h1>
          <p className="mt-2 text-gray-400">Fill in the details to start your campaign</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Cover image */}
          <div className="bg-[#13131A] rounded-xl p-6 sm:p-8 border border-[#1a2b6b]">
            <label className="block text-sm font-semibold text-gray-200 mb-3">
              Cover image
            </label>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full rounded-xl border border-[#1a2b6b] bg-[#010410] overflow-hidden focus:outline-none"
            >
              <div className="relative h-40 sm:h-48">
                {coverPreviewUrl ? (
                  <img
                    src={coverPreviewUrl}
                    alt="Cover preview"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 grid place-items-center text-gray-400">
                    <span className="text-base sm:text-lg">Upload cover image</span>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
              </div>
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setCoverFile(file);
              }}
            />

            {coverFile && (
              <div className="mt-3 flex items-center justify-between gap-3">
                <p className="text-sm text-gray-400 truncate">{coverFile.name}</p>
                <button
                  type="button"
                  onClick={() => {
                    setCoverFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  className="text-sm font-semibold text-gray-300 hover:text-white transition-colors"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          <div className="bg-[#13131A] rounded-xl p-6 sm:p-8 border border-[#1a2b6b]">
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-2">
                  Campaign name
                </label>
                <input
                  value={campaignForm.name}
                  onChange={(e) =>
                    setCampaignForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                  type="text"
                  placeholder="e.g. Help build a community well"
                  className="w-full rounded-lg border border-[#1a2b6b] bg-[#010410] px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#0A36F7] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-2">
                  Objective
                </label>
                <textarea
                  value={campaignForm.objective}
                  onChange={(e) =>
                    setCampaignForm((prev) => ({ ...prev, objective: e.target.value }))
                  }
                  required
                  rows={5}
                  placeholder="What are you raising funds for? Describe your campaign goals..."
                  className="w-full resize-none rounded-lg border border-[#1a2b6b] bg-[#010410] px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#0A36F7] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-2">
                  Goal amount
                </label>
                <input
                  value={campaignForm.goalAmount}
                  onChange={(e) =>
                    setCampaignForm((prev) => ({ ...prev, goalAmount: e.target.value }))
                  }
                  required
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full rounded-lg border border-[#1a2b6b] bg-[#010410] px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#0A36F7] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-2">
                  End date
                </label>
                <input
                  value={campaignForm.endDate}
                  onChange={(e) =>
                    setCampaignForm((prev) => ({ ...prev, endDate: e.target.value }))
                  }
                  required
                  type="date"
                  className="w-full rounded-lg border border-[#1a2b6b] bg-[#010410] px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#0A36F7] transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#13131A] text-white font-semibold border border-[#1a2b6b] hover:bg-[#1a1a24] transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-[#0A36F7] to-[#91F2F9] text-black font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {isSubmitting ? (
                <span className="inline-flex items-center justify-center">
                  <span className="w-4 h-4 border-2 border-black/60 border-t-black rounded-full animate-spin" />
                </span>
              ) : (
                'Create campaign'
              )}
            </button>
          </div>
        </form>
      </div>

      {showTerms ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-[#010410]/70 backdrop-blur-sm"
            onClick={() => setShowTerms(false)}
          />

          <div className="relative w-full max-w-2xl bg-[#010410] rounded-xl border border-gray-800/30 overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-[#1E1E2D]">
              <h3 className="text-base sm:text-lg font-semibold">Terms & legal consent</h3>
              <p className="mt-1 text-xs sm:text-sm text-gray-400">
                Scroll to the bottom to enable Accept.
              </p>
            </div>

            <div
              ref={termsScrollRef}
              className="p-4 sm:p-6 max-h-[55vh] overflow-y-auto text-sm text-gray-200 space-y-4"
              onScroll={(e) => {
                const el = e.currentTarget;
                const isAtBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 8;
                if (isAtBottom) setTermsCanAccept(true);
              }}
            >
              <p>
                By creating a campaign on Zyra, you confirm that you understand and agree to the
                following terms and consents.
              </p>
              <p>
                You are responsible for the accuracy of your campaign information, the lawful use
                of funds raised, and compliance with all applicable laws and platform rules.
              </p>
              <p>
                You confirm that you have the right to raise funds for the stated purpose and that
                your campaign does not infringe on the rights of any person or organization.
              </p>
              <p>
                You consent to Zyra processing your campaign data and displaying your campaign
                publicly, including your campaign name, objective, cover image, and fundraising goal.
              </p>
              <p>
                You acknowledge that transactions may be irreversible and that Zyra may take action
                (including pausing or removing campaigns) to protect users and platform integrity.
              </p>
              <p>
                You confirm you have read all the text above. Scroll to the end to enable the Accept
                button.
              </p>
              <div className="h-6" />
            </div>

            <div className="p-4 sm:p-6 border-t border-[#1E1E2D] flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
              <button
                type="button"
                onClick={() => setShowTerms(false)}
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#13131A] text-white font-semibold border border-[#1a2b6b] hover:bg-[#1a1a24] transition-colors"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={!termsCanAccept || isSubmitting}
                onClick={async () => {
                  setShowTerms(false);
                  await submitCampaign();
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-[#0A36F7] to-[#91F2F9] text-black font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
