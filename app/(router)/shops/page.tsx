"use client";
import NoData from "@/components/no-data/NoData";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useShopCart } from "@/hooks/useShopCart";
import { toastCore } from "@/lib/toast";
import { uuidv4 } from "@/lib/uuid";
import { getListCategoryProducts } from "@/services/Shops/shops.services";
import { ListCategorys, ListProducts } from "@/types/Shops/IShops";
import ConvertToSlug from "@/utils/Cconvert/ConvertToSlug";
import { FormatNumberDot } from "@/utils/Format/FormatNumber";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CiSearch, CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { setTimeout } from "timers";
type Props = {};
type initialState = {
  listCategorys: ListCategorys[];
  listImageSlider: Omit<ListCategorys, "name">[];
  listProducts: ListProducts[];
  listProductsFloating: ListProducts[];
  isCategory: any;
  valueSearch: string;
  nodata: boolean;
  listVoucher: any[];
};

const voucher = [
  {
    id: uuidv4(),
    name: "Tất cả sản phẩm",
    voucher: {
      name: "FreeShip 50k",
      note: "Cho đơn online từ 0K",
      color: "#01acb6",
    },
    bg: "#edfbff",
    border: "#d1f4ff",
    discount: {
      type: "Online Double day",
      note: "Áp dụng đơn hàng online",
      color: "#01acb6",
    },
    date: "11-13/11",
    active: false,
  },
  {
    id: uuidv4(),
    name: "Tất cả sản phẩm",
    voucher: {
      name: "FreeShip 50k",
      note: "Cho đơn online từ 0K",
      color: "#ae0258",
    },
    border: "#ff0064",
    bg: "#fff5fa",
    discount: {
      type: "Online Double day",
      note: "Áp dụng đơn hàng online",
      color: "#ff0064",
    },
    date: "11-23/12",
    active: false,
  },
  {
    id: uuidv4(),
    name: "Tất cả sản phẩm",
    voucher: {
      name: "FreeShip 30k",
      note: "Cho đơn online từ 0K",
      color: "#01acb6",
    },
    border: "#d1f4ff",
    bg: "#edfbff",
    discount: {
      type: "Online Double day",
      note: "Áp dụng đơn hàng online",
      color: "#01acb6",
    },
    date: "11-25/11",
    active: false,
  },
  {
    id: uuidv4(),
    name: "Tất cả sản phẩm",
    voucher: {
      name: "FreeShip 100k",
      note: "Cho đơn online từ 0K",
      color: "#ae0258",
    },
    border: "#ff0064",
    bg: "#fff5fa",
    discount: {
      type: "Online Double day",
      note: "Áp dụng đơn hàng online",
      color: "#ff0064",
    },
    date: "11-23/12",
    active: false,
  },
];
const Shops = (props: Props) => {
  const initialState: initialState = {
    listCategorys: [],
    listImageSlider: [
      {
        id: 1,
        image: "/example/shop/listImageSlider/img1.png",
      },
      {
        id: 2,
        image: "/example/shop/listImageSlider/img2.png",
      },
      // {
      //     id: 3,
      //     image: "/example/shop/listImageSlider/test2.jpeg"
      // },
      // {
      //     id: 4,
      //     image: "/example/shop/listImageSlider/test3.jpeg"
      // }
    ],
    listProducts: [],
    isCategory: null,
    valueSearch: "",
    nodata: false,
    listProductsFloating: [
      {
        count: 5,
        id: 3,
        image: "/example/shop/floating/vp-3.png",
        name: "Mặt Dây Phật Bản Mệnh",
        price: 150000,
        star: 5,
        quantity: 1,
        content: `
                   <div class="content">
        <p><span class="highlight">Chế tác tâm linh:</span></p>
        <ul>
            <li>Mặt dây Phật Bản Mệnh được chế tác theo từng tuổi</li>
            <li>Đường nét hiền hòa, trang nghiêm</li>
            <li>Kích thước vừa phải, dễ đeo hằng ngày</li>
        </ul>
        <p>Mặt Dây Phật Bản Mệnh mang ý nghĩa che chở, hộ mệnh, giúp người đeo gặp nhiều may mắn, bình an trong cuộc sống và công việc.</p>
    </div>
    
    <div class="content">
        <p><span class="highlight">Phật Bản Mệnh có gì đặc biệt?</span></p>
        <ul>
            <li>Mỗi tuổi sẽ có một vị Phật Bản Mệnh tương ứng để bảo hộ</li>
            <li>Giúp tâm an, giảm lo âu và tăng năng lượng tích cực</li>
            <li>Phù hợp cho người thường xuyên đi xa hoặc làm việc áp lực</li>
            <li>Là món quà phong thủy ý nghĩa dành cho người thân</li>
        </ul>
    </div>
                    `,
      },
      {
        count: 3,
        id: 2,
        image: "/example/shop/floating/vp-1.png",
        name: "Vòng Thạch Anh Tóc Vàng",
        price: 120000,
        star: 4,
        quantity: 1,
        content: `
                    <div class="content">
    <p><span class="highlight">Chế tác thủ công từ đá tự nhiên:</span></p>
    <ul>
        <li>Vòng tay làm từ Thạch Anh Tóc Vàng tự nhiên, chọn lọc kỹ lưỡng</li>
        <li>Hạt đá được mài nhẵn, bo tròn, an toàn khi sử dụng</li>
        <li>Dây xỏ chun cao cấp, đàn hồi tốt, dễ đeo và tháo</li>
    </ul>
    <p>Vòng Thạch Anh Tóc Vàng không chỉ là món trang sức tinh tế mà còn mang ý nghĩa phong thủy sâu sắc, giúp thu hút tài lộc, năng lượng tích cực và sự may mắn cho người đeo.</p>
</div>

<div class="content">
    <p><span class="highlight">Vòng Thạch Anh Tóc Vàng có gì đặc biệt?</span></p>
    <ul>
        <li>Đá Thạch Anh Tóc Vàng tượng trưng cho tài lộc, thịnh vượng và thành công</li>
        <li>Giúp cân bằng năng lượng, tăng sự tự tin và tinh thần tích cực</li>
        <li>Phù hợp đeo hằng ngày hoặc làm quà tặng ý nghĩa</li>
        <li>Màu sắc sang trọng, dễ phối với nhiều trang phục</li>
        <li>Đá tự nhiên càng đeo càng sáng bóng, không phai màu</li>
    </ul>
</div>
                     `,
      },
      {
        count: 10,
        id: 1,
        image: "/example/shop/floating/vp-2.png",
        name: "Mặt Dây Tỳ Hưu",
        price: 100000,
        star: 4,
        quantity: 1,
        content: `
              <div class="content">
    <p><span class="highlight">Chế tác tinh xảo:</span></p>
    <ul>
        <li>Mặt dây Tỳ Hưu được chạm khắc tỉ mỉ, đường nét sắc sảo</li>
        <li>Thiết kế nhỏ gọn, dễ kết hợp với nhiều loại dây đeo</li>
        <li>Phù hợp cho cả nam và nữ</li>
    </ul>
    <p>Mặt Dây Tỳ Hưu là vật phẩm phong thủy được nhiều người yêu thích, tượng trưng cho tài lộc, chiêu tài giữ lộc và bảo vệ chủ nhân khỏi năng lượng tiêu cực.</p>
</div>

<div class="content">
    <p><span class="highlight">Mặt Dây Tỳ Hưu có ý nghĩa gì?</span></p>
    <ul>
        <li>Tỳ Hưu là linh vật chiêu tài, giúp công việc và kinh doanh thuận lợi</li>
        <li>Hỗ trợ hóa giải vận xui, mang lại bình an</li>
        <li>Thiết kế phù hợp đeo hằng ngày hoặc làm quà phong thủy</li>
        <li>Dễ phối với dây bạc, dây da hoặc dây phong thủy</li>
    </ul>
</div>
                `,
      },
    ],
    listVoucher: voucher,
  };

  const router = useRouter();

  const queryClient = useQueryClient();

  const cartRef = useRef<any>(null);

  const [cartScale, setCartScale] = useState<boolean>(false);

  const [flyingItem, setFlyingItem] = useState<any>(null);

  const [animationStyle, setAnimationStyle] = useState<any>({});

  const { carItems, setCarItems, setDataDetail } = useShopCart();

  const [isStateShop, setIsStateShop] = useState(initialState);

  const queryStateShop = (key: any) =>
    setIsStateShop((prev) => ({ ...prev, ...key }));

  const [isSticky, setIsSticky] = useState<boolean>(false);

  const categoryRef = useRef<any>(null);

  const headerRef = useRef<any>(null);

  const containerRef = useRef<any>(null);

  useEffect(() => {
    window.addEventListener(
      "wheel",
      function (event) {
        if (event.ctrlKey === true) {
          event.preventDefault();
        }
      },
      { passive: false }
    );
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ["listCategoryProducts"],
    queryFn: async () => {
      const { data } = await getListCategoryProducts();
      const newData = data?.data.map((e: any) => {
        return {
          id: e.id,
          name: e.name,
          image: e.image
            ? e.image
            : Array.isArray(e?.list_images)
            ? e?.list_images[0]
            : "",
        };
      });
      queryStateShop({ listCategorys: newData, isCategory: newData[0]?.id });
      return data;
    },
  });

  useEffect(() => {
    if (data) {
      const newData = data?.data
        ?.find((e: any) => e.id === isStateShop.isCategory)
        ?.data?.map((i: any) => {
          return {
            ...i,
            id: i?.id,
            name: i?.title,
            count: 1,
            image: i?.featured_image
              ? i?.featured_image
              : Array.isArray(i?.list_images)
              ? i?.list_images[0]
              : "",
            price: i?.price,
            quantity: 1,
            star: 3,
          };
        });
      queryStateShop({ listProducts: newData });
    }
  }, [data, isStateShop.isCategory]);

  // Hàm để tìm kiếm mặt hàng trong mảng
  const findItemIndex = (items: any, itemId: any) =>
    items.findIndex((item: any) => item.id === itemId);

  // Hàm để cập nhật hoặc thêm mặt hàng vào mảng
  const updateOrAddItem = (items: any, newItem: any) => {
    const quantityToAdd = Number(newItem.quantity);

    const itemIndex = findItemIndex(items, newItem.id);
    if (itemIndex !== -1) {
      // Nếu mặt hàng đã tồn tại, tăng số lượng
      items[itemIndex].quantity += quantityToAdd;
    } else {
      const newItemWithQuantityAsNumber = {
        ...newItem,
        quantity: quantityToAdd,
      };
      items.push(newItemWithQuantityAsNumber);
    }
    return [...items]; // Trả về một bản sao của mảng đã cập nhật
  };

  const handleAddcart = (item: any, event: any) => {
    const target = event.currentTarget.getBoundingClientRect();
    const cart = cartRef.current.getBoundingClientRect();

    const updatedItems = updateOrAddItem(carItems, item);

    if (localStorage !== undefined) {
      localStorage.setItem("carItems", JSON.stringify(updatedItems));
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
      position: "fixed",
      left: itemData.startX,
      top: itemData.startY,
      width: "100px",
      height: "100px",
      borderRadius: "50%",
      opacity: 1,
      transform: "scale(1.5)",
      transition: "transform 1s ease, opacity 1.6s ease",
      zIndex: 1000,
    };

    setAnimationStyle(style);

    requestAnimationFrame(() => {
      setAnimationStyle((prev: any) => ({
        ...prev,
        transform: `translate(${itemData.endX - itemData.startX}px, ${
          itemData.endY - itemData.startY
        }px) scale(0.65)`,
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
      setFlyingItem(null);
    }, 800);
  };

  const handleDetail = async (e: any) => {
    setDataDetail(e);
    router.push(`/shops/${e.id}?name=${ConvertToSlug(e.name)}.html`);
  };

  const handleActiveVoucher = (id: any) => {
    const newData = isStateShop.listVoucher.map((e: any) => {
      return {
        ...e,
        active: e.id == id ? !e.active : e.active,
      };
    });
    toastCore.success("Lấy mã thành công!");
    localStorage.setItem("listVoucher", JSON.stringify(newData));
    queryStateShop({ listVoucher: newData });
  };

  useEffect(() => {
    if (localStorage.getItem("listVoucher")) {
      queryStateShop({
        listVoucher: JSON.parse(localStorage.getItem("listVoucher") ?? ""),
      });
    }
  }, []);

  useEffect(() => {
    function removeDiacritics(str: any) {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    const filteredData = isStateShop.listProducts.filter((item) =>
      removeDiacritics(item.name.toLowerCase()).includes(
        removeDiacritics(isStateShop.valueSearch.toLowerCase())
      )
    );

    const cacheData = queryClient.getQueryData(["listCategoryProducts"]) as any;

    const dataDefault = cacheData?.data
      ?.find((e: any) => e.id === isStateShop.isCategory)
      ?.data?.map((i: any) => {
        return {
          ...i,
          id: i?.id,
          name: i?.title,
          count: 1,
          image: i?.featured_image
            ? i?.featured_image
            : Array.isArray(i?.list_images)
            ? i?.list_images[0]
            : "",
          price: i?.price,
          quantity: 1,
          star: 3,
        };
      });
    queryStateShop({
      listProducts: isStateShop.valueSearch != "" ? filteredData : dataDefault,
      nodata:
        isStateShop.valueSearch != "" && filteredData?.length == 0
          ? true
          : false,
    });
  }, [isStateShop.valueSearch]);

  useEffect(() => {
    const handleScroll = () => {
      const headerTop = headerRef.current.getBoundingClientRect().top;
      const categoryTop = categoryRef.current.getBoundingClientRect().top;
      if (categoryTop <= 73) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    const containerElement = containerRef.current;
    if (containerElement) {
      containerElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (containerElement) {
        containerElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [headerRef, categoryRef]); // useEffect sẽ chỉ gọi một lần khi component được render

  const renderProduct = () =>
    isStateShop.isCategory == isStateShop.listCategorys[0]?.id && (
      <div className="flex flex-col gap-1 h-full bg-no-repeat">
        {/* <div className='flex flex-col gap-1 bg-[url("/example/shop/home-sale-top.png")] bg-cover h-full bg-no-repeat'> */}
        <h1 className="text-[#E73C2A] text-lg font-semibold py-3 px-2">
          Vật phẩm
        </h1>
        {isStateShop.nodata ? (
          <NoData type="shops" className="col-span-2" />
        ) : isLoading ? (
          <div className="grid grid-cols-3 gap-4 mb-4">
            {[...Array(3)].map((_, index) => {
              return (
                <div
                  key={index}
                  className="group rounded-xl size-full col-span-1 flex flex-col gap-1  cursor-pointer h-fit"
                >
                  <Skeleton className="w-full bg-gray-100 h-32 p-2 mx-auto overflow-hidden"></Skeleton>
                  <Skeleton className="py-3  bg-gray-100"></Skeleton>
                  <Skeleton className="py-3  bg-gray-100"></Skeleton>
                  <Skeleton className="py-3  bg-gray-100"></Skeleton>
                </div>
              );
            })}
          </div>
        ) : (
          <Swiper
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Pagination, Navigation]}
            slidesPerView={3}
            className="mySwiper px-1 pb-4 [&_.swiper-pagination]:-bottom-0 [&_.swiper-pagination-bullet-active]:bg-[#E73C2A]"
            spaceBetween={10}
            pagination={{ clickable: true }}
          >
            {isStateShop?.listProductsFloating &&
              isStateShop?.listProductsFloating?.map((item, index) => (
                <SwiperSlide
                  key={item.id}
                  className="relative mb-2  w-full max-w-[32%]"
                >
                  <div className="flex flex-col gap-1 w-full  ">
                    <div
                      onClick={() => handleDetail(item)}
                      className="cursor-pointer"
                    >
                      <div className="w-full   cursor-pointer  mx-auto overflow-hidden">
                        <Image
                          blurDataURL={item.image ?? ""}
                          loading="lazy"
                          unoptimized={true}
                          src={item.image ?? ""}
                          alt=""
                          width={1920}
                          height={1920}
                          className="object-cover size-full transition-all duration-150 ease-linear"
                        />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        )}
      </div>
    );

  return (
    <div
      ref={containerRef}
      className=" bg-[url('/example/shop/background_6.png')] bg-cover bg-no-repeat h-dvh overflow-y-scroll"
    >
      <div ref={headerRef} className="sticky top-0 z-[9] bg-white">
        <div className="custom-container-child  flex items-center justify-between gap-2  py-2">
          <div className="relative w-[89%]">
            <Input
              onChange={(e) => queryStateShop({ valueSearch: e.target.value })}
              className="rounded-full border-[#E73C2A] border text-sm placeholder:text-[#E73C2A] text-[#E73C2A]"
              placeholder="Tìm kiếm vật phẩm"
            />
            <div className="bg-[#E73C2A] h-8 w-8 flex items-center justify-center  absolute top-1/2 right-0 -translate-y-1/2 -translate-x-1 rounded-full">
              <CiSearch className=" text-white" size={20} />
            </div>
          </div>
          <div
            ref={cartRef}
            onClick={() => router.push("/cart")}
            className="w-[11%] hover:bg-[#E73C2A]/30 transition-all duration-150 cursor-pointer ease-linear bg-[#E73C2A]/10 rounded-xl group  p-3 relative"
          >
            <div
              className={`size-full flex items-center justify-center transition-all duration-200 ease-linear ${
                cartScale ? "scale-125" : ""
              }`}
            >
              <FiShoppingCart className={`text-[#E73C2A] `} size={18} />
            </div>
            {carItems.reduce((acc: any, curr: any) => acc + +curr.quantity, 0) >
              0 && (
              <div
                className={`absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-[#E73C2A] text-white text-xs font-medium transition-transform duration-200 ease-linear flex items-center justify-center ${
                  cartScale ? "scale-125" : ""
                }`}
              >
                {carItems.reduce(
                  (acc: any, curr: any) => acc + +curr.quantity,
                  0
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="mb-2">
          <Swiper
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            {isStateShop.listImageSlider.map((item, index) => (
              <SwiperSlide
                key={index}
                className="max-h-[200px] h-[200px] min-h-[200px] overflow-hidden"
              >
                <Image
                  src={item.image ?? ""}
                  alt=""
                  width={1280}
                  height={1280}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* <div
          ref={categoryRef}
          style={{
            top: `${isSticky ? headerRef.current.clientHeight : ""}px`,
          }}
          className={` ${
            isSticky
              ? "sticky left-0 z-[999] bg-white py-2 shadow-[0_4px_4px_rgba(0,0,0,0.2)]"
              : ""
          }`}
        >
          {isLoading ? (
            <div className="flex flex-col gap-2 items-center">
              <Skeleton className="h-3 w-full bg-gray-100 rounded-full" />
              <Skeleton className="h-3 w-full bg-gray-100 rounded-full" />
              <Skeleton className="h-3 w-full bg-gray-100 rounded-full" />
            </div>
          ) : (
            <Swiper
              slidesPerView={5}
              spaceBetween={10}
              freeMode={true}
              modules={[FreeMode, Pagination]}
              className="mySwiper "
            >
              {isStateShop.listCategorys.map((item, index) => (
                <SwiperSlide
                  onClick={() => queryStateShop({ isCategory: item?.id })}
                  key={index}
                  className="flex flex-col items-center gap-1 group  cursor-pointer"
                >
                  <div className="bg-gray-200 size-12 rounded-full flex items-center justify-center">
                    <Image
                      src={item.image ?? ""}
                      alt=""
                      width={1280}
                      height={1280}
                      className="size-12 rounded-full object-contain"
                    />
                  </div>
                  <h1
                    className={`text-[10px] ${
                      item?.id == isStateShop.isCategory
                        ? "text-[#E73C2A]"
                        : "text-gray-400"
                    }  uppercase text-center leading-1 group-hover:text-[#E73C2A]/80 transition-all duration-150 ease-linear cursor-pointer`}
                  >
                    {item.name}
                  </h1>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div> */}
        <h1 className="text-[#E73C2A] text-lg font-semibold py-3 px-2">
          Vật phẩm mới
        </h1>
        {/* Waterfall layout cho sản phẩm */}
        <div className="custom-container-child px-2- pb-4">
          {isStateShop.nodata ? (
            <NoData type="shops" className="col-span-2" />
          ) : isLoading ? (
            <div className="columns-1 gap-4">
              {[...Array(4)].map((_, index) => {
                return (
                  <div
                    key={index}
                    className="break-inside-avoid mb-4 group rounded-xl flex flex-col gap-1 cursor-pointer h-fit"
                  >
                    <Skeleton className="w-full bg-gray-100 h-32 p-2 mx-auto overflow-hidden"></Skeleton>
                    <Skeleton className="py-3 bg-gray-100"></Skeleton>
                    <Skeleton className="py-3 bg-gray-100"></Skeleton>
                    <Skeleton className="py-3 bg-gray-100"></Skeleton>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="columns-1 gap-4">
              {isStateShop?.listProductsFloating?.map((item, index) => (
                <div
                  key={item.id}
                  className="break-inside-avoid mb-4 relative bg-white  border-[#fb7185] rounded-xl group flex flex-col gap-1 w-full overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                >
                  <div
                    onClick={() => handleDetail(item)}
                    className="cursor-pointer "
                  >
                    <div className="w-full h-[200px] bg-white cursor-pointer mx-auto overflow-hidden rounded-md p-2">
                      <Image
                        src={item.image ?? ""}
                        alt=""
                        width={1920}
                        height={1920}
                        className="w-full h-full object-cover group-hover:scale-105 rounded-xl transition-all duration-150 ease-linear"
                      />
                    </div>
                    <div className="flex flex-col gap-1 px-2 pt-1">
                      <h1 className="pb-1 cursor-pointer text-black text-sm leading-1 font-normal line-clamp-2 group-hover:text-black/80 transition-all duration-150 ease-linear">
                        {item.name}
                      </h1>
                      {/* <h1 className="text-[#E73C2A] group-hover:text-[#E73C2A]/80- transition-all duration-150 ease-linear font-bold text-base">
                        {FormatNumberDot(item.price)} vnđ
                      </h1> */}
                    </div>
                  </div>
                  <div className="flex justify-between items-center px-2 pb-2">
                    <div className="flex items-center justify-start gap-2 w-[70%]">
                      <div className="text-gray-400 font-normal text-xs flex items-center gap-1 my-auto">
                        <div className="flex justify-center items-center">
                          <FaStar
                            key={index}
                            className="text-yellow-500"
                            size={15}
                          />
                        </div>
                        <div className="">{item.star}/5</div>
                      </div>
                      <h1 className="text-gray-400 font-normal text-xs truncate">
                        Đã bán {FormatNumberDot(item.count)}
                      </h1>
                    </div>
                    <div
                      onClick={(e) => handleAddcart(item, e)}
                      className="cursor-pointer pb-2 pr-2 lg:flex hidden justify-end w-[30%]"
                    >
                      <FiShoppingCart
                        className=" text-[#E73C2A] lg:block hidden group-hover:text-[#E73C2A]/80 hover:scale-105 transition-all duration-150 ease-linear"
                        size={22}
                      />
                    </div>
                    <div
                      onClick={(e) => handleAddcart(item, e)}
                      className="cursor-pointer pb-2 pr-2 lg:hidden flex justify-end w-[30%]"
                    >
                      <FiShoppingCart
                        className=" text-[#E73C2A] lg:hidden block group-hover:text-[#E73C2A]/80 hover:scale-105 transition-all duration-150 ease-linear"
                        size={22}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 custom-container-child">
          {
            <div className="flex flex-col gap-4">
              <h1 className="text-black text-lg font-semibold">
                Mã khuyến mãi
              </h1>
              {isStateShop.nodata ? (
                <NoData type="shops" className="col-span-2" />
              ) : isLoading ? (
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {[...Array(2)].map((_, index) => {
                    return (
                      <div
                        key={index}
                        className="group rounded-xl size-full col-span-1 flex flex-col gap-1  cursor-pointer h-fit"
                      >
                        <Skeleton className="w-full bg-gray-100 h-32 p-2 mx-auto overflow-hidden"></Skeleton>
                        <Skeleton className="py-3  bg-gray-100"></Skeleton>
                        <Skeleton className="py-3  bg-gray-100"></Skeleton>
                        <Skeleton className="py-3  bg-gray-100"></Skeleton>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <Swiper
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  modules={[Autoplay, Pagination, Navigation]}
                  slidesPerView={"auto"}
                  spaceBetween={10}
                  className="mySwiper w-full"
                >
                  {isStateShop?.listVoucher &&
                    isStateShop?.listVoucher?.map((item, index) => {
                      return (
                        <SwiperSlide
                          key={item.id}
                          style={{ backgroundColor: item?.bg }}
                          className="relative  rounded-lg mb-2 max-w-[90%] w-full overflow-hidden h-auto flex items-center"
                        >
                          <div
                            style={{
                              borderColor: item?.border,
                            }}
                            className="border-2 border-r-0 rounded-lg h-[100px] w-[30%] p-2 flex flex-col items-center justify-center"
                          >
                            <h1
                              style={{
                                color: item?.voucher?.color,
                              }}
                              className="text-base font-semibold  text-center"
                            >
                              {item?.voucher?.name}
                            </h1>
                            <h2
                              style={{
                                color: item?.voucher?.color,
                              }}
                              className="text-xs font-semibold text-center"
                            >
                              {item?.voucher?.note}
                            </h2>
                          </div>
                          <div
                            style={{
                              borderColor: item?.border,
                            }}
                            className="border-2 border-l-0 rounded-lg h-[100px] w-[70%] p-2 flex flex-col items-center justify-center"
                          >
                            <div className="">
                              <h1
                                style={{
                                  color: item?.discount?.color,
                                }}
                                className="text-sm font-semibold text-start"
                              >
                                {item?.name}
                              </h1>
                              <h2
                                style={{
                                  color: item?.discount?.color,
                                }}
                                className="text-sm font-semibold text-start max-w-[80%]"
                              >
                                [{item?.discount?.type}]{" "}
                                <span>{item?.discount?.note}</span>
                              </h2>
                            </div>
                            <div className="flex flex-row items-center justify-between w-full pl-[8%]">
                              <h2
                                style={{
                                  color: item?.discount?.color,
                                }}
                                className="text-xs font-semibold text-start"
                              >
                                HSD: <span>{item?.date}</span>
                              </h2>
                              <div
                                style={{
                                  backgroundColor: item?.discount?.color,
                                }}
                                onClick={() => {
                                  if (item?.active) {
                                    toastCore.error(
                                      "Mã khuyến mãi đã được lấy!"
                                    );
                                  } else {
                                    handleActiveVoucher(item?.id);
                                  }
                                }}
                                className="text-xs cursor-pointer font-semibold text-center text-white rounded-full px-2 py-1 hover:scale-110 transition-all duration-150 ease-linear"
                              >
                                {item?.active ? "Đã lấy mã" : "Lấy mã"}
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      );
                    })}
                </Swiper>
              )}
            </div>
          }

          <div className="flex flex-col gap-4">
            <h1 className="text-black text-lg font-semibold">
              Sản phẩm dành riêng cho mẹ và bé
            </h1>
            <div className="">
              {isStateShop.nodata ? (
                <NoData type="shops" className="col-span-2" />
              ) : (
                <div className="columns-2 gap-4 mb-4">
                  {isLoading
                    ? [...Array(4)].map((_, index) => {
                        return (
                          <div
                            key={index}
                            className="break-inside-avoid mb-4 group rounded-xl flex flex-col gap-1 cursor-pointer h-fit"
                          >
                            <Skeleton className="w-full bg-gray-100 h-32 p-2 mx-auto overflow-hidden"></Skeleton>
                            <Skeleton className="py-3  bg-gray-100"></Skeleton>
                            <Skeleton className="py-3  bg-gray-100"></Skeleton>
                            <Skeleton className="py-3  bg-gray-100"></Skeleton>
                          </div>
                        );
                      })
                    : isStateShop?.listProducts?.map((item, index) => (
                        <div
                          key={item.id}
                          className="break-inside-avoid mb-4 relative bg-white border-[#fb7185] h-fit rounded-xl group flex flex-col gap-1 w-full overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                        >
                          <div
                            onClick={() => handleDetail(item)}
                            className="cursor-pointer"
                          >
                            <div className="w-full bg-white cursor-pointer mx-auto overflow-hidden rounded-md p-2">
                              <Image
                                src={item.image ?? ""}
                                alt=""
                                width={1920}
                                height={1920}
                                className="w-full h-auto object-contain group-hover:scale-105 rounded-xl transition-all duration-150 ease-linear"
                              />
                            </div>
                            <div className="flex flex-col gap-1 px-2 pt-1">
                              <h1 className="pb-1 cursor-pointer text-black text-sm leading-1 font-normal line-clamp-2 group-hover:text-black/80 transition-all duration-150 ease-linear">
                                {item.name}
                              </h1>
                              <h1 className="text-[#E73C2A] group-hover:text-[#E73C2A]/80 transition-all duration-150 ease-linear font-bold text-base">
                                {FormatNumberDot(item.price)} vnđ
                              </h1>
                            </div>
                          </div>
                          <div className="flex justify-between items-center px-2 pb-2">
                            <div className="flex items-center justify-start gap-2 w-[70%]">
                              <div className="text-gray-400 font-normal text-xs flex items-center gap-1 my-auto">
                                <div className="flex justify-center items-center">
                                  <FaStar
                                    key={index}
                                    className="text-yellow-500"
                                    size={15}
                                  />
                                </div>
                                <div className="">{item.star}/5</div>
                              </div>
                              <h1 className="text-gray-400 font-normal text-xs truncate">
                                Đã bán {FormatNumberDot(item.count)}
                              </h1>
                            </div>
                            <div
                              onClick={(e) => handleAddcart(item, e)}
                              className="cursor-pointer pb-2 pr-2 lg:flex hidden justify-end w-[30%]"
                            >
                              <FiShoppingCart
                                className=" text-[#E73C2A] lg:block hidden group-hover:text-[#E73C2A]/80 hover:scale-105 transition-all duration-150 ease-linear"
                                size={22}
                              />
                            </div>
                            <div
                              onClick={(e) => handleAddcart(item, e)}
                              className="cursor-pointer pb-2 pr-2 lg:hidden flex justify-end w-[30%]"
                            >
                              <FiShoppingCart
                                className=" text-[#E73C2A] lg:hidden block group-hover:text-[#E73C2A]/80 hover:scale-105 transition-all duration-150 ease-linear"
                                size={22}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                </div>
              )}
              {flyingItem && (
                <div className="flying-image" style={animationStyle}>
                  <Image
                    src={flyingItem.image ?? ""}
                    alt=""
                    width={50}
                    height={50}
                    className="object-cover bg-transparent"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shops;
