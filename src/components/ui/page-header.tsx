'use client';

import { ChevronLeft } from 'lucide-react';
import { FC, ReactNode } from 'react';
import Link from 'next/link';

interface PageHeaderProps {
  title: string;
  backHref?: string;
  backText?: string;
  rightContent?: ReactNode;
}

export const PageHeader: FC<PageHeaderProps> = ({ title, backHref = '/', backText = 'Back', rightContent }) => {
  return (
    <div className="grid w-full grid-cols-3 items-center px-4 py-2">
      <div className="justify-self-start">
        {backHref && (
          <Link href={backHref} className="flex items-center gap-1 text-sm">
            <ChevronLeft className="size-5" />
            <span>{backText}</span>
          </Link>
        )}
      </div>
      <h1 className="justify-self-center text-lg font-semibold">{title}</h1>
      <div className="justify-self-end">{rightContent}</div>
    </div>
  );
};
