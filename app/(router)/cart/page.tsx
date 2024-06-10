'use client'
import { useShopCart } from '@/hooks/useShopCart'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FiShoppingCart } from "react-icons/fi"

import { IoIosArrowRoundBack } from "react-icons/io"

// Import Swiper styles
import NoData from '@/components/no-data/NoData'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { useAlert } from '@/hooks/useAlert'
import { FormatNumberDot } from '@/utils/Format/FormatNumber'
import { useRouter } from 'next/navigation'
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6"
import { RiDeleteBin5Fill } from "react-icons/ri"
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
type Props = {
    params: {
        id: string,
    }
    searchParams: {
        name: string
    }
}
type initialState = {
    dataCar: any[],
    isModal: boolean,
}
const ShopsDetailCart = ({ params, searchParams }: Props) => {
    const initialState: initialState = {
        dataCar: [],
        isModal: false
    }
    const router = useRouter()

    const { carItems, setCarItems } = useShopCart()

    const [stateCart, setStateCart] = useState(initialState)

    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

    const { openAlert, setOpenAlert } = useAlert()

    const queryCart = (key: any) => setStateCart(prev => ({ ...prev, ...key }))

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('carItems') || '[]')
        if (data.length > 0) {
            queryCart({
                dataCar: data?.map((e: any) => {
                    return {
                        ...e,
                        checked: true,
                    }
                })
            })

        }
    }, [])
    const handleChangeQuantity = (e: any, value: any, type: string) => {
        const data = JSON.parse(localStorage.getItem('carItems') || '[]')
        let newData: any[] = []
        if (type == 'delete') {
            newData = data.filter((x: any) => x.id != e.id)
        } else {
            newData = data?.map((x: any) => {
                if (e.id == x.id) {
                    return {
                        ...x,
                        checked: type == "checked" ? !x.checked : x.checked,
                        quantity: value ? value : x?.quantity
                    }

                }
                return x
            })
        }
        console.log("newData", newData);

        localStorage.setItem('carItems', JSON.stringify(newData))
        queryCart({ dataCar: newData })
        setCarItems(newData)
    }


    const handleCheckedAll = () => {
        const data = JSON.parse(localStorage.getItem('carItems') || '[]')
        const newData = data.map((x: any) => ({ ...x, quantity: x?.quantity || 1, checked: !x.checked }))
        localStorage.setItem('carItems', JSON.stringify(newData))
        queryCart({ dataCar: newData })
        setCarItems(newData)
    }

    const handleOpenModal = () => {
        const data = JSON.parse(localStorage.getItem('carItems') || '[]')
        const checkData = data.some((x: any) => (x.checked && x.quantity > 0))
        if (data.some((x: any) => x.checked == true && x.quantity > 0)) {
            setOpenAlert(true, 'Đặt hàng thành công', 'Đơn hàng đang được giao đến bạn')
        } else {
            setOpenAlert(true, 'Đặt hàng thất bại', 'Vui lòng chọn mặt hàng')
        }
    }


    useEffect(() => {
        if (!openAlert) {
            const data = JSON.parse(localStorage.getItem('carItems') || '[]')
            const newData = data.filter((x: any) => x.checked != true)
            localStorage.setItem('carItems', JSON.stringify(newData))
            queryCart({ dataCar: newData })
            setCarItems(newData)
        }
    }, [openAlert])

    return (
        <div className="flex flex-col gap-2 bg-gray-50 h-dvh relative">
            <div className="sticky top-0 z-[10] bg-white ">
                <div className="custom-container-child  flex items-center justify-between gap-2  py-2">
                    <div className=" flex items-center gap-1">
                        <div className="size-10">
                            <IoIosArrowRoundBack onClick={() => router.back()} size={22} className='size-full cursor-pointer text-rose-600' />
                        </div>
                        <h1 className='text-rose-500 text-sm leading-1 font-medium truncate max-w-[200px]'>Giỏ hàng</h1>
                    </div>
                    <div onClick={() => router.push('/cart')} className=" hover:bg-rose-200 transition-all duration-150 cursor-pointer ease-linear bg-rose-50 rounded-xl group  p-3 relative">
                        <div className="size-full flex items-center justify-center">
                            <FiShoppingCart className='text-rose-500' size={18} />
                        </div>
                        <div className="absolute top-0.5 left-1/2 translate-x-0 text-rose-500 text-xs font-medium">{carItems?.length > 0 ? carItems?.length : ''}</div>
                    </div>
                </div>
            </div>
            <div className="custom-container-child">
                <div className="flex  items-center justify-between">
                    <h1 className='text-2xl font-semibold text-[#545454]'>Giỏ hàng</h1>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="terms" onCheckedChange={() => handleCheckedAll()} className='border-gray-500' />
                        <label
                            htmlFor="terms"
                            className="text-sm cursor-pointer text-gray-600 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Chọn tất cả
                        </label>
                    </div>
                </div>
                {stateCart.dataCar?.length > 0 ?

                    <div className="flex mb-2 h-[calc(100dvh_-_400px)] flex-col gap-1  overflow-y-auto border-b border-gray-500">
                        {stateCart.dataCar.map((e: any, i: any) => (
                            <>
                                <div key={e?.id} className="flex gap-2 items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox checked={e.checked} id={e?.id} onCheckedChange={() => handleChangeQuantity(e, null, 'checked')} className='border-gray-500' />
                                    </div>
                                    <div className='bg-white group rounded-xl size-full flex gap-3'>
                                        <div className='w-1/3 min-w-[33.33%] h-32 p-2 mx-auto overflow-hidden rounded-md'>
                                            <Image src={e?.image ?? ""} alt="" width={1920} height={1920} className='rounded-md object-cover size-full group-hover:scale-105 transition-all duration-150 ease-linear' />
                                        </div>
                                        <div className='p-2 w-[66%] flex flex-col gap-5'>
                                            <div className="flex flex-col gap-1">
                                                <h1 className='text-gray-500 text-base leading-1 font-semibold line-clamp-2 group-hover:text-gray-500 transition-all duration-150 ease-linear'>{e?.name}</h1>
                                                <div className="flex justify-between items-center">
                                                    <h1 className='text-gray-500 group-hover:text-gray-500 transition-all duration-150 ease-linear font-bold text-sm'>{FormatNumberDot(e?.price)} vnđ</h1>
                                                </div>
                                                <div className="flex items-center justify-between w-full">
                                                    <div className="flex items-center gap-2 max-w-[90%] w-[90%]">
                                                        <FaCircleMinus
                                                            onClick={() => {
                                                                if (e?.quantity == 0) {
                                                                    return
                                                                }
                                                                handleChangeQuantity(e, e?.quantity - 1, 'decrease')
                                                            }}
                                                            className='text-gray-400 cursor-pointer hover:scale-105 transition-all duration-150 ease-linear size-5'
                                                        />
                                                        <Input
                                                            value={e?.quantity}
                                                            onChange={(event) => handleChangeQuantity(e, event?.target?.value, 'change')}
                                                            className='border-0 border-b text-center border-[#545454] rounded-none w-1/4'
                                                        />
                                                        <FaCirclePlus
                                                            onClick={() => handleChangeQuantity(e, e?.quantity + 1, 'add')}
                                                            className='text-gray-400 cursor-pointer hover:scale-105 transition-all duration-150 ease-linear size-5'
                                                        />
                                                    </div>
                                                    <div className="max-w-[10%] w-[10%]">
                                                        <RiDeleteBin5Fill size={20} onClick={() => handleChangeQuantity(e, null, 'delete')} className='text-rose-500 cursor-pointer hover:scale-105 transition-all duration-150 ease-linear' />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </>
                        ))
                        }
                    </div>
                    : <NoData type='cart' />
                }
                <div className="flex flex-col justify-between h-[calc(100dvh_-_650px)]">
                    <div className="flex justify-between my-4">
                        <h1 className='text-[#545454] text-xl'>Tổng tiền</h1>
                        <h1 className='text-gray-500 text-2xl font-semibold'>{FormatNumberDot(
                            stateCart.dataCar
                                ?.reduce((total, item) => (item.checked ? total + item.price * item.quantity : total), 0)
                        )} vnđ</h1>
                    </div>
                    <div className="flex items-center justify-center h-[48px]">
                        <div onClick={() => handleOpenModal()} className='text-xl cursor-pointer bg-rose-500 uppercase rounded-2xl hover:bg-rose-300 transition duration-150 ease-linear h-full w-full flex items-center justify-center text-white'>Mua hàng</div>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default ShopsDetailCart