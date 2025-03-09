'use client';

import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useCamera } from '@/app/capture/hooks/use-camera';
import { Camera, RefreshCcw, Save } from 'lucide-react';
import { CameraButton } from './camera-button';
import { cn } from '@/utils/component';
import Image from 'next/image';

interface CaptureViewProps {
  className?: string;
  onConfirm?: (blob: Blob) => void;
}

export const CaptureView: FC<CaptureViewProps> = (props) => {
  const { className, onConfirm: handleConfirm } = props;
  const { videoElementRef, startCameraVideo, stopCameraVideo, captureImage } = useCamera();

  const [capturedImageBlob, setCapturedImageBlob] = useState<Blob | null>(null);
  const capturedImageBlobUrl = useMemo(() => {
    if (!capturedImageBlob) return null;
    return URL.createObjectURL(capturedImageBlob);
  }, [capturedImageBlob]);

  const handleCaptureImage = useCallback(async () => {
    const blob = await captureImage();
    setCapturedImageBlob(blob);
    stopCameraVideo();
  }, [captureImage, stopCameraVideo]);

  const handleRecapture = useCallback(async () => {
    await startCameraVideo();
    setCapturedImageBlob(null);
  }, [startCameraVideo]);

  useEffect(() => {
    void handleRecapture();
    return () => {
      stopCameraVideo();
    };
  }, [handleRecapture, stopCameraVideo]);

  useEffect(() => {
    return () => {
      if (capturedImageBlobUrl) {
        URL.revokeObjectURL(capturedImageBlobUrl);
      }
    };
  }, [capturedImageBlobUrl]);

  return (
    <div className={cn('relative flex aspect-[3/4] w-full flex-col overflow-clip bg-black', className)}>
      <video ref={videoElementRef} playsInline muted className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 flex flex-col items-center justify-end p-4">
        <CameraButton
          ariaLabel="Capture Image"
          onClick={() => {
            void handleCaptureImage();
          }}
        >
          <Camera className="size-6" />
        </CameraButton>
      </div>

      {capturedImageBlobUrl && (
        <div className="absolute inset-0">
          <Image
            src={capturedImageBlobUrl}
            alt="Captured Image"
            width={3000}
            height={4000}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-end p-4">
            <div className="flex flex-row gap-8">
              <CameraButton
                ariaLabel="Retake"
                onClick={() => {
                  void handleRecapture();
                }}
              >
                <RefreshCcw className="size-6" />
              </CameraButton>
              <CameraButton
                ariaLabel="Save"
                onClick={() => {
                  if (!capturedImageBlob) return;
                  handleConfirm?.(capturedImageBlob);
                }}
              >
                <Save className="size-6" />
              </CameraButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
