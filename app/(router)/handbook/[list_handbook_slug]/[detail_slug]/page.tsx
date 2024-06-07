'use client'

import { uuidv4 } from '@/lib/uuid'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useParams, useRouter } from 'next/navigation'
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { FaArrowLeftLong } from 'react-icons/fa6'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useResize } from '@/hooks/useResize'
import { useDataHandbook } from '@/hooks/useDataQueryKey'
import moment from "moment"

type Props = {}

const DetailHandbook = (props: Props) => {
    const router = useRouter()
    const params = useParams()

    const { isVisibleTablet } = useResize()
    const { isStateHandbook, queryKeyIsStateHandbook } = useDataHandbook()

    console.log('params', params);


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
        const detailLocalstore = localStorage.getItem("detailHandbook")

        if (isMounted && detailLocalstore && !isStateHandbook.detailHandbook) {
            const parseData = JSON.parse(detailLocalstore)

            queryKeyIsStateHandbook({
                ...isStateHandbook,
                detailHandbook: parseData
            })
        }
    }, [
        isMounted,
        isStateHandbook,
        queryKeyIsStateHandbook,
    ])

    console.log('isStateHandbook', isStateHandbook);

    const handleChangeStatus = (type: string) => {
        if (type === "favorite") {
            queryKeyIsStateHandbook({
                ...isStateHandbook,
                detailHandbook: {
                    ...isStateHandbook.detailHandbook,
                    favorite: !isStateHandbook?.detailHandbook?.favorite
                }
            })
        } else if (type === "save_blog") {
            queryKeyIsStateHandbook({
                ...isStateHandbook,
                detailHandbook: {
                    ...isStateHandbook.detailHandbook,
                    save_blog: !isStateHandbook?.detailHandbook?.save_blog
                }
            })

        }
    }


    if (!isMounted) {
        return null;
    }

    return (
        <div className='flex flex-col gap-4 relative'>
            <div className='w-fit py-4 fixed top-0 z-40'>
                <motion.div
                    onClick={() => router.back()}
                    className='mx-6 flex items-center gap-2 text-rose-500 hover:text-rose-400 cursor-pointer w-fit group custom-transition'
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
            </div>
            {
                isStateHandbook?.detailHandbook ?
                    <div className='mt-14 flex flex-col justify-between h-[calc(100dvh-56px)]'>
                        <div className='custom-container-child flex flex-col'>
                            <ScrollArea className='h-[calc(100dvh-108px)] '>
                                <div className='flex flex-col gap-2'>
                                    <div className='text-xl font-bold'>
                                        {/* Mách mẹ bầu 5 cách trò chuyện với thai nhi mỗi ngày */}
                                        {isStateHandbook?.detailHandbook?.title ? isStateHandbook?.detailHandbook?.title : ""}
                                    </div>
                                    <div className='text-base text-[#545454]'>
                                        {
                                            moment(isStateHandbook?.detailHandbook?.date, "DD/MM/YYYY, HH:mm:ss")
                                                ?
                                                moment(isStateHandbook?.detailHandbook?.date).format("DD/MM/YYYY, HH:mm:ss")
                                                :
                                                isStateHandbook?.detailHandbook?.date
                                        }
                                        {/* {
                                            moment().subtract(1, "days").isSame(moment(isStateHandbook?.detailHandbook?.date, "DD/MM/YYYY"), "day")
                                                ? `Hôm qua lúc ${moment(isStateHandbook?.detailHandbook?.date).format("HH:mm")}`
                                                : moment(isStateHandbook?.detailHandbook?.date).fromNow()
                                        } */}
                                    </div>
                                    <div className='w-full h-auto'>
                                        <Image
                                            width={1920}
                                            height={1080}
                                            alt="image"
                                            src={isStateHandbook?.detailHandbook?.featured_image ? isStateHandbook?.detailHandbook?.featured_image : ""}
                                            className='w-full h-full object-cover rounded-md'
                                        />
                                    </div>
                                    <div dangerouslySetInnerHTML={{
                                        __html: `${isStateHandbook?.detailHandbook?.content ? isStateHandbook?.detailHandbook?.content : ''}`
                                    }} />

                                </div>
                            </ScrollArea>
                        </div >

                        <div className={`h-12 grid grid-cols-2  bg-white border-t`}>
                            <div className='col-span-1 w-full flex items-center justify-center gap-2'>
                                {
                                    isStateHandbook?.detailHandbook.favorite ?
                                        <div
                                            className='flex items-center gap-2 w-fit cursor-pointer group custom-transition'
                                            onClick={() => handleChangeStatus("favorite")}
                                        >
                                            <span className='size-5 group-hover:text-[#FA3434] text-[#FA3434]'><AiFillHeart className=' size-5' /></span>
                                            <span className='text-base text-[#545454]'>Thích</span>
                                        </div>
                                        :
                                        <div
                                            className='flex items-center gap-2 w-fit cursor-pointer group custom-transition'
                                            onClick={() => handleChangeStatus("favorite")}
                                        >
                                            <span className='size-5 '><AiOutlineHeart className=' size-5' /></span>
                                            <span className='text-base text-[#545454]'>Chưa thích</span>
                                        </div>
                                }
                            </div>
                            <div className='col-span-1 w-full flex items-center justify-center gap-2'>
                                {
                                    isStateHandbook?.detailHandbook.save_blog
                                        ?
                                        <div
                                            className='flex items-center gap-2 w-fit cursor-pointer group custom-transition'
                                            onClick={() => handleChangeStatus("save_blog")}
                                        >
                                            <span className='size-5'><BookmarkCheck className=' size-5' /></span>
                                            <span className='text-base text-[#545454]'>Đã lưu</span>
                                        </div>
                                        :
                                        <div
                                            className='flex items-center gap-2 w-fit cursor-pointer group custom-transition'
                                            onClick={() => handleChangeStatus("save_blog")}
                                        >
                                            <span className='size-5'><Bookmark className=' size-5' /></span>
                                            <span className='text-base text-[#545454]'>Chưa lưu</span>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                    :
                    (null)
            }
        </div>
    )
}

export default DetailHandbook