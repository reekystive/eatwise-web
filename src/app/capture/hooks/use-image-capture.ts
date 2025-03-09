import { RefObject, useCallback, useMemo } from 'react';

interface UseImageCaptureOptions {
  videoRef: RefObject<HTMLVideoElement | null>;
}

export const useImageCapture = (options: UseImageCaptureOptions) => {
  const { videoRef } = options;

  const canvas = useMemo(() => document.createElement('canvas'), []);

  const captureImage = useCallback(() => {
    const context = canvas.getContext('2d');
    const video = videoRef.current;
    if (!context) {
      throw new Error('Failed to get 2d context');
    }
    if (!video) {
      throw new Error('Video ref is null');
    }
    return new Promise<Blob>((resolve, reject) => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Failed to get blob'));
          return;
        }
        resolve(blob);
      });
    });
  }, [canvas, videoRef]);

  return { captureImage };
};
