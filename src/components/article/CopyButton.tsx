'use client';

import { useState } from 'react';

interface Props {
    code: string;
}

export default function CopyButton({ code }: Props) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <button
            onClick={handleCopy}
            className="
        absolute top-3 right-3
        px-3 py-1.5 rounded-lg
        bg-white/10 hover:bg-white/20
        text-xs font-medium
        transition-all duration-200
        opacity-0 group-hover:opacity-100
      "
            style={{ color: 'var(--color-text-muted)' }}
            aria-label="复制代码"
        >
            {copied ? '✅ 已复制' : '📋 复制'}
        </button>
    );
}
