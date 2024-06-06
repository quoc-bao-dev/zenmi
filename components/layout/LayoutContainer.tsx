'use client'

import { Be_Vietnam_Pro } from 'next/font/google'
import React, { useEffect } from 'react'
import { motion, useScroll } from 'framer-motion'

import ButtonToTop from '../button/ButtonToTop';

import '@/styles/globals.scss'

type Props = {}

const bevietnampro = Be_Vietnam_Pro({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    display: 'swap'
})

const LayoutContainer = ({
    children
}: {
    children: React.ReactNode
}) => {
    const { scrollYProgress } = useScroll();

    return (
        <body className={`${bevietnampro.className} w-full bg-[#FCFDFD]`}>
            <motion.div
                className='progress-bar'
                style={{ scaleX: scrollYProgress }}
            />
            <main className='overflow-hidden max-w-full h-full'>
                {children}
                <ButtonToTop />
            </main>
        </body>
    )
}

export default LayoutContainer