import { PuffLoader } from 'react-spinners';
import { cn } from '@/utils/component';
import dynamic from 'next/dynamic';
import { FC } from 'react';

const DynamicCaptureView = dynamic(
  async () => {
    const { CaptureView } = await import('./capture-view');
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return CaptureView;
  },
  {
    ssr: false,
    loading: () => <CaptureViewLoading className={'w-[500px] max-w-[90%] rounded-lg border-1'} />,
  }
);

interface CaptureViewProps {
  className?: string;
  onConfirm?: (blob: Blob) => void;
}

const CaptureViewLoading: FC<{ className?: string }> = ({ className }) => (
  <div className={cn('relative flex aspect-[3/4] w-full flex-col overflow-clip bg-black', className)}>
    <div className="absolute inset-0 flex items-center justify-center">
      <PuffLoader color="#fff" size={48} />
    </div>
  </div>
);

export const ClientCaptureView: FC<CaptureViewProps> = (props) => {
  return <DynamicCaptureView {...props} />;
};
