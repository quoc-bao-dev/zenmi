'use client'
import { ScrollArea } from '@/components/ui/scroll-area'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa6'
import { useListVote } from '../hooks/useListVote'
import { useVote } from '../hooks/useVote'

type Props = {}

const DetailVote = (param: Props) => {
    const [isMounted, setIsMounted] = useState<boolean>(false)

    const { data } = useListVote(param)

    const { onClickVote } = useVote()

    useEffect(() => {
        setIsMounted(true)
    }, [])


    if (!isMounted) {
        return null;
    }

    return (
        <div className='h-dvh bg-[url("/vote/backgroundRedBaby.jpg")] bg-cover bg-no-repeat'>
            <ScrollArea type='hover' className="custom-container-child h-dvh py-6">
                <div className='flex flex-col gap-3'>
                    <div className="flex items-start gap-2">
                        <Image src={'/vote/iconInfoBaby.png'} width={64} height={64} alt="" className='size-[22px] mt-0.5' />
                        <div className="flex flex-col gap-1">
                            <h1 className='text-[#231a32] font-bold text-xl capitalize'>
                                Bảng thống kê tên được chọn
                            </h1>
                            <h1 className='text-[#a5a29f] font-semibold text-base'>
                                Xem tất cả danh sách tên tóm tắt các điểm quan trọng:
                            </h1>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-4">
                        <div className="text-[#a5a29f] text-base col-span-9">
                            Lọc danh sách:
                        </div>
                        <Image src={'/vote/loveBaby.png'} width={64} height={64} alt="" className='size-[22px] col-span-3 mx-auto' />
                    </div>
                    <div className="flex flex-col gap-2.5">
                        {data?.data?.map((e: any, index: any) => {
                            return (
                                <div key={e?.id} className="grid grid-cols-12 gap-4 items-center">
                                    <div className="col-span-9  bg-[#de7861] p-2.5 rounded-2xl text-[#fefefe] flex items-center justify-between gap-3">
                                        <h1 className="text-sm font-medium capitalize">
                                            {e?.fullname}
                                        </h1>
                                        <div className="flex flex-col gap-2">
                                            <h1 className='text-xs font-normal'>{index + 1}/{data?.count_all_name}</h1>
                                            <Image src={'/vote/logoOutline.png'} width={64} height={64} alt="" className='size-[22px] col-span-1 mx-auto' />
                                        </div>
                                    </div>
                                    <div className="col-span-3 mx-auto">
                                        {e?.checked ?
                                            <FaHeart onClick={() => onClickVote(e)} size={22} className={`text-[#de7861]`} />
                                            :
                                            <FaRegHeart onClick={() => onClickVote(e)} size={22} className={`text-[#de7861]`} />
                                        }
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    {/* <Image src={'/vote/threeStars.png'} width={64} height={64} alt="" className='col-span-2 mx-auto' />
                    <div className="bg-[url('/vote/bgTitle.png')] h-[170px] w-full bg-cover bg-no-repeat p-9">
                        <h1 className='text-[#231a32] font-medium'>Xem bảng điểm chi tiết</h1>
                        <h1 className='text-[#231a32] font-medium'>theo 6 <span className='capitalize'>tiêu chí</span></h1>
                        <h1 className='text-[#231a32] font-medium'><span className='capitalize'>Lục hợp mệnh pháp</span></h1>
                        <h1 className='text-[#231a32] font-medium'> của các tên được chọn</h1>
                    </div> */}
                </div>
            </ScrollArea>
        </div >
    )
}

export default DetailVote