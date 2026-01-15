import {
  LayoutDashboard,
  User,
  FolderKanban,
  Settings,
  Wallet,
} from "lucide-react";

import MoneyIcon from "../../../assets/money.svg?react";
import DonationIcon from "../../../assets/donation.svg?react";
import MegaphoneIcon from "../../../assets/megaphone.svg?react";
import Trans1 from "../../../assets/tran1.png";
import Trans2 from "../../../assets/tran2.png";
import Trans3 from "../../../assets/tran3.png";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { HiOutlineSupport } from "react-icons/hi";
import { LiaInfoSolid } from "react-icons/lia";

export const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: User, label: "Profile", href: "/profile" },
  { icon: FolderKanban, label: "Campaigns", href: "/campaigns" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export const settingsnavItems = [
  { icon: LiaInfoSolid, label: "Account Info", href: "/settings" },
  { icon: Wallet, label: "Wallet & Payments", href: "/settings/wallet" },

  {
    icon: MdOutlinePrivacyTip,
    label: "Privacy & Security",
    href: "/settings/privacy",
  },
  {
    icon: HiOutlineSupport,
    label: "Support & Legal",
    href: "#",
  },
];

export const statsConfig = [
  {
    title: "Total Balance",
    value: 150,
    subtitle: "Per 30 days",
    icon: MoneyIcon,
    iconColor: "bg-[#010410]",
  },
  {
    title: "Total Donation",
    value: 200,
    subtitle: "For this year",
    icon: DonationIcon,
    iconColor: "bg-[#010410]",
  },
  {
    title: "Total Campaign",
    value: "55+",
    subtitle: "All campaigns",
    icon: MegaphoneIcon,
    iconColor: "bg-[#010410]",
  },
];

export const chartData = [
  { month: "January", thisWeek: 45, lastWeek: 52 },
  { month: "March", thisWeek: 38, lastWeek: 48 },
  { month: "May", thisWeek: 52, lastWeek: 42 },
  { month: "July", thisWeek: 58, lastWeek: 38 },
  { month: "September", thisWeek: 48, lastWeek: 52 },
  { month: "October", thisWeek: 55, lastWeek: 45 },
  { month: "December", thisWeek: 42, lastWeek: 48 },
];

export const transactions = [
  {
    id: "1",
    image: Trans1,
    title: "Medical Treatment for Sarah's Cancer Recovery",
    organization: "Hope Foundation",
    amount: 500,
    recipient: "0x5b3a...500j1",
    time: "2025-10-15T10:30:00Z",
  },
  {
    id: "2",
    image: Trans2,
    title: "Emergency Relief for Flood Victims",
    organization: "Disaster Relief Fund",
    amount: 50,
    recipient: "0x9a2b...300j1",
    time: "2025-11-14T15:45:00Z",
  },
  {
    id: "3",
    image: Trans3,
    title: "Education Fund for Underprivileged Children",
    organization: "Future Foundation",
    amount: 100,
    recipient: "0x7c4d...600j1",
    time: "2025-11-13T08:20:00Z",
  },
];

export const campaigns = [
  { id: "XVA56a", amount: 10, time: "2024-01-15T10:30:00Z" },
  { id: "XVA56a", amount: 10, time: "2024-01-15T09:15:00Z" },
  { id: "XVA56a", amount: 10, time: "2024-01-14T16:45:00Z" },
  { id: "XVA56a", amount: 10, time: "2024-01-14T14:20:00Z" },
];
