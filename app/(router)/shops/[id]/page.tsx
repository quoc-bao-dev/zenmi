'use client'
import { useShopCart } from '@/hooks/useShopCart'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { FiShoppingCart } from "react-icons/fi"

import { IoIosArrowRoundBack } from "react-icons/io"
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import { FormatNumberDot } from '@/utils/Format/FormatNumber'
import { useRouter } from 'next/navigation'
import { FaStar } from "react-icons/fa"
import { MdSupportAgent } from "react-icons/md"

import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import { useQueryClient } from '@tanstack/react-query'
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
    const [cartScale, setCartScale] = useState<boolean>(false);
    const [flyingItem, setFlyingItem] = useState<any>(null);
    const [animationStyle, setAnimationStyle] = useState<any>({});
    const [selectedSlide, setSelectedSlide] = useState<any>(0);

    const queryDetailItem = (key: any) => setStateDetailItem(prev => ({ ...prev, ...key }))

    const handleSlideClick = (index: any) => {
        setSelectedSlide(index);
    };

    const cartRef = useRef<any>(null);

    useEffect(() => {
        if (params?.id) {
            if (JSON.stringify(dataDetail) == "{}") {
                router.push('/shops')
            }
            queryDetailItem({
                dataDetail:
                {
                    ...dataDetail,
                    imageSlider: {
                        image: Array.isArray(dataDetail?.list_images) ? dataDetail?.list_images : [dataDetail?.image] || [],
                        imageThumb: Array.isArray(dataDetail?.list_images) ? dataDetail?.list_images : [dataDetail?.image] || [],
                    }
                }
            })
        }
    }, [params?.id])

    // Hàm để tìm kiếm mặt hàng trong mảng
    const findItemIndex = (items: any, itemId: any) => items.findIndex((item: any) => item.id === itemId);

    // Hàm để cập nhật hoặc thêm mặt hàng vào mảng
    const updateOrAddItem = (items: any, newItem: any) => {
        const quantityToAdd = Number(newItem.quantity);

        const itemIndex = findItemIndex(items, newItem.id);
        if (itemIndex !== -1) {
            // Nếu mặt hàng đã tồn tại, tăng số lượng
            items[itemIndex].quantity += quantityToAdd;
        } else {
            const newItemWithQuantityAsNumber = { ...newItem, quantity: quantityToAdd };
            items.push(newItemWithQuantityAsNumber);
        }
        return [...items]; // Trả về một bản sao của mảng đã cập nhật
    };

    const handleAddcart = (event: any) => {
        const target = event.currentTarget.getBoundingClientRect();
        const cart = cartRef.current.getBoundingClientRect();

        const newData = updateOrAddItem(carItems, dataDetail)
        if (localStorage !== undefined) {
            localStorage.setItem('carItems', JSON.stringify(newData))
        }

        setCarItems(newData)

        const itemData = {
            ...dataDetail,
            startX: target.left + target.width / 2 - 35, // center of the item
            startY: target.top + target.height / 2 - 35, // center of the item
            endX: cart.left + cart.width / 2 - 35, // center of the cart
            endY: cart.top + cart.height / 2 - 35, // center of the cart

        };

        setFlyingItem(itemData);

        const style = {
            position: 'fixed',
            left: itemData.startX,
            top: itemData.startY,
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            opacity: 1,
            transform: 'scale(1.5)',
            transition: 'transform 1s ease, opacity 1.6s ease',
            zIndex: 1000,
        };

        setAnimationStyle(style);

        requestAnimationFrame(() => {
            setAnimationStyle((prev: any) => ({
                ...prev,
                transform: `translate(${itemData.endX - itemData.startX}px, ${itemData.endY - itemData.startY}px) scale(0.65)`,
                opacity: 0,
                scale: 1,
            }));
        });

        // Giỏ hàng phóng to khi hình ảnh đến
        setTimeout(() => {
            setCartScale(true);
            setTimeout(() => setCartScale(false), 300);
        }, 800);

        // Loại bỏ hình ảnh bay sau khi nó đến đích
        setTimeout(() => {
            setFlyingItem(null)
        }, 800);
    };

    return (
        <div className="flex flex-col gap-2 bg-gray-50 h-dvh relative">
            <div className="sticky top-0 z-[999] bg-white ">
                <div className="custom-container-child  flex items-center justify-between gap-2  py-2">
                    <div className=" flex items-center gap-1">
                        <div className="size-10">
                            <IoIosArrowRoundBack onClick={() => router.back()} size={22} className='size-full cursor-pointer text-rose-600' />
                        </div>
                        <h1 className='text-rose-500 text-lg leading-1 font-medium line-clamp-1 max-w-[85%]'>
                            {stateDetailItem.dataDetail?.name}
                        </h1>
                    </div>
                    <div ref={cartRef} onClick={() => router.push('/cart')} className=" hover:bg-rose-200 transition-all duration-150 cursor-pointer ease-linear bg-rose-50 rounded-xl group  p-3 relative">
                        <div className={`size-full flex items-center justify-center  transition-all duration-200 ease-linear ${cartScale ? 'scale-125' : ''}`}>
                            <FiShoppingCart className='text-rose-500' size={18} />
                        </div>
                        <div className={`absolute top-0.5 left-1/2 translate-x-0 text-rose-500 text-xs font-medium transition-transform duration-200 ease-linear ${cartScale ? 'scale-125' : ''}`}>
                            {carItems.reduce((acc: any, curr: any) => acc + +curr.quantity, 0) > 0 ? carItems.reduce((acc: any, curr: any) => acc + +curr.quantity, 0) : ''}
                        </div>
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
                            onSlideChange={(swiper) => handleSlideClick(swiper.realIndex)}
                            className="mySwiper2"
                        >
                            {stateDetailItem.dataDetail?.imageSlider?.image?.map((item, index) => (
                                <SwiperSlide key={index} className='min-h-[250px] h-[250px] max-h-[250px] cursor-pointer'>
                                    <Image src={item} alt="" width={1280} height={1280} className='w-full h-full object-cover' />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <div className=" bg-white shadow-[0_0_5px_rgba(0,0,0,0.1)]">
                        <div className="flex flex-col gap-2 custom-container-child py-2">
                            <h1 className='text-[#545454] text-base font-semibold leading-1'>{stateDetailItem.dataDetail?.name}</h1>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, index) => <FaStar key={index} className='text-yellow-500' />)}
                                </div>
                                <h1 className='text-gray-400 font-normal text-sm leading-1'>(0.0 đánh giá)</h1>
                                <h1 className='text-gray-400 font-normal text-sm leading-1'>Đã bán: {FormatNumberDot(stateDetailItem.dataDetail?.count)}</h1>
                            </div>
                            <h1 className='text-[#545454] font-medium text-lg leading-1'>{FormatNumberDot(stateDetailItem.dataDetail?.price)} vnđ</h1>
                        </div>

                    </div>
                    <div className="bg-white shadow-[0_0_5px_rgba(0,0,0,0.1)]">
                        <div className="custom-container-child py-2">
                            <h1 className='text-gray-500 font-normal text-base leading-1 mb-2'>Các loại hàng</h1>
                            <Swiper
                                onSwiper={setThumbsSwiper}
                                spaceBetween={10}
                                slidesPerView={4}
                                freeMode={true}
                                watchSlidesProgress={true}

                                modules={[FreeMode, Navigation, Thumbs]}
                                className="mySwiper"
                            >
                                {stateDetailItem.dataDetail?.imageSlider?.imageThumb?.map((item, index) => {
                                    return (
                                        <>
                                            <SwiperSlide key={index} className='size-[65px]'>
                                                <div
                                                    onClick={() => {
                                                        handleSlideClick(index)
                                                    }}
                                                    className={`size-[65px] cursor-pointer rounded-lg transition-all duration-150 ease-linear ${selectedSlide === index ? 'border-2 border-rose-500' : 'border-gray-100 border-2'}`}>
                                                    <Image src={item} alt="" width={1280} height={1280} className='w-full h-full object-cover p-1' />
                                                </div>
                                            </SwiperSlide>
                                        </>
                                    )
                                })}
                            </Swiper>
                        </div>
                    </div>

                    <div className="bg-white shadow-[0_0_5px_rgba(0,0,0,0.1)] py-2 flex flex-col gap-2">
                        <h1 className='text-rose-500 font-semibold text-lg text-center border-b-2 border-rose-500 pb-2'>Giới thiệu</h1>
                        <div className="custom-container-child text-[15px]  font-normal" dangerouslySetInnerHTML={{ __html: stateDetailItem.dataDetail?.content }}>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 items-center justify-center h-[48px]">
                    <div
                        onClick={(e) => handleAddcart(e)}
                        className='flex cursor-pointer items-center  justify-center bg-yellow-500 transition-all duration-150 ease-linear hover:bg-yellow-400 h-full'>
                        <div className="">
                            <FiShoppingCart className='text-white mx-auto' size={14} />
                            <h1 className='text-sm text-white font-medium h-full'>Thêm vào giỏ hàng</h1>
                        </div>
                    </div>
                    <div onClick={(e) => {
                        handleAddcart(e)
                        router.push('/cart')
                    }} className='text-sm bg-rose-500 transition-all duration-150 ease-linear hover:bg-rose-300 h-full flex items-center justify-center text-white cursor-pointer'>Mua ngay</div>
                </div >
                {flyingItem && (
                    <div
                        className="flying-image"
                        style={animationStyle}>
                        <Image src={flyingItem.image ?? ""} alt="" width={50} height={50} className='object-cover bg-transparent' />
                    </div>
                )}
            </div >
        </div >
    )
}

export default ShopsDetail