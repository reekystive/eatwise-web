import { FC, MouseEventHandler, ReactNode } from 'react';

interface CameraButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  ariaLabel?: string;
}

export const CameraButton: FC<CameraButtonProps & { children: ReactNode }> = (props) => {
  const { onClick, children, ariaLabel } = props;

  return (
    <button
      onClick={onClick}
      className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black outline-1 outline-offset-2 outline-white"
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};
