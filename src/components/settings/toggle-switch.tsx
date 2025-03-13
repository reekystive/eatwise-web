'use client';

import { cn } from '@/utils/component';
import { FC, useState } from 'react';

interface ToggleSwitchProps {
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const ToggleSwitch: FC<ToggleSwitchProps> = ({ defaultChecked = false, onChange }) => {
  const [checked, setChecked] = useState(defaultChecked);

  const handleToggle = () => {
    const newValue = !checked;
    setChecked(newValue);
    onChange?.(newValue);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      className={cn(
        'bg-muted focus-visible:ring-ring focus-visible:ring-offset-background relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        checked ? 'bg-primary' : 'bg-muted'
      )}
      onClick={handleToggle}
    >
      <span
        className={cn(
          'bg-background inline-block h-5 w-5 rounded-full transition-transform',
          checked ? 'translate-x-6' : 'translate-x-1'
        )}
      />
    </button>
  );
};
