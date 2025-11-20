import { 
  LayoutDashboard, 
  User, 
  FolderKanban, 
  Settings,
  DollarSign,
  TrendingUp,
  Users
} from 'lucide-react';

export const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: User, label: 'Profile', href: '/profile' },
  { icon: FolderKanban, label: 'Campaigns', href: '/campaigns' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export const statsConfig = [
  {
    title: 'Total Balance',
    value: 150,
    subtitle: 'Per 30 days',
    icon: DollarSign,
    iconColor: 'bg-blue-500/10 text-blue-500',
  },
  {
    title: 'Total Donation',
    value: 200,
    subtitle: 'For this year',
    icon: TrendingUp,
    iconColor: 'bg-purple-500/10 text-purple-500',
  },
  {
    title: 'Total Campaign',
    value: '55+',
    subtitle: 'All campaigns',
    icon: Users,
    iconColor: 'bg-pink-500/10 text-pink-500',
  },
];

export const chartData = [
  { month: 'January', thisWeek: 45, lastWeek: 52 },
  { month: 'March', thisWeek: 38, lastWeek: 48 },
  { month: 'May', thisWeek: 52, lastWeek: 42 },
  { month: 'July', thisWeek: 58, lastWeek: 38 },
  { month: 'September', thisWeek: 48, lastWeek: 52 },
  { month: 'October', thisWeek: 55, lastWeek: 45 },
  { month: 'December', thisWeek: 42, lastWeek: 48 },
];

export const transactions = [
  {
    id: '1',
    title: "Medical Treatment for Sarah's Cancer Recovery",
    organization: 'Hope Foundation',
    amount: 500,
    recipient: '0x5b3a...500j1',
    time: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    title: 'Emergency Relief for Flood Victims',
    organization: 'Disaster Relief Fund',
    amount: 50,
    recipient: '0x9a2b...300j1',
    time: '2024-01-14T15:45:00Z',
  },
  {
    id: '3',
    title: 'Education Fund for Underprivileged Children',
    organization: 'Future Foundation',
    amount: 100,
    recipient: '0x7c4d...600j1',
    time: '2024-01-13T08:20:00Z',
  },
];

export const campaigns = [
  { id: 'XVA56a', amount: 10, time: '2024-01-15T10:30:00Z' },
  { id: 'XVA56a', amount: 10, time: '2024-01-15T09:15:00Z' },
  { id: 'XVA56a', amount: 10, time: '2024-01-14T16:45:00Z' },
  { id: 'XVA56a', amount: 10, time: '2024-01-14T14:20:00Z' },
];