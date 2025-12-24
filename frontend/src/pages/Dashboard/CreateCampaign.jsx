import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';

export default function CreateCampaign() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [campaignForm, setCampaignForm] = useState({
    name: "",
    objective: "",
    goalAmount: "",
    endDate: "",
  });

  const [coverFile, setCoverFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const coverPreviewUrl = useMemo(() => {
    if (!coverFile) return "";
    return URL.createObjectURL(coverFile);
  }, [coverFile]);

  useEffect(() => {
    return () => {
      if (coverPreviewUrl) URL.revokeObjectURL(coverPreviewUrl);
    };
  }, [coverPreviewUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-[#0A36F7] to-[#91F2F9] text-black font-semibold hover:opacity-90 transition-opacity"
            >
              {isSubmitting ? 'Creating…' : 'Create campaign'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
