import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, X, FileText, Video, Image as ImageIcon } from 'lucide-react';
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

  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [termsCanAccept, setTermsCanAccept] = useState(false);

  const ACCEPTED_FILE_TYPES = {
    'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'],
    'video/*': ['.mp4', '.webm', '.ogg', '.mov'],
    'application/pdf': ['.pdf'],
    'application/msword': ['.doc'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    'application/vnd.ms-excel': ['.xls'],
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
  };

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

  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.previewUrl) {
          URL.revokeObjectURL(file.previewUrl);
        }
      });
    };
  }, [files]);

  const getFileType = (file) => {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type.startsWith('video/')) return 'video';
    if (file.type === 'application/pdf') return 'pdf';
    return 'document';
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'image':
        return <ImageIcon className="w-8 h-8" />;
      case 'video':
        return <Video className="w-8 h-8" />;
      case 'pdf':
      case 'document':
        return <FileText className="w-8 h-8" />;
      default:
        return <FileText className="w-8 h-8" />;
    }
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    
    if (files.length + selectedFiles.length > 10) {
      toast.error('Maximum 10 files allowed');
      return;
    }

    const newFiles = selectedFiles.map((file) => {
      const type = getFileType(file);
      let previewUrl = null;

      if (type === 'image') {
        previewUrl = URL.createObjectURL(file);
      }

      return {
        file,
        type,
        previewUrl,
        id: Math.random().toString(36).substr(2, 9),
      };
    });

    setFiles((prev) => [...prev, ...newFiles]);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (id) => {
    setFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === id);
      if (fileToRemove?.previewUrl) {
        URL.revokeObjectURL(fileToRemove.previewUrl);
      }
      return prev.filter((f) => f.id !== id);
    });
  };

  const submitCampaign = async () => {
    if (isSubmitting) return;

    if (files.length < 3) {
      toast.error('Please upload at least 3 documents/files');
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

      // Upload all files at once using the new API function
      const filesToUpload = files.map(fileObj => fileObj.file);
      await api.uploadCampaignDocuments(campaignId, filesToUpload);

      toast.success('Campaign created successfully!');
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

    if (files.length < 3) {
      toast.error('Please upload at least 3 documents/files');
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
          {/* Documents Upload */}
          <div className="bg-[#13131A] rounded-xl p-6 sm:p-8 border border-[#1a2b6b]">
            <label className="block text-sm font-semibold text-gray-200 mb-3">
              Upload documents (minimum 3 required)
            </label>
            <p className="text-xs text-gray-400 mb-4">
              Supported: Images, Videos, PDFs, Documents. Max 10 files.
            </p>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full rounded-xl border-2 border-dashed border-[#1a2b6b] bg-[#010410] py-8 hover:border-[#0A36F7] transition-colors focus:outline-none"
            >
              <div className="flex flex-col items-center gap-2 text-gray-400">
                <FileText className="w-10 h-10" />
                <span className="text-base font-medium">Click to upload files</span>
                <span className="text-xs">
                  {files.length}/10 files uploaded (min. 3 required)
                </span>
              </div>
            </button>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept={Object.keys(ACCEPTED_FILE_TYPES).join(',')}
              className="hidden"
              onChange={handleFileSelect}
            />

            {/* File List */}
            {files.length > 0 && (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {files.map((fileObj) => (
                  <div
                    key={fileObj.id}
                    className="relative group bg-[#010410] rounded-lg border border-[#1a2b6b] overflow-hidden"
                  >
                    {fileObj.type === 'image' && fileObj.previewUrl ? (
                      <div className="relative h-32">
                        <img
                          src={fileObj.previewUrl}
                          alt={fileObj.file.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                    ) : (
                      <div className="h-32 flex items-center justify-center text-gray-400">
                        {getFileIcon(fileObj.type)}
                      </div>
                    )}

                    <div className="p-3">
                      <p className="text-sm text-gray-200 truncate">
                        {fileObj.file.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {(fileObj.file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFile(fileObj.id)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-red-500/90 hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {files.length < 3 && (
              <p className="mt-4 text-sm text-yellow-500">
                ⚠️ Please upload at least {3 - files.length} more file{3 - files.length !== 1 ? 's' : ''}
              </p>
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
                publicly, including your campaign name, objective, files, and fundraising goal.
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