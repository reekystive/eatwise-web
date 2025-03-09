import { useCameraVideoElement } from './use-camera-video-element';
import { useImageCapture } from './use-image-capture';
import { useMemo } from 'react';

interface UseCameraOptions {
  facingMode?: 'user' | 'environment';
}

export const useCamera = (options?: UseCameraOptions) => {
  const { facingMode = 'environment' } = options ?? {};

  const constraints = useMemo<MediaStreamConstraints>(
    () => ({
      audio: false,
      video: {
        facingMode,
        width: 3840,
        height: 2160,
        frameRate: 60,
      },
    }),
    [facingMode]
  );

  const { videoElementRef, startCameraVideo, stopCameraVideo, isStreamActive, error } =
    useCameraVideoElement(constraints);

  const { captureImage } = useImageCapture({
    videoRef: videoElementRef,
  });

  return {
    videoElementRef,
    startCameraVideo,
    stopCameraVideo,
    isStreamActive,
    error,
    captureImage,
  };
};
