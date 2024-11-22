"use client"

import Image from 'next/image'
import React from 'react'
import error from "@/public/error.gif"
import { RotateCcw } from 'lucide-react';;

type Props = {
    fn?: () => void
}
export const Error = ({ fn }: Props) => {
    return (
        <div className='flex justify-center items-center mb-[70px]'>
            <div className='md:w-[200px] md:h-[200px]'>
                <Image
                    src={error}
                    alt='erreur'
                    className='object-cover h-full w-full'
                />
                <p className='text-xl flex items-center justify-center gap-2 cursor-pointer' onClick={fn}>Réesayer ! <RotateCcw /></p>
            </div>
        </div>
    )
}
