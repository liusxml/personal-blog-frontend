'use client';

import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

interface Props {
    src?: string;
    alt?: string;
    node?: any;
}

export default function ArticleImage({ src, alt, node, ...props }: Props) {
    const [open, setOpen] = useState(false);

    // 只处理字符串类型的 src
    const imageSrc = typeof src === 'string' ? src : undefined;
    if (!imageSrc) return null;

    return (
        <>
            <img
                src={imageSrc}
                alt={alt}
                onClick={() => setOpen(true)}
                className="
          rounded-2xl shadow-2xl my-10 w-full 
          cursor-zoom-in
          hover:shadow-primary/20 
          transition-all duration-300
          hover:scale-[1.01]
        "
                style={{ boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)' }}
                {...props}
            />

            <Lightbox
                open={open}
                close={() => setOpen(false)}
                slides={[{ src: imageSrc }]}
                styles={{
                    container: { backgroundColor: 'rgba(0, 0, 0, 0.95)' }
                }}
            />
        </>
    );
}
