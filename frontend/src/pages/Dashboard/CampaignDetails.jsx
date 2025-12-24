import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Sidebar from './components/layout/Sidebar';
import MobileMenu from './components/layout/MobileMenu';
import Header from './components/layout/Header';
import api from '../../services/api';
import { formatCurrency } from './utils/formatters';

export default function CampaignDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Campaigns');
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const [campaign, setCampaign] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function checkSession() {
      try {
        await api.getUser();
        if (!cancelled) setIsCheckingAuth(false);
      } catch (err) {
        if (cancelled) return;
        toast.error('Please log in to continue');
        navigate('/login', { replace: true });
      }
    }

    checkSession();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setIsLoading(true);
        const { data } = await api.getCampaign(id);
        if (cancelled) return;
        setCampaign(data?.campaign || null);
      } catch (err) {
        if (cancelled) return;
        toast.error('Failed to load campaign');
        navigate('/dashboard/campaigns', { replace: true });
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    if (!isCheckingAuth && id) load();

    return () => {
      cancelled = true;
    };
  }, [id, isCheckingAuth, navigate]);

  if (isCheckingAuth) return null;

  return (
    <div className="flex min-h-screen bg-[#010415] text-white">
      <Sidebar />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />

      <div className="flex-1 lg:ml-64">
        <Header setIsMobileMenuOpen={setIsMobileMenuOpen} />

        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Campaign Details</h2>
          </div>

          <div className="bg-[#010410] rounded-xl p-4 lg:p-6 border lg:border-0 border-gray-800/30">
            {isLoading ? (
              <div className="text-sm text-gray-400">Loading...</div>
            ) : !campaign ? (
              <div className="text-sm text-gray-400">Not found</div>
            ) : (
              <div>
                <div className="flex justify-end mb-4">
                  <button
                    type="button"
                    disabled={isDeleting}
                    onClick={async () => {
                      if (!id) return;
                      if (isDeleting) return;
                      try {
                        setIsDeleting(true);
                        await api.deleteCampaign(id);
                        toast.success('Campaign deleted');
                        navigate('/dashboard/campaigns', { replace: true });
                      } catch (err) {
                        const msg = err?.response?.data?.error || err?.message || 'Failed to delete campaign';
                        toast.error(msg);
                      } finally {
                        setIsDeleting(false);
                      }
                    }}
                    className="text-sm font-semibold text-red-400 hover:text-red-300 transition-colors disabled:opacity-60"
                  >
                    Delete
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <div className="text-xs text-gray-400">ID</div>
                  <div className="text-sm break-all">{campaign.id}</div>

                  <div className="mt-4 text-xs text-gray-400">Name</div>
                  <div className="text-base font-semibold">{campaign.name || '-'}</div>

                  <div className="mt-4 text-xs text-gray-400">Objective</div>
                  <div className="text-sm text-gray-200 whitespace-pre-wrap">{campaign.objective || '-'}</div>

                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <div className="text-xs text-gray-400">Goal</div>
                      <div className="text-sm">{formatCurrency(Number(campaign.goal_amount || 0))}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">End date</div>
                      <div className="text-sm">{campaign.end_date ? new Date(campaign.end_date).toLocaleDateString() : '-'}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-gray-400">Cover</div>
                  {campaign.cover_image_url ? (
                    <img
                      src={campaign.cover_image_url}
                      alt="Campaign cover"
                      className="mt-2 w-full rounded-lg border border-gray-800/30 object-cover max-h-56"
                    />
                  ) : (
                    <div className="mt-2 text-sm text-gray-400">No cover uploaded</div>
                  )}
                </div>
              </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
