import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Sidebar from './components/layout/Sidebar';
import MobileMenu from './components/layout/MobileMenu';
import Header from './components/layout/Header';
import api from '../../services/api';
import { formatCurrency } from './utils/formatters';

function formatTimeLeft(endDate) {
	if (!endDate) return '-';
	const end = new Date(endDate);
	if (Number.isNaN(end.getTime())) return '-';

	const diffInMinutes = Math.floor((end.getTime() - Date.now()) / 60000);
	if (diffInMinutes <= 0) return 'Ended';
	if (diffInMinutes < 60) return `${diffInMinutes} mins left`;
	const diffInHours = Math.floor(diffInMinutes / 60);
	if (diffInHours < 24) return `${diffInHours} hours left`;
	const diffInDays = Math.floor(diffInHours / 24);
	return `${diffInDays} days left`;
}

function truncateEnd(value, maxChars) {
	const str = String(value ?? '');
	if (!maxChars || maxChars < 1) return str;
	if (str.length <= maxChars) return str;
	return `${str.slice(0, maxChars)}...`;
}

export default function Campaigns() {
	const navigate = useNavigate();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [activeItem, setActiveItem] = useState('Campaigns');
	const [isCheckingAuth, setIsCheckingAuth] = useState(true);

	const [campaigns, setCampaigns] = useState([]);
	const [offset, setOffset] = useState(0);
	const [hasMore, setHasMore] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [isLoadingMore, setIsLoadingMore] = useState(false);

	const limit = 10;

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

		async function loadFirstPage() {
			try {
				setIsLoading(true);
				const { data } = await api.getMyCampaigns({ limit, offset: 0 });
				if (cancelled) return;
				setCampaigns(Array.isArray(data?.campaigns) ? data.campaigns : []);
				setOffset(0);
				setHasMore(Boolean(data?.hasMore));
			} catch (err) {
				if (cancelled) return;
				setCampaigns([]);
				setHasMore(false);
				toast.error('Failed to load campaigns');
			} finally {
				if (!cancelled) setIsLoading(false);
			}
		}

		if (!isCheckingAuth) loadFirstPage();

		return () => {
			cancelled = true;
		};
	}, [isCheckingAuth]);

	async function handleMore() {
		if (isLoadingMore || !hasMore) return;
		const nextOffset = offset + limit;

		try {
			setIsLoadingMore(true);
			const { data } = await api.getMyCampaigns({ limit, offset: nextOffset });
			const nextCampaigns = Array.isArray(data?.campaigns) ? data.campaigns : [];
			setCampaigns((prev) => [...prev, ...nextCampaigns]);
			setOffset(nextOffset);
			setHasMore(Boolean(data?.hasMore));
		} catch (err) {
			toast.error('Failed to load more campaigns');
		} finally {
			setIsLoadingMore(false);
		}
	}

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
						<h2 className="text-lg font-semibold">My Campaigns</h2>
					</div>

					<div className="bg-[#010410] rounded-xl p-4 lg:p-6 border lg:border-0 border-gray-800/30">
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead>
									<tr className="border-b border-[#1E1E2D]">
										<th className="pb-2 lg:pb-3 text-[10px] lg:text-xs font-medium text-left text-gray-400">ID</th>
										<th className="pb-2 lg:pb-3 text-[10px] lg:text-xs font-medium text-left text-gray-400">Name</th>
										<th className="pb-2 lg:pb-3 text-[10px] lg:text-xs font-medium text-left text-gray-400">Goal</th>
										<th className="pb-2 lg:pb-3 text-[10px] lg:text-xs font-medium text-left text-gray-400">Time</th>
									</tr>
								</thead>
								<tbody>
									{isLoading ? (
										<tr className="border-b border-[#1E1E2D] last:border-0">
											<td className="py-3 lg:py-4 text-xs lg:text-sm text-gray-400" colSpan={4}>
												Loading...
											</td>
										</tr>
									) : campaigns.length === 0 ? (
										<tr className="border-b border-[#1E1E2D] last:border-0">
											<td className="py-3 lg:py-4 text-xs lg:text-sm text-gray-400" colSpan={4}>
												No campaigns yet
											</td>
										</tr>
									) : (
										campaigns.map((campaign) => (
											<tr key={campaign.id} className="border-b border-[#1E1E2D] last:border-0">
												<td className="py-3 lg:py-4 text-xs lg:text-sm">
													<button
														type="button"
														onClick={() => navigate(`/dashboard/campaigns/${campaign.id}`)}
														className="text-cyan-400 hover:text-cyan-300 transition-colors"
														title="View campaign"
													>
														<span className="inline md:hidden">{truncateEnd(campaign.id, 8)}</span>
														<span className="hidden md:inline lg:hidden">{truncateEnd(campaign.id, 12)}</span>
														<span className="hidden lg:inline">{truncateEnd(campaign.id, 16)}</span>
													</button>
												</td>
												<td className="py-3 lg:py-4 text-xs lg:text-sm">
													<span className="inline md:hidden" title={campaign.name || ''}>
														{campaign.name ? truncateEnd(campaign.name, 16) : '-'}
													</span>
													<span className="hidden md:inline lg:hidden" title={campaign.name || ''}>
														{campaign.name ? truncateEnd(campaign.name, 28) : '-'}
													</span>
													<span className="hidden lg:inline" title={campaign.name || ''}>
														{campaign.name || '-'}
													</span>
												</td>
												<td className="py-3 lg:py-4 text-xs lg:text-sm">
													{formatCurrency(Number(campaign.goal_amount || 0))}
												</td>
												<td className="py-3 lg:py-4 text-[10px] lg:text-xs text-gray-400">
													{formatTimeLeft(campaign.end_date)}
												</td>
											</tr>
										))
									)}
								</tbody>
							</table>
						</div>

						<div className="flex justify-end mt-3 lg:mt-4">
							{hasMore ? (
								<button
									type="button"
									onClick={handleMore}
									disabled={isLoadingMore}
									className="flex items-center gap-1 text-xs lg:text-sm transition-colors text-cyan-400 hover:text-cyan-300 disabled:opacity-60"
								>
									{isLoadingMore ? 'Loading...' : 'More'} <span>›</span>
								</button>
							) : null}
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}
