"use client";

import { useEffect, useState } from 'react'
import Image, { ImageProps } from 'next/image'

interface CustomImageProps extends ImageProps {
    src: string
}

export const CustomImage = ({ src,...rest }: CustomImageProps) => {
    const [imgSrc, setImgSrc] = useState(src)

    useEffect(() => {
        setImgSrc(src)
    }, [src])

    return (
        <Image
            {...rest}
            src={imgSrc ? imgSrc : '/images/not-found.png'}
            onError={() => {
                setImgSrc('/images/not-found.png')
            }}
        />
    )
}