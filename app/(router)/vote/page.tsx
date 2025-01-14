'use client'
import NoData from '@/components/no-data/NoData'
import { ScrollArea } from '@/components/ui/scroll-area'
import { uuidv4 } from '@/lib/uuid'
import { ConvertYouTubeUrlToEmbed } from '@/utils/Cconvert/ConvertYoutobe'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa6'
import Iframe from 'react-iframe'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useListVote } from './hooks/useListVote'
import { useVote } from './hooks/useVote'
import { useVoteContent } from './hooks/useVoteContent'
import { useInView } from 'react-intersection-observer';

type Props = {}

const Vote = (props: Props) => {
    const { push } = useRouter()

    const params = useSearchParams()

    const { data: dataContent } = useVoteContent()

    const { data, isLoading } = useListVote(params.get('id'))

    const [isMounted, setIsMounted] = useState<boolean>(false)

    const { onClickVote, onSubmitArrayVote } = useVote(params.get('id'))

    const [isFixed, setIsFixed] = useState(false);
    // Sử dụng ref để theo dõi phần tử đầu tiên
    const { ref: startRef, inView: startInView } = useInView({
        threshold: 0,
    });

    // Sử dụng ref để theo dõi phần tử cuối cùng
    const { ref: endRef, inView: endInView } = useInView({
        threshold: 0,
    });

    // Cập nhật trạng thái khi cuộn qua các phần tử
    useEffect(() => {
        if (data?.data?.length > 1) {
            if (startInView) {
                // Nếu phần tử đầu tiên vào vùng nhìn thấy, đặt isFixed thành true
                setIsFixed(true);
            }
            if (endInView) {
                // Nếu phần tử cuối cùng vào vùng nhìn thấy, đặt isFixed thành false
                setIsFixed(false);
            }
            // Nếu phần tử đầu tiên không còn trong view và phần tử cuối cùng chưa vào view
            if (!startInView && !endInView) {
                setIsFixed(false);
            }
        }

    }, [startInView, endInView, data?.data]);

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const meida = [
        {
            id: uuidv4(),
            link: dataContent?.data?.youtube_share_web_vote ?? '#',
            image: '/vote/new/pngwing.png'
        },
        {
            id: uuidv4(),
            link: dataContent?.data?.tiktok_share_web_vote ?? '#',
            image: '/vote/new/tiktok.png'
        },
        {
            id: uuidv4(),
            link: dataContent?.data?.facebook_share_web_vote ?? '#',
            image: '/vote/new/facebook.png'
        },
    ]

    console.log("data", data);
    console.log("dataContent", dataContent);


    if (!isMounted) {
        return null;
    }

    return (
        <div className='h-dvh bg-[url("/vote/new/backgroundRedBaby2.jpg")] bg-cover bg-no-repeat'>
            <ScrollArea type='hover' className="custom-container-child h-dvh pb-0">
                <div className='flex flex-col gap-6'>
                    <div className="w-full min-w-full h-[380px]">
                        <Image src={dataContent?.data?.img_header_web_vote?.link} width={1280} height={1024} alt='' className='object-contain size-full' />
                    </div>
                    <div className="flex items-start gap-2">
                        <Image src={'/vote/iconInfoBaby.png'} width={64} height={64} alt="" className='size-[22px] mt-0.5' />
                        <div className="flex flex-col gap-1">
                            <h1 className='text-[#231a32] font-bold text-base capitalize'>
                                {data?.title_header ?? ""}
                            </h1>
                            <h1 className='text-[#a5a29f] font-semibold text-base'>
                                {dataContent?.data?.content_short_web_vote ?? ''}
                            </h1>
                        </div>
                    </div>
                    <div className="w-[70%] h-[180px] mx-auto">
                        <Image src={'/vote/new/family.png'} width={1280} height={1024} alt='' className='object-contain size-full' />
                    </div>
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-9 flex items-center gap-2">
                            <Image src={'/vote/new/startIcon_yellow.png'} width={64} height={64} alt="" className='size-[22px] mt-0.5' />
                            <h1 className='text-[#231a32] font-bold text-base capitalize'>
                                {data?.title ?? ""}
                            </h1>
                        </div>
                        <Image src={'/vote/loveBaby.png'} width={64} height={64} alt="" className='size-[22px] col-span-3 mx-auto' />
                    </div>
                    <ScrollArea type='hover' className="h-full" ref={startRef}>
                        <div className="flex flex-col gap-2.5" >
                            {data?.data?.length > 0 ? data?.data?.map((e: any, index: any) => {
                                return (
                                    <div
                                        key={e?.id}
                                        className="grid grid-cols-12 gap-4 items-center"
                                    >
                                        <div className="col-span-9 bg-[url('/vote/new/image-name.png')] md:py-[58px] py-[38px] w-full bg-no-repeat bg-cover  bg-center rounded-2xl text-[#fefefe] flex items-center justify-between gap-3">
                                            <h1 className="md:text-lg text-base font-medium capitalize w-[80%] ml-6">
                                                {e?.fullname}
                                            </h1>
                                            <div className="flex flex-col gap-2 w-[20%]">
                                                <h1 className='md:text-base text-sm font-normal'>{index + 1}/{data?.count_all_name}</h1>
                                            </div>
                                        </div>
                                        <div className="col-span-3 mx-auto">
                                            {e?.checked ?
                                                <FaHeart onClick={() => onClickVote(e)} size={22} className={`text-[#de7861] cursor-pointer`} />
                                                :
                                                <FaRegHeart onClick={() => onClickVote(e)} size={22} className={`text-[#de7861] cursor-pointer`} />
                                            }
                                        </div>
                                    </div>
                                )
                            })
                                :
                                <NoData type='vote' />
                            }
                        </div>
                        {/* <div className="" ref={endRef}></div> */}
                    </ScrollArea>
                    <div id="yourDivId" className={`${isFixed ? "sticky bottom-1 w-full z-10" : ''} transition-all duration-200 ease-linear`}>
                        <div onClick={() => onSubmitArrayVote()} className={`${isFixed ? "py-8 md:py-14" : "py-8 md:py-14"} bg-[url('/vote/new/submit.png')]  group bg-no-repeat bg-cover bg-center  cursor-pointer`}>
                            <div className="text-2xl text-center uppercase text-white font-semibold hover:scale-105 transition-all duration-150 ease-linear">Bấm gửi bình chọn</div>
                        </div>
                    </div>

                    <div ref={endRef} className="flex justify-center w-full">
                        <Image src={'/vote/new/there-star.png'} width={1280} height={1024} alt="" className='object-contain size-[30%]' />
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="flex items-start gap-2">
                            <Image src={'/vote/iconInfoBaby.png'} width={64} height={64} alt="" className='size-[22px] mt-0.5' />
                            <h1 className='text-[#231a32] font-bold text-lg capitalize underline  underline-offset-4'>
                                Tìm Hiểu Thêm Về Thầy Nam & ZenMi:
                            </h1>
                        </div>
                        <div className="flex items-center justify-center gap-3 w-full">
                            {meida.map((e, index) => {
                                return (
                                    <Link key={index} href={e.link} className=''>
                                        <div className="size-10">
                                            <Image src={e.image} width={1280} height={1024} alt="" className='object-cover' />
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>

                    <div className="w-full">
                        <Iframe
                            url={ConvertYouTubeUrlToEmbed(dataContent?.data?.link_youtube_web_vote) ?? ""}
                            id={dataContent?.data?.link_youtube_web_vote ?? "video"}
                            width="100%"
                            display="block"
                            className="w-full  h-[270px]"
                        />
                    </div>


                    <div className="flex items-start gap-2">
                        <Image src={'/vote/iconInfoBaby.png'} width={64} height={64} alt="" className='size-[22px] mt-0.5' />
                        <div className="flex flex-col gap-6">
                            <h1 className='text-[#231a32] font-bold text-lg capitalize underline  underline-offset-4'>
                                Cảm nhận người thật việc thật
                            </h1>
                        </div>
                    </div>
                    <div className="">
                        <Swiper
                            slidesPerView={1}
                            centeredSlides
                            loop={true}
                            modules={[Autoplay]}
                            autoplay={{
                                delay: 2000,
                                disableOnInteraction: false
                            }}
                            className='w-full'
                        >
                            {
                                dataContent?.data?.slide_feel_web_vote && dataContent?.data?.slide_feel_web_vote?.map((e: any, idnex: any) => (
                                    <SwiperSlide
                                        key={idnex}
                                        className="w-full h-[500px]"

                                    >
                                        <Image
                                            src={e?.link}
                                            alt=""
                                            width={1280}
                                            height={1024}
                                            className="size-full rounded-3xl object-contain"
                                        />
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    </div>

                    <div className="flex justify-center w-full">
                        <Image src={'/vote/new/there-star.png'} width={1280} height={1024} alt="" className='object-contain size-[30%]' />
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <h1 className='text-[#231a32] font-bold text-lg uppercase text-center leading-7 whitespace-pre-wrap'>
                            {dataContent?.data?.content_introduce_web_vote ?? ""}
                        </h1>
                    </div>

                    <div className="" onClick={() => push(dataContent?.data?.link_download_app_in_web_vote ?? '')}>
                        < Image src={'/vote/new/share.jpg'} width={1280} height={1024} alt="" className='size-full object-cover' />
                    </div>

                </div>
            </ScrollArea >
        </div >
    )
}

export default Vote