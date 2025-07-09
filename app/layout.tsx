import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import '../globals.css';
import { cn } from '@/lib/utils';

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-roboto',
});

export const metadata: Metadata = {
    title: 'Aqua',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={cn('w-full', 'h-full')}>
            <body className={cn(roboto.className, 'w-full', 'h-full')}>{children}</body>
        </html>
    );
}
