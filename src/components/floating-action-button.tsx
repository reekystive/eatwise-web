import { cn } from '@/utils/component';
import { FC, ReactNode } from 'react';
import Link from 'next/link';

interface FloatingActionButtonProps {
  href: string;
  icon: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const FloatingActionButton: FC<FloatingActionButtonProps> = ({ href, icon, className, onClick }) => {
  return (
    <Link
      href={href}
      className={cn(
        'bg-primary hover:bg-primary/90 text-primary-foreground absolute right-4 bottom-4 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-colors md:right-8 md:bottom-8',
        className
      )}
      onClick={onClick}
    >
      {icon}
    </Link>
  );
};
