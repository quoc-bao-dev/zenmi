import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Zenmi - Vote',
    description: 'Vote',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
