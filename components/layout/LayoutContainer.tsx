'use client'

import { Be_Vietnam_Pro } from 'next/font/google'
import React, { useEffect } from 'react'
import { motion, useScroll } from 'framer-motion'

import ButtonToTop from '../button/ButtonToTop';

import '@/styles/globals.scss'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

type Props = {}

const bevietnampro = Be_Vietnam_Pro({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    display: 'swap'
})

const queryClient = new QueryClient()

const LayoutContainer = ({
    children
}: {
    children: React.ReactNode
}) => {
    const { scrollYProgress } = useScroll();

    return (
        <QueryClientProvider client={queryClient}>
            <body className={`${bevietnampro.className} w-full bg-[#FCFDFD]`}>
                <motion.div
                    className='progress-bar'
                    style={{ scaleX: scrollYProgress }}
                />
                <main className='overflow-hidden max-w-full bg-white shadow-2xl custom-container lg:h-screen h-dvh'>
                    {children}
                    <ButtonToTop />
                </main>
            </body>
            <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
    )
}

export default LayoutContainer