import { Bell, Gift, History, Lock, Settings, UserCircle, Wallet } from "lucide-react";

export const buttons = [
    {
        text: 'My Profile',
        link: '/profile',
        icon: UserCircle,
    },
    {
        text: 'My Wallet',
        link: '/wallet',
        icon: Wallet,
    },
    {
        text: 'My History',
        link: '/history',
        icon: History,
    },
    {
        text: 'Gift & Donations',
        link: '/gift',
        icon: Gift,
    },
    {
        text: 'Securify & Privacy',
        link: '/privacy',
        icon: Lock
    },
    {
        text: 'Notification',
        link: '/notification',
        icon: Bell,
    },
    {
        text: 'Setting',
        link: '/setting',
        icon: Settings,
    },
];