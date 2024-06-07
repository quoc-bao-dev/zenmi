'use client'
import { useShopCart } from '@/hooks/useShopCart'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FiShoppingCart } from "react-icons/fi"

import { IoIosArrowRoundBack } from "react-icons/io"
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import { FormatNumberDot } from '@/utils/Format/FormatNumber'
import { useRouter } from 'next/navigation'
import { FaStar } from "react-icons/fa"
import { MdSupportAgent } from "react-icons/md"

import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
type Props = {
    params: {
        id: string,
    }
    searchParams: {
        name: string
    }
}
type initialState = {
    dataDetail: {
        id: string,
        name: string,
        price: number,
        count: number,
        star: number,
        imageSlider: {
            image: string[],
            imageThumb: string[]
        }
        image: string
        content: string
    }
}
const ShopsDetail = ({ params, searchParams }: Props) => {
    const initialState: initialState = {
        dataDetail: {
            id: "",
            name: "",
            price: 0,
            count: 0,
            star: 0,
            image: "",
            imageSlider: {
                image: [''],
                imageThumb: ['']
            },
            content: "",
        }
    }
    const router = useRouter()

    const { carItems, setCarItems, dataDetail } = useShopCart()

    const [stateDetailItem, setStateDetailItem] = useState(initialState)

    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);


    const queryDetailItem = (key: any) => setStateDetailItem(prev => ({ ...prev, ...key }))

    useEffect(() => {
        if (params?.id) {
            console.log("dataDetail", dataDetail);
            queryDetailItem({
                dataDetail:
                {
                    ...dataDetail,
                    imageSlider: {
                        image: dataDetail?.list_images || [],
                        imageThumb: dataDetail?.list_images || [],
                    }
                }
            })
        }
    }, [params?.id])

    const handAddCart = () => {
        const checkItem = carItems.find(item => item?.id == +params?.id)
        if (checkItem) {
            return
        }
        const newData = [...carItems, checkItem]
        localStorage.setItem('carItems', JSON.stringify(newData))
        setCarItems(newData)
    }




    return (
        <div className="flex flex-col gap-2 bg-gray-50 h-dvh relative">
            <div className="sticky top-0 z-[999] bg-white ">
                <div className="custom-container-child  flex items-center justify-between gap-2  py-2">
                    <div className=" flex items-center gap-1">
                        <div className="size-10">
                            <IoIosArrowRoundBack onClick={() => router.back()} size={22} className='size-full cursor-pointer text-rose-600' />
                        </div>
                        <h1 className='text-rose-500 text-sm leading-1 font-medium truncate max-w-[200px]'>{stateDetailItem.dataDetail?.name}</h1>
                    </div>
                    <div onClick={() => router.push('/cart')} className=" hover:bg-rose-200 transition-all duration-150 cursor-pointer ease-linear bg-rose-50 rounded-xl group  p-3 relative">
                        <div className="size-full flex items-center justify-center">
                            <FiShoppingCart className='text-rose-500' size={18} />
                        </div>
                        <div className="absolute top-0.5 left-1/2 translate-x-0 text-rose-500 text-xs font-medium">{carItems?.length > 0 ? carItems?.length : ''}</div>
                    </div>
                </div>
            </div>
            <div className="h-[calc(100dvh_-_66px)] flex flex-col justify-between">
                <div className="flex mb-2 h-[calc(100dvh_-_60px)] flex-col gap-1  overflow-y-auto ">
                    <div className="custom-container-child">
                        <Swiper
                            spaceBetween={10}
                            slidesPerView={1}
                            thumbs={{ swiper: thumbsSwiper }}
                            modules={[FreeMode, Thumbs]}
                            className="mySwiper2"
                        >
                            {stateDetailItem.dataDetail?.imageSlider?.image?.map((item, index) => (
                                <SwiperSlide key={index} className='min-h-[250px] h-[250px] max-h-[250px] cursor-pointer'>
                                    <Image src={item ?? ""} alt="" width={1280} height={1280} className='w-full h-full object-cover' />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <div className=" bg-white shadow-[0_0_5px_rgba(0,0,0,0.1)]">
                        <div className="flex flex-col gap-2 custom-container-child py-2">
                            <h1 className='text-rose-500 text-sm font-semibold leading-1'>{stateDetailItem.dataDetail?.name}</h1>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, index) => <FaStar key={index} className='text-yellow-500' />)}
                                </div>
                                <h1 className='text-gray-400 font-normal text-xs leading-1'>(0.0 đánh giá)</h1>
                                <h1 className='text-gray-400 font-normal text-xs leading-1'>Đã bán: {FormatNumberDot(stateDetailItem.dataDetail?.count)}</h1>
                            </div>
                            <h1 className='text-rose-500 font-medium text-SM leading-1'>{FormatNumberDot(stateDetailItem.dataDetail?.price)} vnđ</h1>
                        </div>

                    </div>
                    <div className="bg-white shadow-[0_0_5px_rgba(0,0,0,0.1)]">
                        <div className="custom-container-child py-2">
                            <h1 className='text-gray-500 font-normal text-xs leading-1 mb-2'>Các loại hàng</h1>
                            <Swiper
                                onSwiper={setThumbsSwiper}
                                spaceBetween={10}
                                slidesPerView={4}
                                freeMode={true}
                                watchSlidesProgress={true}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className="mySwiper"
                            >
                                {stateDetailItem.dataDetail?.imageSlider?.imageThumb?.map((item, index) => (
                                    <SwiperSlide key={index} className='size-[50px] cursor-pointer'>
                                        <Image src={item ?? ""} alt="" width={1280} height={1280} className='w-full h-full object-cover' />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>

                    <div className="bg-white shadow-[0_0_5px_rgba(0,0,0,0.1)] py-2 flex flex-col gap-2">
                        <h1 className='text-rose-500 font-semibold text-sm text-center border-b-2 border-rose-500 pb-2'>Giới thiệu</h1>
                        <div className="custom-container-child text-xs  font-normal" dangerouslySetInnerHTML={{ __html: stateDetailItem.dataDetail?.content }}>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-3 items-center justify-center h-[48px]">
                    <div className='flex items-center justify-center bg-yellow-400 h-full'>
                        <div className="">
                            <MdSupportAgent className='text-white mx-auto' size={14} />
                            <h1 className='text-xs text-white font-medium'>CSKH</h1>
                        </div>
                    </div>
                    <div className='flex items-center  justify-center bg-yellow-400 h-full'>
                        <div onClick={() => handAddCart()} className="cursor-pointer">
                            <FiShoppingCart className='text-white mx-auto' size={14} />
                            <h1 className='text-xs text-white font-medium h-full'>Thêm vào giỏ hàng</h1>
                        </div>
                    </div>
                    <div onClick={() => router.push('/cart')} className='text-xs bg-rose-500 h-full flex items-center justify-center text-white'>Mua ngay</div>
                </div >

            </div >
        </div >
    )
}

export default ShopsDetail