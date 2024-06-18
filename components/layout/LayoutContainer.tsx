'use client'

import { Be_Vietnam_Pro } from 'next/font/google'
import React, { useEffect, useState } from 'react'
import { motion, useScroll } from 'framer-motion'

import ButtonToTop from '../button/ButtonToTop';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useShopCart } from '@/hooks/useShopCart';
import { usePathname } from 'next/navigation';
import { useDataHandbook } from '@/hooks/useDataQueryKey';


import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import 'swiper/css/thumbs'
import '@/styles/globals.scss'
import "moment/locale/vi";
import Alert from '../modal/alert/Alert';
import { DialogWelcome } from '../modal/Dialog/DialogWelcome';

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
    const pathname = usePathname()

    const { scrollYProgress } = useScroll();

    const { setCarItems } = useShopCart()

    const [isMouted, setIsMouted] = useState<boolean>(false)

    useEffect(() => {
        setIsMouted(true)
    }, [])

    useEffect(() => {
        const cart = localStorage.getItem('carItems') ? JSON.parse(localStorage.getItem('carItems')!) : []
        if (cart) {
            setCarItems(cart)
        }
    }, [])

    const { isStateHandbook, queryKeyIsStateHandbook } = useDataHandbook()

    // useEffect(() => {
    //     if (pathname === "/handbook") {
    //         queryKeyIsStateHandbook({
    //             dataDetailListHandbook: []
    //         })
    //     }

    // }, [pathname])

    if (!isMouted) return null
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
                    <Alert />
                    <DialogWelcome />
                </main>
                <ReactQueryDevtools initialIsOpen={true} />
            </QueryClientProvider>
        </body>
    )
}

export default LayoutContainer