'use client'
import NoData from '@/components/no-data/NoData'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { useShopCart } from '@/hooks/useShopCart'
import { getListCategoryProducts } from '@/services/Shops/shops.services'
import { ListCategorys, ListProducts } from '@/types/Shops/IShops'
import ConvertToSlug from '@/utils/Cconvert/ConvertToSlug'
import { FormatNumberDot } from '@/utils/Format/FormatNumber'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { CiSearch, CiStar } from 'react-icons/ci'
import { FiShoppingCart } from "react-icons/fi"
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { setTimeout } from 'timers'
type Props = {}
type initialState = {
    listCategorys: ListCategorys[],
    listImageSlider: Omit<ListCategorys, 'name'>[]
    listProducts: ListProducts[],
    isCategory: any,
    valueSearch: string,
    nodata: boolean
}
const Shops = (props: Props) => {
    const initialState: initialState = {
        listCategorys: [],
        listImageSlider: [
            {
                id: 1,
                image: "/example/shop/listImageSlider/test0.jpeg"
            },
            {
                id: 2,
                image: "/example/shop/listImageSlider/test1.jpeg"
            },
            {
                id: 3,
                image: "/example/shop/listImageSlider/test2.jpeg"
            },
            {
                id: 4,
                image: "/example/shop/listImageSlider/test3.jpeg"
            }
        ],
        listProducts: [],
        isCategory: null,
        valueSearch: '',
        nodata: false
    }

    const router = useRouter()

    const queryClient = useQueryClient();

    const cartRef = useRef<any>(null);

    const [cartScale, setCartScale] = useState<boolean>(false);

    const [flyingItem, setFlyingItem] = useState<any>(null);

    const [animationStyle, setAnimationStyle] = useState<any>({});

    const { carItems, setCarItems, setDataDetail } = useShopCart()

    const [isStateShop, setIsStateShop] = useState(initialState)

    const queryStateShop = (key: any) => setIsStateShop(prev => ({ ...prev, ...key }))

    const { data, isLoading, error, } = useQuery({
        queryKey: ['listCategoryProducts'],
        queryFn: async () => {
            const { data } = await getListCategoryProducts()
            const newData = data?.data.map((e: any) => {
                return {
                    id: e.id,
                    name: e.name,
                    image: e.image ? e.image : Array.isArray(e?.list_images) ? e?.list_images[0] : "",
                }
            })
            queryStateShop({ listCategorys: newData, isCategory: newData[0]?.id })
            return data
        },
    })

    useEffect(() => {
        if (data) {
            const newData = data?.data?.find((e: any) => e.id === (isStateShop.isCategory))?.data?.map((i: any) => {
                return {
                    ...i,
                    id: i?.id,
                    name: i?.title,
                    count: 1,
                    image: i?.featured_image ? i?.featured_image : Array.isArray(i?.list_images) ? i?.list_images[0] : "",
                    price: i?.price,
                    quantity: 1,
                    star: 3,
                }
            })
            queryStateShop({ listProducts: newData })
        }
    }, [data, isStateShop.isCategory])


    const handleAddcart = (item: any, event: any) => {
        const target = event.currentTarget.getBoundingClientRect();
        const cart = cartRef.current.getBoundingClientRect();

        const checkItem = carItems.find((x: any) => x?.id === item?.id)
        if (checkItem) {
            return
        }

        const newData = [...carItems, item]
        if (localStorage !== undefined) {
            localStorage.setItem('carItems', JSON.stringify(newData))
        }

        setCarItems(newData)

        const itemData = {
            ...item,
            // startX: target.left,
            // startY: target.top,
            // endX: cart.left,
            // endY: cart.top
            startX: target.left + target.width / 2 - 35, // center of the item
            startY: target.top + target.height / 2 - 35, // center of the item
            endX: cart.left + cart.width / 2 - 35, // center of the cart
            endY: cart.top + cart.height / 2 - 35, // center of the cart
            // startX: target.left + target.width / 2,
            // startY: target.top + target.height / 2,
            // endX: cart.left + cart.width / 2,
            // endY: cart.top + cart.height / 2,
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

        // Bắt đầu animation
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
        setTimeout(() => setFlyingItem(null), 1000);
    };


    const handleDetail = async (e: any) => {
        setDataDetail(e)
        router.push(`/shops/${e.id}?name=${ConvertToSlug(e.name)}.html`)
    }


    useEffect(() => {
        function removeDiacritics(str: any) {
            return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        }

        const filteredData = isStateShop.listProducts.filter(item =>
            removeDiacritics(item.name.toLowerCase()).includes(removeDiacritics(isStateShop.valueSearch.toLowerCase()))
        );

        const cacheData = queryClient.getQueryData(['listCategoryProducts']) as any

        const dataDefault = cacheData?.data?.find((e: any) => e.id === isStateShop.isCategory)?.data?.map((i: any) => {
            return {
                ...i,
                id: i?.id,
                name: i?.title,
                count: 1,
                image: i?.featured_image ? i?.featured_image : Array.isArray(i?.list_images) ? i?.list_images[0] : "",
                price: i?.price,
                quantity: 1,
                star: 3,

            }
        })
        queryStateShop({
            listProducts: isStateShop.valueSearch != "" ? filteredData : dataDefault,
            nodata: isStateShop.valueSearch != "" && filteredData?.length == 0 ? true : false
        })

    }, [isStateShop.valueSearch])



    return (
        <div className="flex flex-col gap-2 bg-gray-50 h-dvh overflow-hidden">
            <div className='sticky top-0 z-[999] bg-white'>
                <div className="custom-container-child  flex items-center justify-between gap-2  py-2">
                    <div className="relative w-[89%]">
                        <Input onChange={(e) => queryStateShop({ valueSearch: e.target.value })} className='rounded-full border-rose-500 border text-sm placeholder:text-rose-400 text-rose-400' placeholder='Tìm kiếm vật phẩm' />
                        <div className="bg-rose-500 h-9 w-9 flex items-center justify-center  absolute top-1/2 right-0 -translate-y-1/2 -translate-x-1 rounded-full">
                            <CiSearch className=' text-white' size={20} />
                        </div>
                    </div>
                    <div className="w-[11%] hover:bg-rose-200 transition-all duration-150 cursor-pointer ease-linear bg-rose-50 rounded-xl group  p-3 relative">
                        <div ref={cartRef} className={`size-full flex items-center justify-center transition-all duration-200 ease-linear ${cartScale ? 'scale-125' : ''}`}
                        >
                            <FiShoppingCart onClick={() => router.push('/cart')} className={`text-rose-500 `} size={18} />
                        </div>
                        <div className={`absolute top-0.5 left-1/2 translate-x-0 text-rose-500 text-xs font-medium transition-transform duration-200 ease-linear ${cartScale ? 'scale-125' : ''}`}>{carItems?.length > 0 ? carItems?.length : ''}</div>
                    </div>
                </div>
            </div>
            <div className="mb-2">
                <Swiper
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false
                    }}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                >
                    {isStateShop.listImageSlider.map((item, index) => (
                        <SwiperSlide key={index} className='max-h-[200px] h-[200px] min-h-[200px] overflow-hidden'>
                            <Image src={item.image ?? ""} alt="" width={1280} height={1280} className='w-full h-full object-cover' />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="flex flex-col gap-4 custom-container-child">
                <div className="">
                    {isLoading ?
                        <div className='flex flex-col gap-2 items-center'>
                            <Skeleton className='h-3 w-full bg-gray-100 rounded-full' />
                            <Skeleton className='h-3 w-full bg-gray-100 rounded-full' />
                            <Skeleton className='h-3 w-full bg-gray-100 rounded-full' />
                        </div> :
                        <Swiper
                            slidesPerView={5}
                            spaceBetween={10}
                            freeMode={true}
                            modules={[FreeMode, Pagination]}
                            className="mySwiper "
                        >
                            {isStateShop.listCategorys.map((item, index) => (
                                <SwiperSlide onClick={() => queryStateShop({ isCategory: item?.id })} key={index} className='flex flex-col items-center gap-1 group  cursor-pointer'>
                                    <div className="bg-gray-200 size-12 rounded-full flex items-center justify-center">
                                        <Image src={item.image ?? ""} alt="" width={1280} height={1280} className='size-10 rounded-full object-contain' />
                                    </div>
                                    <h1 className={`text-[10px] ${item?.id == isStateShop.isCategory ? 'text-rose-400' : 'text-gray-400'}  uppercase text-center leading-1 group-hover:text-rose-400 transition-all duration-150 ease-linear cursor-pointer`}>{item.name}</h1>
                                </SwiperSlide>
                            ))}
                        </Swiper>}
                </div>
                <div className='flex flex-col gap-4'>
                    <h1 className='text-black text-base font-semibold'>Sản phẩm dành riêng cho mẹ và bé</h1>
                    <div className="">
                        {
                            isStateShop.nodata ?
                                <NoData type='shops' className='col-span-2' /> :
                                <div className='grid grid-cols-2 gap-4 mb-4 h-[calc(100dvh_-_418px)] pr-3 overflow-y-auto'>
                                    {isLoading ? [...Array(4)].map((_, index) => {
                                        return (
                                            <div key={index} className='group rounded-xl size-full col-span-1 flex flex-col gap-1  cursor-pointer h-fit'>
                                                <Skeleton className='w-full bg-gray-100 h-32 p-2 mx-auto overflow-hidden'>
                                                </Skeleton>
                                                <Skeleton className='py-3  bg-gray-100'></Skeleton>
                                                <Skeleton className='py-3  bg-gray-100'></Skeleton>
                                                <Skeleton className='py-3  bg-gray-100'></Skeleton>
                                            </div>
                                        )
                                    }) :
                                        isStateShop?.listProducts?.map((item, index) => (
                                            <div key={item.id} className="relative bg-white mb-2 shadow-[0_0_5px_rgba(0,0,0,0.1)] col-span-1 h-fit rounded-xl">
                                                <div
                                                    onClick={() => handleDetail(item)}
                                                    className=' cursor-pointer group flex flex-col gap-1 w-full h-fit'
                                                >
                                                    <div className='w-full min-h-[156px] bg-white cursor-pointer max-h-[156px] mx-auto overflow-hidden rounded-md'>
                                                        <Image src={item.image ?? ""} alt="" width={1920} height={1920} className='object-contain size-full min-h-[156px] max-h-[156px] group-hover:scale-105 rounded-2xl transition-all duration-150 ease-linear' />
                                                        {/* <Image src={"/example/shop/products/sua.png"} alt="" width={1920} height={1920} className='object-contain size-full max-h-[156px] group-hover:scale-105 rounded-md transition-all duration-150 ease-linear' /> */}
                                                    </div>
                                                    <div className='p-2 flex flex-col gap-1'>
                                                        <div className="flex flex-col gap-1">
                                                            <h1 className='cursor-pointer min-h-[35px] text-black text-xs leading-1 font-semibold line-clamp-2 group-hover:text-black/80 transition-all duration-150 ease-linear'>{item.name}</h1>
                                                            <h1 className='text-[#545454] group-hover:text-[#545454]/80 transition-all duration-150 ease-linear font-bold text-sm'>{FormatNumberDot(item.price)} vnđ</h1>
                                                        </div>
                                                        <div className="flex items-center justify-start gap-5">
                                                            <h1 className='text-gray-400 font-normal text-xs flex items-center gap-1'><CiStar size={19} /><span>{item.star}/5</span></h1>
                                                            <h1 className='text-gray-400 font-normal text-xs leading-1'>Đã bán {FormatNumberDot(item.count)}</h1>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="cursor-pointer absolute bottom-1.5 right-2">
                                                    <FiShoppingCart
                                                        onClick={(e) => handleAddcart(item, e)}
                                                        className=' text-rose-500 m-1 group-hover:text-rose-400 hover:scale-105 transition-all duration-150 ease-linear'
                                                        size={22}
                                                    />
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                        }
                        {flyingItem && (
                            <div
                                className="flying-image"
                                style={animationStyle}>
                                <Image src={flyingItem.image ?? ""} alt="" width={50} height={50} className='object-cover bg-transparent' />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shops