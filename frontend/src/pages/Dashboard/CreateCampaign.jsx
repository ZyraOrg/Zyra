import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function CreateCampaign() {
  const navigate = useNavigate();
  const [campaignForm, setCampaignForm] = useState({
    name: "",
    objective: "",
    audienceLocation: "",
    budget: "",
    durationDays: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Wire to backend
    console.log('Campaign form:', campaignForm);
    navigate('/dashboard');
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
                  Audience location
                </label>
                <input
                  value={campaignForm.audienceLocation}
                  onChange={(e) =>
                    setCampaignForm((prev) => ({ ...prev, audienceLocation: e.target.value }))
                  }
                  required
                  type="text"
                  placeholder="e.g. Lagos, Nigeria"
                  className="w-full rounded-lg border border-[#1a2b6b] bg-[#010410] px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#0A36F7] transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-2">
                    Budget
                  </label>
                  <input
                    value={campaignForm.budget}
                    onChange={(e) =>
                      setCampaignForm((prev) => ({ ...prev, budget: e.target.value }))
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
                    Duration (days)
                  </label>
                  <input
                    value={campaignForm.durationDays}
                    onChange={(e) =>
                      setCampaignForm((prev) => ({ ...prev, durationDays: e.target.value }))
                    }
                    required
                    type="number"
                    min="1"
                    step="1"
                    placeholder="30"
                    className="w-full rounded-lg border border-[#1a2b6b] bg-[#010410] px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#0A36F7] transition-colors"
                  />
                </div>
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
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-[#0A36F7] to-[#91F2F9] text-black font-semibold hover:opacity-90 transition-opacity"
            >
              Create campaign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
