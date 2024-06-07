'use client'
import { useShopCart } from '@/hooks/useShopCart'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FiShoppingCart } from "react-icons/fi"

import { IoIosArrowRoundBack } from "react-icons/io"

// Import Swiper styles
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { FormatNumberDot } from '@/utils/Format/FormatNumber'
import { useRouter } from 'next/navigation'
import { FaCircleMinus } from "react-icons/fa6"
import { IoMdAddCircle } from "react-icons/io"
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
    dataCar: any[]
}
const ShopsDetailCart = ({ params, searchParams }: Props) => {
    const initialState: initialState = {
        dataCar: []
    }
    const router = useRouter()

    const { carItems, setCarItems } = useShopCart()

    const [stateCart, setStateCart] = useState(initialState)

    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);


    const queryCart = (key: any) => setStateCart(prev => ({ ...prev, ...key }))

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('carItems') || '[]')
        if (data.length > 0) {
            queryCart({
                dataCar: data?.map((e: any) => {
                    return {
                        ...e,
                        checked: false,
                        quantity: 1
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
                        quantity: value
                    }

                }
                return x
            })
        }
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

    return (
        <div className="flex flex-col gap-2 bg-gray-50 h-dvh relative">
            <div className="sticky top-0 z-[999] bg-white ">
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
                    <h1 className='text-2xl font-semibold text-rose-500'>Giỏ hàng</h1>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="terms" onCheckedChange={() => handleCheckedAll()} className='border-red-500' />
                        <label
                            htmlFor="terms"
                            className="text-sm cursor-pointer text-rose-400 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Chọn tất cả
                        </label>
                    </div>
                </div>
                <div className="flex mb-2 h-[calc(100dvh_-_400px)] flex-col gap-1  overflow-y-auto border-b-2 border-rose-500">
                    {stateCart.dataCar.map((e: any, i: any) => (
                        <>
                            <div key={e?.id} className="flex gap-2 items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Checkbox checked={e.checked} id={e?.id} onCheckedChange={() => handleChangeQuantity(e, null, 'checked')} className='border-red-500' />
                                </div>
                                <div className='bg-gray-50 shadow-[0_0_5px_rgba(0,0,0,0.1)] group rounded-xl size-full flex gap-1'>
                                    <div className='w-1/2 h-32 p-2 mx-auto overflow-hidden rounded-lg'>
                                        <Image src={e?.image ?? ""} alt="" width={1920} height={1920} className='rounded-lg object-cover size-full group-hover:scale-105 transition-all duration-150 ease-linear' />
                                    </div>
                                    <div className='p-2 w-1/2 flex flex-col gap-5'>
                                        <div className="flex flex-col gap-1">
                                            <h1 className='text-rose-500 text-base leading-1 font-semibold line-clamp-2 group-hover:text-rose-400 transition-all duration-150 ease-linear'>{e?.name}</h1>
                                            <div className="flex justify-between items-center">
                                                <h1 className='text-rose-500 group-hover:text-rose-400 transition-all duration-150 ease-linear font-bold text-sm'>{FormatNumberDot(e?.price)} vnđ</h1>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <FaCircleMinus onClick={() => {
                                                        if (e?.quantity == 0) {
                                                            return
                                                        }
                                                        handleChangeQuantity(e, e?.quantity - 1, 'decrease')
                                                    }} className='text-gray-400 cursor-pointer hover:scale-105 transition-all duration-150 ease-linear' size={20} />
                                                    <Input value={e?.quantity} onChange={(event) => handleChangeQuantity(e, event?.target?.value, 'change')} className='border-0 border-b text-center border-rose-500 rounded-none w-1/3' />
                                                    <IoMdAddCircle onClick={() => handleChangeQuantity(e, e?.quantity + 1, 'add')} className='text-gray-400 cursor-pointer hover:scale-105 transition-all duration-150 ease-linear' size={20} />
                                                </div>
                                                <div className="">
                                                    <RiDeleteBin5Fill size={20} onClick={() => handleChangeQuantity(e, null, 'delete')} className='text-rose-500 cursor-pointer hover:scale-105 transition-all duration-150 ease-linear' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </>
                    ))}
                </div>
                <div className="flex flex-col justify-between h-[calc(100dvh_-_650px)]">
                    <div className="flex justify-between my-4">
                        <h1 className='text-rose-500 text-xl'>Tổng tiền</h1>
                        <h1 className='text-rose-500 text-2xl font-semibold'>{FormatNumberDot(
                            stateCart.dataCar
                                ?.reduce((total, item) => (item.checked ? total + item.price * item.quantity : total), 0)
                        )} vnđ</h1>
                    </div>
                    <div className="flex items-center justify-center h-[48px]">
                        <div className='text-xl cursor-pointer bg-rose-500 uppercase rounded-2xl hover:bg-rose-300 transition duration-150 ease-linear h-full w-full flex items-center justify-center text-white'>Mua hàng</div>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default ShopsDetailCart