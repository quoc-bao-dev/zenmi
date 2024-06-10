import React from 'react'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import { useAlert } from '@/hooks/useAlert'
import { useRouter } from 'next/navigation'
type Props = {
    children: React.ReactNode

}
const Alert = () => {
    const { push } = useRouter()
    const { openAlert, titleAlert, contentAlert, setOpenAlert } = useAlert()
    return (
        <div>
            <AlertDialog open={openAlert}>
                <AlertDialogContent className='bg-white max-w-sm'>
                    <AlertDialogHeader>
                        <AlertDialogTitle className=' text-black'>{titleAlert}</AlertDialogTitle>
                        <AlertDialogDescription className=' text-black'>
                            {contentAlert}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={() => {
                            push('/shops')
                            setOpenAlert(false)
                        }} className='hover:text-rose-500 transition-all duration-200 ease-linear'>Tiếp tục</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default Alert