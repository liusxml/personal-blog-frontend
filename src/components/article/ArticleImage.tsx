'use client';

import { useState } from 'react';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

interface Props {
    src?: string;
    alt?: string;
}

export default function ArticleImage({ src, alt }: Props) {
    const [open, setOpen] = useState(false);

    if (!src) return null;

    return (
        <>
            <div
                className="relative my-10 w-full cursor-zoom-in overflow-hidden rounded-2xl shadow-2xl transition-all duration-300 hover:scale-[1.01] hover:shadow-primary/20"
                style={{
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
                    aspectRatio: '16/9'
                }}
                onClick={() => setOpen(true)}
            >
                <Image
                    src={src}
                    alt={alt || '文章图片'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 896px"
                />
            </div>

            <Lightbox
                open={open}
                close={() => setOpen(false)}
                slides={[{ src }]}
                styles={{
                    container: { backgroundColor: 'rgba(0, 0, 0, 0.95)' }
                }}
            />
        </>
    );
}
