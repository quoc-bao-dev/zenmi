import { Input } from '@/components/ui/input'
import React from 'react'
import { CiSearch } from 'react-icons/ci'

type Props = {}

const Shops = (props: Props) => {
    return (
        <div>
            <div className="relative">
                <Input className='rounded-2xl border-orange-500 border-2 text-sm placeholder:text-orange-400' placeholder='Tìm kiếm vật phẩm' />
                <div className="bg-orange-600 h-9 w-12 flex items-center justify-center  absolute top-1/2 right-0 -translate-y-1/2 -translate-x-1 rounded-3xl">
                    <CiSearch className=' text-white font-bold' size={20} />
                </div>
            </div>
        </div>
    )
}

export default Shops