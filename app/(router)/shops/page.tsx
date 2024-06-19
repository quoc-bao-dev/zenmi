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
    listProductsFloating: ListProducts[],
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
        nodata: false,
        listProductsFloating: [
            {
                count: 10,
                id: 1,
                image: "/example/shop/floating/1.gif",
                name: "Vòng tay hợp mệnh",
                price: 100000,
                star: 2,
                quantity: 1,
                content: `
               <div class="content">
                    <p><span class="highlight">Chế tác thủ công:</span></p>
                    <ul>
                        <li>Vòng tay hợp mệnh 6 ly mix bạc, thiết kế theo size vòng tay của từng bé</li>
                        <li>Charm bạc hình hoa lá hoặc hình con vật theo tuổi</li>
                        <li>Có 2 mẫu: vòng trơn và vòng tết dây đỏ</li>
                    </ul>
                    <p>Thấu hiểu tấm lòng của các bậc làm cha làm mẹ luôn mong muốn dành những điều tốt nhất cho con, sản phẩm Vòng Bảo Nhi được chế tác từ trầm hương tự nhiên đã ra đời. Không chỉ tốt cho sức khỏe của bé mà còn có ý nghĩa về mặt tâm linh; đặc biệt với trẻ "nhẹ vía", hay bị giật mình.</p>
                </div>

                <div class="content">
                    <p><span class="highlight">Vòng tay hợp mệnh có gì đặc biệt?</span></p>
                    <ul>
                        <li>Vòng trầm hạt tròn mix charm bạc hình hoa hồng nhỏ xinh cho bé gái. Vòng đốt trúc khỏe khoắn, charm bạc tròn dành cho bé nam, vừa làm đẹp vừa kỵ gió</li>
                        <li>Dây xỏ vòng Bảo Nhi là dây chun Nhật Bản siêu bền, có tính đàn hồi cao, an toàn với trẻ nhỏ</li>
                        <li>Chế tác thủ công từ trầm hương Việt Nam được giới chuyên gia quốc tế đánh giá thuộc loại tốt nhất trên thế giới về mùi hương và tinh dầu</li>
                        <li>Mẫu mã đa đạng, phù hợp với sở thích của các bé ở mọi lứa tuổi</li>
                        <li>Vòng được thiết kế bởi những người thợ lành nghề, cẩn thận trong từng chi tiết nhỏ, đảm bảo không còn xơ gỗ để tránh gây chầy xước trên da bé</li>
                        <li>Phần tết dây đỏ có thể điều chỉnh theo kích thước cổ tay của bé</li>
                        <li>Vì là trầm hương tự nhiên nên vòng càng đeo càng bóng, do tác động nhiệt các vân gỗ nhìn rõ, không bị mất mùi</li>
                        <li>Với vòng Bảo Nhi bé có thể đeo tay, đeo chân, để ở dưới gối hoặc bên cạnh khi ngủ để năng lượng dương từ trầm hương bảo vệ bé</li>
                    </ul>
                </div>
                `
            },
            {
                count: 5,
                id: 3,
                image: "/example/shop/floating/3.gif",
                name: "Vòng trầm cho bé",
                price: 100000,
                star: 2,
                quantity: 1,
                content: `
               <div class="content">
                    <p><span class="highlight">Chế tác thủ công:</span></p>
                    <ul>
                        <li>Vòng Trầm Cho Bé, thiết kế theo size vòng tay của từng bé</li>
                        <li>Charm bạc hình hoa lá hoặc hình con vật theo tuổi</li>
                        <li>Có 2 mẫu: vòng trơn và vòng tết dây đỏ</li>
                    </ul>
                    <p>Thấu hiểu tấm lòng của các bậc làm cha làm mẹ luôn mong muốn dành những điều tốt nhất cho con, sản phẩm Vòng Bảo Nhi được chế tác từ trầm hương tự nhiên đã ra đời. Không chỉ tốt cho sức khỏe của bé mà còn có ý nghĩa về mặt tâm linh; đặc biệt với trẻ "nhẹ vía", hay bị giật mình.</p>
                </div>

                <div class="content">
                    <p><span class="highlight">Vòng Trầm Cho Bé có gì đặc biệt?</span></p>
                    <ul>
                        <li>Vòng trầm hạt tròn mix charm bạc hình hoa hồng nhỏ xinh cho bé gái. Vòng đốt trúc khỏe khoắn, charm bạc tròn dành cho bé nam, vừa làm đẹp vừa kỵ gió</li>
                        <li>Dây xỏ vòng Bảo Nhi là dây chun Nhật Bản siêu bền, có tính đàn hồi cao, an toàn với trẻ nhỏ</li>
                        <li>Chế tác thủ công từ trầm hương Việt Nam được giới chuyên gia quốc tế đánh giá thuộc loại tốt nhất trên thế giới về mùi hương và tinh dầu</li>
                        <li>Mẫu mã đa đạng, phù hợp với sở thích của các bé ở mọi lứa tuổi</li>
                        <li>Vòng được thiết kế bởi những người thợ lành nghề, cẩn thận trong từng chi tiết nhỏ, đảm bảo không còn xơ gỗ để tránh gây chầy xước trên da bé</li>
                        <li>Phần tết dây đỏ có thể điều chỉnh theo kích thước cổ tay của bé</li>
                        <li>Vì là trầm hương tự nhiên nên vòng càng đeo càng bóng, do tác động nhiệt các vân gỗ nhìn rõ, không bị mất mùi</li>
                        <li>Với vòng Bảo Nhi bé có thể đeo tay, đeo chân, để ở dưới gối hoặc bên cạnh khi ngủ để năng lượng dương từ trầm hương bảo vệ bé</li>
                    </ul>
                </div>
                `
            },
            {
                count: 3,
                id: 2,
                image: "/example/shop/floating/2.gif",
                name: "Nhẫn Tỳ Hưu Hợp Mệnh",
                price: 100000,
                star: 1,
                quantity: 1,
                content: `
                <div class="content">
                     <p><span class="highlight">Chế tác thủ công:</span></p>
                     <ul>
                         <li>Nhẫn Tỳ Hưu Hợp Mệnh, thiết kế theo size nhẫn tay của từng bé</li>
                         <li>Charm bạc hình hoa lá hoặc hình con vật theo tuổi</li>
                         <li>Có 2 mẫu: nhẫn trơn và nhẫn tết dây đỏ</li>
                     </ul>
                     <p>Thấu hiểu tấm lòng của các bậc làm cha làm mẹ luôn mong muốn dành những điều tốt nhất cho con, sản phẩm nhẫn Bảo Nhi được chế tác từ trầm hương tự nhiên đã ra đời. Không chỉ tốt cho sức khỏe của bé mà còn có ý nghĩa về mặt tâm linh; đặc biệt với trẻ "nhẹ vía", hay bị giật mình.</p>
                 </div>
 
                 <div class="content">
                     <p><span class="highlight">Nhẫn Tỳ Hưu Hợp Mệnh có gì đặc biệt?</span></p>
                     <ul>
                         <li>nhẫn trầm hạt tròn mix charm bạc hình hoa hồng nhỏ xinh cho bé gái. nhẫn đốt trúc khỏe khoắn, charm bạc tròn dành cho bé nam, vừa làm đẹp vừa kỵ gió</li>
                         <li>Dây xỏ nhẫn Bảo Nhi là dây chun Nhật Bản siêu bền, có tính đàn hồi cao, an toàn với trẻ nhỏ</li>
                         <li>Chế tác thủ công từ trầm hương Việt Nam được giới chuyên gia quốc tế đánh giá thuộc loại tốt nhất trên thế giới về mùi hương và tinh dầu</li>
                         <li>Mẫu mã đa đạng, phù hợp với sở thích của các bé ở mọi lứa tuổi</li>
                         <li>nhẫn được thiết kế bởi những người thợ lành nghề, cẩn thận trong từng chi tiết nhỏ, đảm bảo không còn xơ gỗ để tránh gây chầy xước trên da bé</li>
                         <li>Phần tết dây đỏ có thể điều chỉnh theo kích thước cổ tay của bé</li>
                         <li>Vì là trầm hương tự nhiên nên nhẫn càng đeo càng bóng, do tác động nhiệt các vân gỗ nhìn rõ, không bị mất mùi</li>
                         <li>Với nhẫn Bảo Nhi bé có thể đeo tay, đeo chân, để ở dưới gối hoặc bên cạnh khi ngủ để năng lượng dương từ trầm hương bảo vệ bé</li>
                     </ul>
                 </div>
                 `
            }
            , {
                count: 19,
                id: 4,
                image: "/example/shop/floating/4.gif",
                name: "Phật Bản Mệnh",
                price: 100000,
                star: 8,
                quantity: 1,
                content: `
                <div class="content">
                     <p><span class="highlight">Chế tác thủ công:</span></p>
                     <ul>
                         <li>Phật Bản Mệnh, thiết kế theo size của từng bé</li>
                         <li>Charm bạc hình hoa lá hoặc hình con vật theo tuổi</li>
                         <li>Có 2 mẫu: Phật bản mệnh trơn và Phật bản mệnh tết dây đỏ</li>
                     </ul>
                     <p>Thấu hiểu tấm lòng của các bậc làm cha làm mẹ luôn mong muốn dành những điều tốt nhất cho con, sản phẩm Phật bản mệnh Bảo Nhi được chế tác từ trầm hương tự nhiên đã ra đời. Không chỉ tốt cho sức khỏe của bé mà còn có ý nghĩa về mặt tâm linh; đặc biệt với trẻ "nhẹ vía", hay bị giật mình.</p>
                 </div>
 
                 <div class="content">
                     <p><span class="highlight">Phật Bản Mệnh có gì đặc biệt?</span></p>
                     <ul>
                         <li>Phật bản mệnh trầm hạt tròn mix charm bạc hình hoa hồng nhỏ xinh cho bé gái. Phật bản mệnh đốt trúc khỏe khoắn, charm bạc tròn dành cho bé nam, vừa làm đẹp vừa kỵ gió</li>
                         <li>Dây xỏ Phật bản mệnh Bảo Nhi là dây chun Nhật Bản siêu bền, có tính đàn hồi cao, an toàn với trẻ nhỏ</li>
                         <li>Chế tác thủ công từ trầm hương Việt Nam được giới chuyên gia quốc tế đánh giá thuộc loại tốt nhất trên thế giới về mùi hương và tinh dầu</li>
                         <li>Mẫu mã đa đạng, phù hợp với sở thích của các bé ở mọi lứa tuổi</li>
                         <li>Phật bản mệnh được thiết kế bởi những người thợ lành nghề, cẩn thận trong từng chi tiết nhỏ, đảm bảo không còn xơ gỗ để tránh gây chầy xước trên da bé</li>
                         <li>Phần tết dây đỏ có thể điều chỉnh theo kích thước cổ tay của bé</li>
                         <li>Vì là trầm hương tự nhiên nên Phật bản mệnh càng đeo càng bóng, do tác động nhiệt các vân gỗ nhìn rõ, không bị mất mùi</li>
                         <li>Với Phật bản mệnh Bảo Nhi bé có thể đeo tay, đeo chân, để ở dưới gối hoặc bên cạnh khi ngủ để năng lượng dương từ trầm hương bảo vệ bé</li>
                     </ul>
                 </div>
                 `
            }
        ]
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

    const [isSticky, setIsSticky] = useState<boolean>(false);

    const categoryRef = useRef<any>(null);

    const headerRef = useRef<any>(null);

    const containerRef = useRef<any>(null);

    useEffect(() => {
        window.addEventListener("wheel", function (event) {
            if (event.ctrlKey === true) {
                event.preventDefault();
            }
        }, { passive: false });
    }, [])

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

    const handleAddcart = (item: any, event: any) => {
        const target = event.currentTarget.getBoundingClientRect();
        const cart = cartRef.current.getBoundingClientRect();

        const updatedItems = updateOrAddItem(carItems, item);

        if (localStorage !== undefined) {
            localStorage.setItem('carItems', JSON.stringify(updatedItems));
        }

        setCarItems(updatedItems);

        const itemData = {
            ...item,
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

    useEffect(() => {
        const handleScroll = () => {
            const headerTop = headerRef.current.getBoundingClientRect().top;
            const categoryTop = categoryRef.current.getBoundingClientRect().top;
            if (categoryTop <= 73) {
                setIsSticky(true)
            } else {
                setIsSticky(false)
            }

        };

        const containerElement = containerRef.current;
        if (containerElement) {
            containerElement.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (containerElement) {
                containerElement.removeEventListener('scroll', handleScroll);
            }
        };
    }, [headerRef, categoryRef]); // useEffect sẽ chỉ gọi một lần khi component được render

    return (
        <div ref={containerRef} className="flex flex-col gap-2 bg-gray-50 h-dvh overflow-y-scroll">
            <div ref={headerRef} className='sticky top-0 z-[9] bg-white'>
                <div className="custom-container-child  flex items-center justify-between gap-2  py-2">
                    <div className="relative w-[89%]">
                        <Input onChange={(e) => queryStateShop({ valueSearch: e.target.value })} className='rounded-full border-[#E73C2A] border text-sm placeholder:text-[#E73C2A] text-[#E73C2A]' placeholder='Tìm kiếm vật phẩm' />
                        <div className="bg-[#E73C2A] h-9 w-9 flex items-center justify-center  absolute top-1/2 right-0 -translate-y-1/2 -translate-x-1 rounded-full">
                            <CiSearch className=' text-white' size={20} />
                        </div>
                    </div>
                    <div ref={cartRef} onClick={() => router.push('/cart')} className="w-[11%] hover:bg-[#E73C2A]/30 transition-all duration-150 cursor-pointer ease-linear bg-[#E73C2A]/10 rounded-xl group  p-3 relative">
                        <div className={`size-full flex items-center justify-center transition-all duration-200 ease-linear ${cartScale ? 'scale-125' : ''}`}
                        >
                            <FiShoppingCart className={`text-[#E73C2A] `} size={18} />
                        </div>
                        <div className={`absolute top-0.5 left-1/2 translate-x-0 text-[#E73C2A] text-xs font-medium transition-transform duration-200 ease-linear ${cartScale ? 'scale-125' : ''}`}>
                            {carItems.reduce((acc: any, curr: any) => acc + +curr.quantity, 0) > 0 ? carItems.reduce((acc: any, curr: any) => acc + +curr.quantity, 0) : ''}
                        </div>
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
            <div ref={categoryRef}
                style={{
                    top: `${isSticky ? headerRef.current.clientHeight : ""}px`
                }}
                className={` ${isSticky ? 'sticky left-0 z-[999] bg-white py-2 shadow-[0_4px_4px_rgba(0,0,0,0.2)]' : ''}`}>
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
                                <h1 className={`text-[10px] ${item?.id == isStateShop.isCategory ? 'text-[#E73C2A]' : 'text-gray-400'}  uppercase text-center leading-1 group-hover:text-[#E73C2A]/80 transition-all duration-150 ease-linear cursor-pointer`}>{item.name}</h1>
                            </SwiperSlide>
                        ))}
                    </Swiper>}
            </div>
            <div className="flex flex-col gap-4 custom-container-child">

                <div className='flex flex-col gap-4'>
                    <h1 className='text-black text-lg font-semibold'>Sản phẩm nổi bật</h1>
                    <div className="">
                        {
                            isStateShop.nodata ?
                                <NoData type='shops' className='col-span-2' /> :
                                <div className='grid grid-cols-2 gap-4 mb-4'>
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
                                        isStateShop?.listProductsFloating?.map((item, index) => (
                                            <div key={item.id} className="relative bg-white mb-2 shadow-[0_0_5px_rgba(0,0,0,0.1)] col-span-1 h-fit rounded-xl">
                                                <div className='flex flex-col gap-1 w-full h-fit'>
                                                    <div onClick={() => handleDetail(item)} className="cursor-pointer">
                                                        <div className='w-full bg-white cursor-pointer  mx-auto overflow-hidden'>
                                                            <Image blurDataURL={item.image ?? ""} loading="lazy" unoptimized={true} src={item.image ?? ""} alt="" width={1920} height={1920} className='object-cover size-full transition-all duration-150 ease-linear' />
                                                        </div>
                                                    </div>
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
                <div className='flex flex-col gap-4'>
                    <h1 className='text-black text-lg font-semibold'>Sản phẩm dành riêng cho mẹ và bé</h1>
                    <div className="">
                        {
                            isStateShop.nodata ?
                                <NoData type='shops' className='col-span-2' /> :
                                <div className='grid grid-cols-2 gap-4 mb-4'>
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

                                                    className=' group flex flex-col gap-1 w-full h-fit'
                                                >
                                                    <div onClick={() => handleDetail(item)} className="cursor-pointer">
                                                        <div className='w-full min-h-[156px] bg-white cursor-pointer max-h-[156px] mx-auto overflow-hidden rounded-md'>
                                                            <Image src={item.image ?? ""} alt="" width={1920} height={1920} className='object-contain size-full min-h-[156px] max-h-[156px] group-hover:scale-105 rounded-2xl transition-all duration-150 ease-linear' />
                                                            {/* <Image src={"/example/shop/products/sua.png"} alt="" width={1920} height={1920} className='object-contain size-full max-h-[156px] group-hover:scale-105 rounded-md transition-all duration-150 ease-linear' /> */}
                                                        </div>
                                                        <div className="flex flex-col gap-1 px-2 pt-1">
                                                            <h1 className='cursor-pointer min-h-[39px] text-black text-sm leading-1 font-normal line-clamp-2 group-hover:text-black/80 transition-all duration-150 ease-linear'>{item.name}</h1>
                                                            <h1 className='text-[#545454] group-hover:text-[#545454]/80 transition-all duration-150 ease-linear font-bold text-base'>{FormatNumberDot(item.price)} vnđ</h1>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-between items-center p-2">
                                                        <div className="flex items-center justify-start gap-5 w-[70%]">
                                                            <div className='text-gray-400 font-normal text-xs flex items-center gap-1 my-auto'>
                                                                <div className="flex justify-center items-center">
                                                                    <CiStar size={19} />
                                                                </div>
                                                                <div className=''>{item.star}/5</div>
                                                            </div>
                                                            <h1 className='text-gray-400 font-normal text-xs'>Đã bán {FormatNumberDot(item.count)}</h1>
                                                        </div>
                                                        <div onClick={(e) => handleAddcart(item, e)} className="cursor-pointer pb-2 pr-2 lg:flex hidden justify-end w-[30%]">
                                                            <FiShoppingCart
                                                                className=' text-[#E73C2A] lg:block hidden group-hover:text-[#E73C2A]/80 hover:scale-105 transition-all duration-150 ease-linear'
                                                                size={22}
                                                            />
                                                        </div>
                                                        <div onClick={(e) => handleAddcart(item, e)} className="cursor-pointer pb-2 pr-2 lg:hidden flex justify-end w-[30%]">
                                                            <FiShoppingCart
                                                                className=' text-[#E73C2A] lg:hidden block group-hover:text-[#E73C2A]/80 hover:scale-105 transition-all duration-150 ease-linear'
                                                                size={22}
                                                            />
                                                        </div>
                                                    </div>
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