'use client'
import { Input } from '@/components/ui/input'
import { useShopCart } from '@/hooks/useShopCart'
import { uuidv4 } from '@/lib/uuid'
import { ListCategorys, ListProducts } from '@/types/Shops/IShops'
import ConvertToSlug from '@/utils/Cconvert/ConvertToSlug'
import { FormatNumberDot } from '@/utils/Format/FormatNumber'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { CiSearch, CiStar } from 'react-icons/ci'
import { FiShoppingCart } from "react-icons/fi"
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
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
                id: 1,
                name: 'Tất cả',
                image: "/shop/listImageSlider/mazda4.png"
            },
            {
                id: 2,
                name: 'Vòng tay bé',
                image: "/shop/listImageSlider/mazda4.png"
            },
            {
                id: 3,
                name: 'Mặt dây bé',
                image: "/shop/listImageSlider/mazda4.png"
            },
            {
                id: 4,
                name: 'Phụ kiện bé',
                image: "/shop/listImageSlider/mazda4.png"
            },
            {
                id: 5,
                name: 'Lắc tay bé',
                image: "/shop/listImageSlider/mazda4.png"
            },
            {
                id: 6,
                name: 'Mũ bé',
                image: "/shop/listImageSlider/mazda4.png"
            }
        ],
        listImageSlider: [
            {
                id: 1,
                image: "/shop/listImageSlider/mazda4.png"
            },
            {
                id: 2,
                image: "/shop/listImageSlider/mec2.png"
            },
            {
                id: 3,
                image: "/shop/listImageSlider/mec2022.jpg"
            },
            {
                id: 4,
                image: "/shop/listImageSlider/mec2023.png"
            }
        ],
        listProducts: [
            {
                id: 1,
                name: "Tã/Bỉm dán Pampers nội địa Nhật Bản nội địa Nhật Bản",
                count: 1,
                image: "/shop/products/bim.png",
                price: 1000000,
                star: 3
            },
            {
                id: 2,
                name: "Bình Sữa Avent 125ml (0 - 6 tháng) ",
                count: 1,
                image: "/shop/products/bim.png",
                price: 1000000,
                star: 3
            },
            {
                id: 3,
                name: "Bình Sữa Avent 125ml (0 - 6 tháng) ",
                count: 1,
                image: "/shop/products/bim.png",
                price: 1000000,
                star: 3
            },
            {
                id: 4,
                name: "Bình Sữa Avent 125ml (0 - 6 tháng) ",
                count: 1,
                image: "/shop/products/bim.png",
                price: 1000000,
                star: 3
            },
            {
                id: 5,
                name: "Bình Sữa Avent 125ml (0 - 6 tháng) ",
                count: 1,
                image: "/shop/products/bim.png",
                price: 1000000,
                star: 3
            }
        ],
        isTab: 'all'
    }
    const router = useRouter()
    const { carItems, setCarItems } = useShopCart()

    const [isStateShop, setIsStateShop] = useState(initialState)

    const queryStateShop = (key: any) => setIsStateShop(prev => ({ ...prev, ...key }))

    const handleAddcart = (e: ListProducts) => {
        const checkItem = carItems.find(item => item.id === e.id)
        console.log("checkItem", carItems);
        console.log("e", e);

        if (checkItem) {
            return
        }
        const newData = [...carItems, e]
        localStorage.setItem('carItems', JSON.stringify(newData))
        setCarItems(newData)
    }

    return (
        <div className="flex flex-col gap-2 bg-gray-50">
            <div className='sticky top-0 z-[999] bg-white'>
                <div className="custom-container-child py-2 flex items-center gap-2">
                    <div className="relative w-[85%]">
                        <Input className='rounded-full border-orange-500 border-2 text-sm placeholder:text-orange-400 text-orange-400' placeholder='Tìm kiếm vật phẩm' />
                        <div className="bg-orange-600 h-9 w-9 flex items-center justify-center  absolute top-1/2 right-0 -translate-y-1/2 -translate-x-1 rounded-full">
                            <CiSearch className=' text-white' size={20} />
                        </div>
                    </div>
                    <div className="w-[15%] hover:bg-rose-200 transition-all duration-150 cursor-pointer ease-linear bg-rose-50 rounded-xl group  p-3 relative">
                        <div className="size-full flex items-center justify-center">
                            <FiShoppingCart onClick={() => router.push('/cart')} className='text-rose-500' size={18} />
                        </div>
                        <div className="absolute top-0.5 left-1/2 translate-x-0 text-rose-500 text-xs font-medium">{carItems?.length > 0 ? carItems?.length : ''}</div>
                    </div>
                </div>
            </div>
            <div className="mb-2">
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
                        spaceBetween={10}
                        freeMode={true}
                        modules={[FreeMode, Pagination]}
                        className="mySwiper "
                    >
                        {isStateShop.listCategorys.map((item, index) => (
                            <SwiperSlide key={index} className='flex flex-col items-center gap-1 group  cursor-pointer'>
                                <div className="bg-gray-200 size-12 rounded-full flex items-center justify-center">
                                    <Image src={item.image} alt="" width={1280} height={1280} className='size-10 rounded-full object-contain' />
                                </div>
                                <h1 className={`text-[10px] ${index == 0 ? 'text-rose-400' : 'text-gray-400'}  uppercase text-center leading-1 group-hover:text-rose-400 transition-all duration-150 ease-linear cursor-pointer`}>{item.name}</h1>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className='flex flex-col gap-4'>
                    <h1 className='text-rose-400 text-sm font-medium'>Sản phẩm dành riêng cho mẹ và bé</h1>
                    <div className='grid grid-cols-2 gap-4 mb-4'>
                        {isStateShop.listProducts.map((item, index) => (
                            <Link href={`/shops/${item.id}?name=${ConvertToSlug(item.name)}`} key={item.id} className='bg-gray-50 shadow-[0_0_5px_rgba(0,0,0,0.1)] group rounded-xl size-full col-span-1 flex flex-col gap-1  cursor-pointer'>
                                <div className='w-full h-32 p-2 mx-auto overflow-hidden'>
                                    <Image src={item.image} alt="" width={1920} height={1920} className='object-cover size-full group-hover:scale-105 transition-all duration-150 ease-linear' />
                                </div>
                                <div className='p-2 flex flex-col gap-5'>
                                    <div className="flex flex-col gap-1">
                                        <h1 className='text-rose-500 text-xs leading-1 font-semibold line-clamp-2 group-hover:text-rose-400 transition-all duration-150 ease-linear'>{item.name}</h1>
                                        <div className="flex justify-between items-center">
                                            <h1 className='text-rose-500 group-hover:text-rose-400 transition-all duration-150 ease-linear font-bold text-sm'>{FormatNumberDot(item.price)} vnđ</h1>
                                            <FiShoppingCart onClick={() => handleAddcart(item)} className='text-rose-500 group-hover:text-rose-400 hover:scale-105 transition-all duration-150 ease-linear' size={14} />
                                        </div>

                                    </div>
                                    <div className="flex items-center justify-start gap-5">
                                        <h1 className='text-gray-400 font-normal text-xs flex items-center gap-1'><CiStar size={19} /><span>{item.star}/5</span></h1>
                                        <h1 className='text-gray-400 font-normal text-xs leading-1'>Đã bán {FormatNumberDot(item.count)}</h1>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shops