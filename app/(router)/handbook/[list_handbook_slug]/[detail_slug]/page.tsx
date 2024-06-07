'use client'

import { uuidv4 } from '@/lib/uuid'
import { IListHandbookMom } from '@/types/Handbook/IHanbook'
import { ITabHandbook } from '@/types/Handbook/ITab'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useParams, useRouter } from 'next/navigation'
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Bookmark } from 'lucide-react';
import { FaArrowLeftLong } from 'react-icons/fa6'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useResize } from '@/hooks/useResize'

type Props = {}

const DetailHandbook = (props: Props) => {
    const router = useRouter()
    const params = useParams()

    const { isVisibleTablet } = useResize()

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
            <div className='mt-14 flex flex-col justify-between h-[calc(100dvh-56px)]'>
                <div className='custom-container-child flex flex-col'>
                    <ScrollArea className='h-[calc(100dvh-108px)] '>
                        <div className='flex flex-col gap-2'>
                            <div className='text-xl font-bold'>
                                Mách mẹ bầu 5 cách trò chuyện với thai nhi mỗi ngày
                            </div>
                            <div className='w-full h-auto'>
                                <Image
                                    width={400}
                                    height={400}
                                    alt="image"
                                    src={"/example/handbook/blog1.png"}
                                    className='w-full h-full object-cover rounded-md'
                                />
                            </div>
                            <div className='text-base text-[#545454]'>
                                Giao tiếp với thai nhi là một điều cần thiết cho cả mẹ và bé. Theo các chuyên gia, việc người mẹ trò chuyện với thai nhi hàng ngày sẽ hình thành kết nối đặc biệt giữa mẹ và con. Bên cạnh đó, cả ba và mẹ đều được khuyến khích trò chuyện với thai nhi ít nhất 15 phút mỗi ngày. Vậy làm thế nào để trò chuyện với con? Chúng ta hãy cùng tìm hiểu nhé!
                            </div>
                            <div className='text-base text-[#545454]'>
                                Giao tiếp với thai nhi là một điều cần thiết cho cả mẹ và bé. Theo các chuyên gia, việc người mẹ trò chuyện với thai nhi hàng ngày sẽ hình thành kết nối đặc biệt giữa mẹ và con. Bên cạnh đó, cả ba và mẹ đều được khuyến khích trò chuyện với thai nhi ít nhất 15 phút mỗi ngày. Vậy làm thế nào để trò chuyện với con? Chúng ta hãy cùng tìm hiểu nhé!
                            </div>
                            <div className='text-base text-[#545454]'>
                                Giao tiếp với thai nhi là một điều cần thiết cho cả mẹ và bé. Theo các chuyên gia, việc người mẹ trò chuyện với thai nhi hàng ngày sẽ hình thành kết nối đặc biệt giữa mẹ và con. Bên cạnh đó, cả ba và mẹ đều được khuyến khích trò chuyện với thai nhi ít nhất 15 phút mỗi ngày. Vậy làm thế nào để trò chuyện với con? Chúng ta hãy cùng tìm hiểu nhé!
                            </div>
                            <div className='text-base text-[#545454]'>
                                Giao tiếp với thai nhi là một điều cần thiết cho cả mẹ và bé. Theo các chuyên gia, việc người mẹ trò chuyện với thai nhi hàng ngày sẽ hình thành kết nối đặc biệt giữa mẹ và con. Bên cạnh đó, cả ba và mẹ đều được khuyến khích trò chuyện với thai nhi ít nhất 15 phút mỗi ngày. Vậy làm thế nào để trò chuyện với con? Chúng ta hãy cùng tìm hiểu nhé!
                            </div>
                            <div className='text-base text-[#545454]'>
                                Giao tiếp với thai nhi là một điều cần thiết cho cả mẹ và bé. Theo các chuyên gia, việc người mẹ trò chuyện với thai nhi hàng ngày sẽ hình thành kết nối đặc biệt giữa mẹ và con. Bên cạnh đó, cả ba và mẹ đều được khuyến khích trò chuyện với thai nhi ít nhất 15 phút mỗi ngày. Vậy làm thế nào để trò chuyện với con? Chúng ta hãy cùng tìm hiểu nhé!
                            </div>
                            <div className='text-base text-[#545454]'>
                                Giao tiếp với thai nhi là một điều cần thiết cho cả mẹ và bé. Theo các chuyên gia, việc người mẹ trò chuyện với thai nhi hàng ngày sẽ hình thành kết nối đặc biệt giữa mẹ và con. Bên cạnh đó, cả ba và mẹ đều được khuyến khích trò chuyện với thai nhi ít nhất 15 phút mỗi ngày. Vậy làm thế nào để trò chuyện với con? Chúng ta hãy cùng tìm hiểu nhé!
                            </div>
                        </div>
                    </ScrollArea>
                </div >

                <div className={`h-12 grid grid-cols-2  bg-white border-t`}>
                    <div className='col-span-1 w-full flex items-center justify-center gap-2'>
                        <span className='size-5'><AiOutlineHeart className=' size-5' /></span><span className='text-base'>Chưa thích</span>
                    </div>
                    <div className='col-span-1 w-full flex items-center justify-center gap-2'>
                        <span className='size-5'><Bookmark className=' size-5' /></span><span className='text-base'>Chưa thích</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailHandbook