'use client'

import { uuidv4 } from '@/lib/uuid'
import { IListHandbookMom } from '@/types/handbook/IHanbook'
import { ITabHandbook } from '@/types/handbook/ITab'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

type Props = {}

const Handbook = (props: Props) => {
    const router = useRouter()

    const [isMounted, setIsMounted] = useState<boolean>(false)
    const [tabId, setTabId] = useState<string | number>("")

    const dataTab: ITabHandbook[] = [
        {
            id: "1",
            name: "Dành cho mẹ",
            icon: "/icon/person/baby-newborn.svg",
        },
        {
            id: "2",
            name: "Dành cho bé",
            icon: "/icon/person/baby-girl.svg",
        },
    ]

    const dataListHandbookMom: IListHandbookMom[] = [
        {
            id: uuidv4(),
            name: "Chuẩn bị trước sinh",
            image: "/example/handbook/electrocardiogram-heart.svg",
        },
        {
            id: uuidv4(),
            name: "Sau khi sinh",
            image: "/example/handbook/electrocardiogram-heart.svg",
        },
        {
            id: uuidv4(),
            name: "Công thức nấu ăn",
            image: "/example/handbook/electrocardiogram-heart.svg",
        },
        {
            id: uuidv4(),
            name: "Làm đẹp & thời trang",
            image: "/example/handbook/electrocardiogram-heart.svg",
        },
        {
            id: uuidv4(),
            name: "Đời sống vợ chồng",
            image: "/example/handbook/electrocardiogram-heart.svg",
        },
        {
            id: uuidv4(),
            name: "Đánh giá dịch vụ",
            image: "/example/handbook/electrocardiogram-heart.svg",
        },
    ]

    useEffect(() => {
        setIsMounted(true)
    }, [])


    useEffect(() => {
        if (isMounted) {
            setTabId(dataTab[0].id)
        }
    }, [isMounted])


    const handleChangeTab = (item: any) => {
        console.log('item:', item);
        setTabId(item.id)
    }

    if (!isMounted) {
        return null;
    }

    return (
        <div className='custom-container-child py-6'>
            <div className='flex flex-col gap-4'>
                <div className='space-y-2'>
                    <div className='3xl:text-xl text-lg font-semibold'>
                        Cẩm nang theo danh mục
                    </div>

                    <div className='w-full rounded-3xl p-1 grid grid-cols-2 gap-4 bg-[#FD799D]'>
                        {
                            dataTab.map((item) => (
                                <div
                                    key={item.id}
                                    className={`${tabId === item.id ? "bg-white text-[#545454]" : "text-white hover:bg-white hover:text-[#545454]"} rounded-3xl flex items-center justify-center p-1 gap-2 cursor-pointer custom-transition`}
                                    onClick={() => handleChangeTab(item)}
                                >
                                    <div className='size-8 max-w-[10%]'>
                                        <Image
                                            src={item.icon}
                                            alt="icon"
                                            width={100}
                                            height={100}
                                            className='w-full h-full object-contain'
                                        />
                                    </div>
                                    <div className='3xl:text-base text-sm font-bold'>
                                        {item.name}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className='grid grid-cols-2 md:gap-8 gap-6'>
                    {
                        dataListHandbookMom.map((item, index) => (
                            <motion.div
                                key={item.id}
                                className={`${index % 2 !== 0 ? "rounded-tl-[32px] rounded-br-[32px]" : "rounded-tr-[32px] rounded-bl-[32px]"} flex flex-col justify-center items-center gap-2 bg-rose-50 shadow-md rounded-xl px-6 py-8 cursor-pointer`}
                                initial={false}
                                animate="rest"
                                whileHover={"hover"}
                                whileTap={"press"}
                                variants={{
                                    rest: { scale: 1 },
                                    press: { scale: 1.03 },
                                    hover: { scale: 1.02 }
                                }}
                                onClick={() => router.push(`/handbook/${item.id}`)}
                            >
                                <div className='md:size-24 size-16 rounded-lg'>
                                    <Image
                                        src={item.image}
                                        alt="image"
                                        width={100}
                                        height={100}
                                        className='w-full h-full object-contain'
                                    />
                                </div>
                                <div className='3xl:text-lg md:text-base text-sm text-center text-[#545454] font-semibold line-clamp-2'>
                                    {item.name}
                                </div>
                            </motion.div>
                        ))
                    }
                </div>
            </div>
        </div >
    )
}

export default Handbook