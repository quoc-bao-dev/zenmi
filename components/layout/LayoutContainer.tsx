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
        <body className={`${bevietnampro.className} w-full bg-[#FCFDFD]`}>
            <QueryClientProvider client={queryClient}>
                <motion.div
                    className='progress-bar'
                    style={{ scaleX: scrollYProgress }}
                />
                <main className='max-w-full h-full lg:min-h-screen min-h-dvh bg-white shadow-2xl custom-container'>
                    {/* <main className=' max-w-full bg-white shadow-2xl custom-container lg:h-screen h-dvh'> */}
                    {children}
                    <ButtonToTop />
                </main>
                <ReactQueryDevtools initialIsOpen={true} />
            </QueryClientProvider>
        </body>
    )
}

export default LayoutContainer