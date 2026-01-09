import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Sidebar from './components/layout/Sidebar';
import MobileMenu from './components/layout/MobileMenu';
import Header from './components/layout/Header';
import api from '../../services/api';
import { COUNTRIES } from './constants/countries';

export default function Profile() {
	const navigate = useNavigate();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [activeItem, setActiveItem] = useState('Profile');

	const [isLoading, setIsLoading] = useState(true);
	const [isSaving, setIsSaving] = useState(false);
	const [form, setForm] = useState({
		foundation_name: '',
		country: '',
		receiving_wallet_address: '',
	});

	useEffect(() => {
		let cancelled = false;
		async function load() {
			try {
				setIsLoading(true);
				const { data } = await api.getProfile();
				const profile = data?.profile;
				if (cancelled) return;
				if (profile) {
					setForm({
						foundation_name: profile.foundation_name || '',
						country: profile.country || '',
						receiving_wallet_address: profile.receiving_wallet_address || '',
					});
				}
			} catch (err) {
				if (cancelled) return;
				const msg = err?.response?.data?.error || err?.message || 'Failed to load profile';
				toast.error(msg);
				navigate('/login', { replace: true });
			} finally {
				if (!cancelled) setIsLoading(false);
			}
		}

		load();
		return () => {
			cancelled = true;
		};
	}, [navigate]);

	const save = async (e) => {
		e.preventDefault();
		if (isSaving) return;

		setIsSaving(true);
		try {
			await api.saveProfile({
				foundation_name: form.foundation_name,
				country: form.country,
				receiving_wallet_address: form.receiving_wallet_address,
			});
			toast.success('Profile saved');
		} catch (err) {
			const msg = err?.response?.data?.error || err?.message || 'Failed to save profile';
			toast.error(msg);
		} finally {
			setIsSaving(false);
		}
	};

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
						<h2 className="text-lg font-semibold">Profile</h2>
						<p className="text-sm text-gray-400">
							Complete your profile to be able to create campaigns.
						</p>
					</div>

					<form onSubmit={save} className="bg-[#010410] rounded-xl p-4 lg:p-6 border lg:border-0 border-gray-800/30 space-y-5">
						{isLoading ? (
							<div className="text-sm text-gray-400">Loading...</div>
						) : (
							<>
								<div>
									<label className="block text-sm font-semibold text-gray-200 mb-2">
										Name of foundation (if any)
									</label>
									<input
										value={form.foundation_name}
										onChange={(e) => setForm((p) => ({ ...p, foundation_name: e.target.value }))}
										type="text"
										placeholder="Optional"
										className="w-full rounded-lg border border-[#1a2b6b] bg-[#010410] px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#0A36F7] transition-colors"
									/>
								</div>

								<div>
									<label className="block text-sm font-semibold text-gray-200 mb-2">
										Country
									</label>
									<select
										value={form.country}
										onChange={(e) => setForm((p) => ({ ...p, country: e.target.value }))}
										required
										className="w-full rounded-lg border border-[#1a2b6b] bg-[#010410] px-4 py-3 text-white focus:outline-none focus:border-[#0A36F7] transition-colors"
									>
										<option value="" disabled>
											Select a country
										</option>
										{COUNTRIES.map((c) => (
											<option key={c} value={c}>
												{c}
											</option>
										))}
									</select>
								</div>

								<div>
									<label className="block text-sm font-semibold text-gray-200 mb-2">
										Receiving wallet address
									</label>
									<input
										value={form.receiving_wallet_address}
										onChange={(e) => setForm((p) => ({ ...p, receiving_wallet_address: e.target.value }))}
										required
										type="text"
										placeholder="0x..."
										className="w-full rounded-lg border border-[#1a2b6b] bg-[#010410] px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#0A36F7] transition-colors"
									/>
								</div>

								<div className="flex justify-end">
									<button
										type="submit"
										disabled={isSaving}
										className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#0A36F7] to-[#91F2F9] text-black font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
									>
										{isSaving ? 'Saving…' : 'Save'}
									</button>
								</div>
							</>
						)}
					</form>
				</main>
			</div>
		</div>
	);
}