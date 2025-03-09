'use client';

import { ClientCaptureView } from './ui/client-capture-view';
import { PageHeader } from '@/components/ui/page-header';
import { FC, useCallback, useState } from 'react';

/**
 * 食物拍摄页面
 */
const CapturePage: FC = () => {
  const [capturedImageBlob, setCapturedImageBlob] = useState<Blob | null>(null);

  const handleCaptureConfirm = useCallback((blob: Blob) => {
    setCapturedImageBlob(blob);
  }, []);

  return (
    <div className="bg-background flex h-full w-full flex-col items-center">
      <PageHeader title="拍摄食物" />

      <ClientCaptureView
        onConfirm={() => {
          if (!capturedImageBlob) return;
          handleCaptureConfirm(capturedImageBlob);
        }}
        className="w-[500px] max-w-[90%] rounded-lg border-1"
      />
    </div>
  );
};

export default CapturePage;
