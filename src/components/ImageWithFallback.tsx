'use client'

import { useState } from 'react'
import Image, { ImageProps } from 'next/image'
import env from '@/config/env'

interface ImageWithFallbackProps extends Omit<ImageProps, 'src' | 'onError'> {
    src: string
    fileId?: string
    fallbackSrc?: string
}

export function ImageWithFallback({
    src,
    fileId,
    fallbackSrc = '',
    ...props
}: ImageWithFallbackProps) {
    const [imgSrc, setImgSrc] = useState(src)
    const [isRetrying, setIsRetrying] = useState(false)

    const handleError = async () => {
        // 已重试或无fileId，使用降级方案
        if (isRetrying || !fileId) {
            if (fallbackSrc) setImgSrc(fallbackSrc)
            return
        }

        setIsRetrying(true)

        try {
            // 调用后端API获取新URL（7天有效）
            const response = await fetch(
                `${env.API_BASE_URL}/api/v1/files/${fileId}/access-url?expireMinutes=10080`
            )

            const result = await response.json()

            if (result.code === '200' && result.data) {
                setImgSrc(result.data)
            } else if (fallbackSrc) {
                setImgSrc(fallbackSrc)
            }
        } catch (error) {
            console.error('Failed to refresh image URL:', error)
            if (fallbackSrc) setImgSrc(fallbackSrc)
        }
    }

    // 检查是否为必应壁纸URL（绕过Next.js Image优化，避免私有IP错误）
    const isBingImage = imgSrc.includes('bing.com')

    if (isBingImage) {
        // 使用原生img标签加载必应壁纸
        const { fill, sizes, priority, className, alt, ...restProps } = props as any

        return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
                src={imgSrc}
                alt={alt || 'Cover Image'}
                onError={handleError as any}
                className={className}
                style={{
                    position: 'absolute',
                    height: '100%',
                    width: '100%',
                    inset: 0,
                    objectFit: 'cover',
                    color: 'transparent',
                }}
            />
        )
    }

    return (
        <Image
            {...props}
            src={imgSrc}
            onError={handleError}
        />
    )
}
