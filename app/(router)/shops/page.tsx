'use client'
import { Input } from '@/components/ui/input'
import { uuidv4 } from '@/lib/uuid'
import { ListCategorys, ListProducts } from '@/types/Shops/IShops'
import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, FreeMode, Autoplay, Navigation } from 'swiper/modules';
import Image from 'next/image'
import 'swiper/css/free-mode';

type Props = {}
type initialState = {
    listCategorys: ListCategorys[],
    listImageSlider: Omit<ListCategorys, 'name'>[]
    listProducts: ListProducts[],
    isTab: string
}
const Shops = (props: Props) => {
    const initialState: initialState = {
        listCategorys: [
            {
                id: uuidv4(),
                name: 'Tất cả',
                image: "/shop/listImageSlider/mazda4.png"
            },
            {
                id: uuidv4(),
                name: 'Vòng tay bé',
                image: "/shop/listImageSlider/mazda4.png"
            },
            {
                id: uuidv4(),
                name: 'Mặt dây bé',
                image: "/shop/listImageSlider/mazda4.png"
            },
            {
                id: uuidv4(),
                name: 'Phụ kiện bé',
                image: "/shop/listImageSlider/mazda4.png"
            },
            {
                id: uuidv4(),
                name: 'Lắc tay bé',
                image: "/shop/listImageSlider/mazda4.png"
            },
            {
                id: uuidv4(),
                name: 'Mũ bé',
                image: "/shop/listImageSlider/mazda4.png"
            }
        ],
        listImageSlider: [
            {
                id: uuidv4(),
                image: "/shop/listImageSlider/mazda4.png"
            },
            {
                id: uuidv4(),
                image: "/shop/listImageSlider/mec2.png"
            },
            {
                id: uuidv4(),
                image: "/shop/listImageSlider/mec2022.jpg"
            },
            {
                id: uuidv4(),
                image: "/shop/listImageSlider/mec2023.png"
            }
        ],
        listProducts: [
            {
                id: uuidv4(),
                name: "Tã/Bỉm dán Pampers nội địa Nhật Bản nội địa Nhật Bản",
                count: 1,
                image: "/shop/products/bim.png",
                price: 1000000,
                star: 3
            },
            {
                id: uuidv4(),
                name: "Bình Sữa Avent 125ml (0 - 6 tháng) ",
                count: 1,
                image: "/shop/products/bim.png",
                price: 1000000,
                star: 3
            }
        ],
        isTab: 'all'
    }

    const [isStateShop, setIsStateShop] = useState(initialState)

    const queryStateShop = (key: any) => setIsStateShop(prev => ({ ...prev, ...key }))

    return (
        <div className="flex flex-col gap-2">
            <div className='mt-4 custom-container-child'>
                <div className="relative">
                    <Input className='rounded-2xl border-orange-500 border-2 text-sm placeholder:text-orange-400 text-orange-400' placeholder='Tìm kiếm vật phẩm' />
                    <div className="bg-orange-600 h-9 w-12 flex items-center justify-center  absolute top-1/2 right-0 -translate-y-1/2 -translate-x-1 rounded-3xl">
                        <CiSearch className=' text-white' size={20} />
                    </div>
                </div>

            </div>
            <div className="my-1">
                <Swiper
                    // pagination={{
                    //     dynamicBullets: true,
                    // }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false
                    }}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                >
                    {isStateShop.listImageSlider.map((item, index) => (
                        <SwiperSlide key={index} className='max-h-[200px] min-h-[170px]'>
                            <Image src={item.image} alt="" width={1280} height={1280} className='w-full h-full object-contain' />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="flex flex-col gap-4 custom-container-child">
                <div className="">
                    <Swiper
                        slidesPerView={4}
                        spaceBetween={20}
                        freeMode={true}
                        modules={[FreeMode, Pagination]}
                        className="mySwiper "
                    >
                        {isStateShop.listCategorys.map((item, index) => (
                            <SwiperSlide key={index} className='flex flex-col items-center gap-1 group'>
                                <div className="bg-gray-200 size-12 rounded-full flex items-center justify-center">
                                    <Image src={item.image} alt="" width={1280} height={1280} className='size-10 rounded-full object-contain' />
                                </div>
                                <h1 className={`text-[10px] ${index == 0 ? 'text-rose-400' : 'text-gray-400'}  uppercase text-center leading-1 group-hover:text-rose-400 cursor-pointer`}>{item.name}</h1>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className=''>
                    <h1 className='text-rose-400 text-sm font-medium'>Sản phẩm dành riêng cho mẹ và bé</h1>
                    <div className='grid grid-cols-2 gap-4'>
                        {isStateShop.listProducts.map((item, index) => (
                            <div key={item.id} className='bg-white-200 shadow rounded-xl size-full col-span-1 flex flex-col gap-1'>
                                <div className='w-full h-44 p-2 mx-auto'>
                                    <Image src={item.image} alt="" width={1920} height={1920} className='object-cover size-full' />
                                </div>
                                <div className='p-2 flex flex-col gap-2'>
                                    <h1 className='text-rose-400 text-xs leading-1 font-semibold line-clamp-2'>{item.name}</h1>
                                    <h1 className='text-rose-500 font-bold text-sm'>{item.price} vnđ</h1>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shops