'use client'

import { useResize } from "@/hooks/useResize"
import Image from "next/image"
import { useEffect, useState } from "react"


interface State {
    title: string,
    image: string
}

const NoData = ({ type, className }: { type: string, className?: string }) => {
    const { isVisibleMobile } = useResize()

    const [data, setData] = useState<State>({ title: '', image: '', })

    const quertyState = (key: any) => setData((prev: State) => ({ ...prev, ...key }))

    const [isMounted, setIsMounted] = useState<boolean>(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        switch (type) {
            case "handbook":
                quertyState({ title: 'Không có danh mục...', image: '/no-data/no-data.svg' })
                break;
            default:
                break;
        }
    }, [type])

    if (!isMounted) return null

    return (
        <div className={`${className}  flex flex-col gap-2 items-center`}>
            <div className={` h-full w-full`}>
                <Image
                    src={data.image ? data.image : ""}
                    alt='nodata'
                    width={1280}
                    height={1024}
                    className={`
                object-contain
                 ${type == 'handbook' && (isVisibleMobile ? "size-full" : 'size-[45%]')}
                 mx-auto`} />
            </div>
            <h1 className="3xl:text-lg lg:text-sm text-xs font-medium">{data.title}</h1>
        </div>
    )

}
export default NoData