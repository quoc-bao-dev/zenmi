'use client'

import { uuidv4 } from '@/lib/uuid'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useParams, useRouter } from 'next/navigation'
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useDataHandbook } from '@/hooks/useDataQueryKey'
import NoData from '@/components/no-data/NoData'

type Props = {}

const ListHandBook = (props: Props) => {
    const router = useRouter()
    const params = useParams()

    const { isStateHandbook, queryKeyIsStateHandbook } = useDataHandbook()
    const [isMounted, setIsMounted] = useState<boolean>(false)

    const dataListHandBookArticle = [
        {
            id: uuidv4(),
            title: "Mẹ bầu đi làm có đóng bảo hiểm xã hội đừng bỏ qua các khoản trợ cấp này nhé!",
            image: "/example/handbook/blog1.png"
        },
        {
            id: uuidv4(),
            title: "Mẹ bầu đi làm có đóng bảo hiểm xã hội đừng bỏ qua các khoản trợ cấp này nhé!",
            image: "/example/handbook/blog1.png"
        },
        {
            id: uuidv4(),
            title: "Mẹ bầu đi làm có đóng bảo hiểm xã hội đừng bỏ qua các khoản trợ cấp này nhé!",
            image: "/example/handbook/blog1.png"
        },
        {
            id: uuidv4(),
            title: "Mẹ bầu đi làm có đóng bảo hiểm xã hội đừng bỏ qua các khoản trợ cấp này nhé!",
            image: "/example/handbook/blog1.png"
        },
        {
            id: uuidv4(),
            title: "Mẹ bầu đi làm có đóng bảo hiểm xã hội đừng bỏ qua các khoản trợ cấp này nhé!",
            image: "/example/handbook/blog1.png"
        },
        {
            id: uuidv4(),
            title: "Mẹ bầu đi làm có đóng bảo hiểm xã hội đừng bỏ qua các khoản trợ cấp này nhé!",
            image: "/example/handbook/blog1.png"
        },
        {
            id: uuidv4(),
            title: "Mẹ bầu đi làm có đóng bảo hiểm xã hội đừng bỏ qua các khoản trợ cấp này nhé!",
            image: "/example/handbook/blog1.png"
        },
    ]

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        const dataLocalstore = localStorage.getItem("dataDetailHandbook")

        if (isMounted && dataLocalstore) {
            const parseData = JSON.parse(dataLocalstore)
            console.log('parseData', parseData);

            queryKeyIsStateHandbook({
                ...isStateHandbook,
                dataDetailHandbook: parseData
            })
        }
    }, [
        isMounted,
    ])

    const handleClick = (item: any) => {
        router.push(`/handbook/${params?.list_handbook_slug}/${item.id}`)
        queryKeyIsStateHandbook({
            detailHandbook: item
        })

        localStorage.setItem("detailHandbook", JSON.stringify(item))
    }

    if (!isMounted) {
        return null;
    }

    return (
        <div className='custom-container-child py-6'>
            <div className='flex flex-col gap-4'>
                <div className='space-y-2'>
                    <motion.div
                        onClick={() => router.back()}
                        className='flex items-center gap-2 text-rose-500 hover:text-rose-400 cursor-pointer w-fit group custom-transition'
                        initial={false}
                        animate="rest"
                        whileTap={"press"}
                        variants={{
                            rest: { scale: 1 },
                            press: { scale: 1.03 }
                        }}
                    >
                        <FaArrowLeftLong className="3xl:size-5 size-4 3xl:max-w-5 max-w-4" />
                        <div className='3xl:text-lg text-base font-medium'>
                            Trở về
                        </div>
                    </motion.div>

                    <div className='3xl:text-xl text-lg font-semibold'>
                        Chuẩn bị trước sinh
                    </div>
                </div>

                <div className='flex flex-col md:gap-6 gap-4'>
                    {
                        isStateHandbook?.dataDetailHandbook &&
                            isStateHandbook?.dataDetailHandbook?.length > 0 ?
                            isStateHandbook?.dataDetailHandbook?.map((item: any) => (
                                <motion.div
                                    key={item.id}
                                    className='flex items-center gap-4 w-full bg-white border px-3 py-3 rounded-2xl cursor-pointer'
                                    initial={false}
                                    animate="rest"
                                    whileHover={"hover"}
                                    whileTap={"press"}
                                    variants={{
                                        rest: { scale: 1 },
                                        press: { scale: 1.03 },
                                        hover: { scale: 1.02 }
                                    }}
                                    onClick={() => handleClick(item)}
                                >
                                    <div className='md:max-w-[25%] max-w-[30%] w-full h-[100px]'>
                                        <Image
                                            width={400}
                                            height={400}
                                            alt="image"
                                            src={item?.featured_image ? item?.featured_image : ""}
                                            className='w-full h-full object-cover rounded-xl'
                                        />
                                    </div>
                                    <div className='flex flex-col gap-2 md:max-w-[75%] max-w-[70%]'>
                                        <div className='md:text-lg text-base font-semibold line-clamp-2'>
                                            {item?.title ? item?.title : ""}
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            {
                                                item.favorite ?
                                                    <div className='flex items-center space-x-2'>
                                                        <span className='size-4'><AiFillHeart className=' size-4' />
                                                        </span><span className='text-sm'>Thích</span>
                                                    </div>
                                                    :
                                                    <div className='flex items-center space-x-2'>
                                                        <span className='size-4'><AiOutlineHeart className=' size-4' />
                                                        </span><span className='text-sm'>Chưa thích</span>
                                                    </div>
                                            }
                                            {
                                                item.save_blog ?
                                                    <div className='flex items-center space-x-2'>
                                                        <span className='size-4'><BookmarkCheck className='size-4' /></span>
                                                        <span className='text-sm'>Đã lưu</span>
                                                    </div>
                                                    :
                                                    <div className='flex items-center space-x-2'>
                                                        <span className='size-4'><Bookmark className='size-4' /></span>
                                                        <span className='text-sm'>Chưa lưu</span>
                                                    </div>
                                            }
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                            :
                            <NoData type="handbook" />
                    }
                </div>
            </div>
        </div >
    )
}

export default ListHandBook