'use client'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogOverlay,
    DialogPortal
} from "@/components/ui/dialog"
import { useDialogWelcome } from "@/hooks/useDialogWelcome"
import { X } from "lucide-react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

export function DialogWelcome() {
    const pathname = usePathname();
    const { openDialogWelcome, setOpenDialogWelcome } = useDialogWelcome();
    useEffect(() => {
        setTimeout(() => {
            setOpenDialogWelcome(false)
        }, 5000);
    }, [])

    return (
        <div>
            <Dialog modal={true} open={pathname === "/vote" ? false : openDialogWelcome}>
                <DialogPortal>
                    <DialogOverlay onClick={() => setOpenDialogWelcome(false)} className={"bg-black/30 "} />
                    <DialogContent className="w-[95%] max-h-[95vh] border-0 !bg-transparent shadow-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0">
                        <DialogHeader className="relative">
                            <div className="">
                                <Image src={'/example/shop/bau.png'} width={1280} height={1024} alt="" className="object-cover" />
                            </div>
                            <div onClick={() => setOpenDialogWelcome(false)} className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-red-500 rounded-full hover:scale-105 cursor-pointer transition-all duration-150 ease-linear">
                                <X size={32} fontWeight={600} className=" text-white p-2" />
                            </div>
                        </DialogHeader>
                    </DialogContent>
                </DialogPortal>
            </Dialog>

        </div>
    )
}
