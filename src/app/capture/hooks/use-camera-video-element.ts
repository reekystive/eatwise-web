import { useCallback, useEffect, useRef, useState } from 'react';
import { useMediaStream } from './use-media-stream';

export const useCameraVideoElement = (constraints: MediaStreamConstraints) => {
  const { mediaStreamRef, isStreamActive, startMediaStream, stopMediaStream, streamError } =
    useMediaStream(constraints);

  const [videoElementError, setVideoElementError] = useState<string | null>(null);

  const videoElementRef = useRef<HTMLVideoElement | null>(null);
  const videoAbortControllerRef = useRef<AbortController | null>(null);
  const videoOperationIdRef = useRef<number>(0);
  const isVideoPlayingRef = useRef<boolean>(false);

  const resetVideoElement = useCallback(() => {
    console.log('useCameraVideoElement resetVideoElement');
    const videoElement = videoElementRef.current;
    if (videoElement) {
      videoElement.srcObject = null;
      isVideoPlayingRef.current = false;
    }
  }, []);

  const stopCameraVideo = useCallback(() => {
    console.log('useCameraVideoElement stopCameraVideo');
    videoOperationIdRef.current += 1;

    if (videoAbortControllerRef.current) {
      videoAbortControllerRef.current.abort();
      videoAbortControllerRef.current = null;
    }

    const videoElement = videoElementRef.current;
    if (videoElement) {
      if (!videoElement.paused) {
        videoElement.pause();
      }
    }

    stopMediaStream();
    setVideoElementError(null);
    isVideoPlayingRef.current = false;
  }, [stopMediaStream]);

  const startCameraVideo = useCallback(async () => {
    console.log('useCameraVideoElement startCameraVideo');

    if (isVideoPlayingRef.current && videoElementRef.current && mediaStreamRef.current) {
      const videoElement = videoElementRef.current;
      const mediaStream = mediaStreamRef.current;

      if (
        videoElement.srcObject === mediaStream &&
        !videoElement.paused &&
        mediaStream.getTracks().every((track) => track.readyState === 'live')
      ) {
        console.log('Video already playing with active stream, reusing');
        return;
      }
    }

    stopCameraVideo();

    const currentOperationId = ++videoOperationIdRef.current;
    const abortController = new AbortController();
    videoAbortControllerRef.current = abortController;

    try {
      if (videoOperationIdRef.current !== currentOperationId || abortController.signal.aborted) {
        console.log('Operation superseded by newer operation before startMediaStream');
        return;
      }

      await startMediaStream();

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (videoOperationIdRef.current !== currentOperationId || abortController.signal.aborted) {
        console.log('Operation aborted or superseded after startMediaStream');
        return;
      }

      const videoElement = videoElementRef.current;
      const mediaStream = mediaStreamRef.current;
      if (!videoElement || !mediaStream) {
        return;
      }

      if (videoElement.srcObject) {
        videoElement.srcObject = null;
      }

      videoElement.srcObject = mediaStream;

      try {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (videoOperationIdRef.current !== currentOperationId || abortController.signal.aborted) {
          console.log('Operation aborted or superseded before canplay Promise');
          return;
        }

        await new Promise<void>((resolve, reject) => {
          const canPlayHandler = () => {
            videoElement.removeEventListener('canplay', canPlayHandler);
            abortController.signal.removeEventListener('abort', abortHandler);
            resolve();
          };

          const abortHandler = () => {
            videoElement.removeEventListener('canplay', canPlayHandler);
            reject(new DOMException('Aborted', 'AbortError'));
          };

          if (videoElement.readyState >= 3) {
            resolve();
            return;
          }

          videoElement.addEventListener('canplay', canPlayHandler);
          abortController.signal.addEventListener('abort', abortHandler);
        });
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }
        throw err;
      }

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (videoOperationIdRef.current !== currentOperationId || abortController.signal.aborted) {
        console.log('Operation aborted or superseded before play');
        return;
      }

      await videoElement.play();

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (videoOperationIdRef.current !== currentOperationId || abortController.signal.aborted) {
        console.log('Operation aborted or superseded after play');
        return;
      }

      isVideoPlayingRef.current = true;
    } catch (err) {
      if (
        videoOperationIdRef.current !== currentOperationId ||
        videoAbortControllerRef.current !== abortController ||
        abortController.signal.aborted ||
        (err instanceof DOMException && err.name === 'AbortError')
      ) {
        return;
      }

      console.error('camera start error: %o', err);
      setVideoElementError('failed to start camera');
      isVideoPlayingRef.current = false;
    }
  }, [startMediaStream, mediaStreamRef, stopCameraVideo]);

  // cleanup
  useEffect(() => {
    return () => {
      console.log('useCameraVideoElement cleanup');
      stopCameraVideo();
    };
  }, [stopCameraVideo]);

  return {
    videoElementRef,
    startCameraVideo,
    stopCameraVideo,
    resetVideoElement,
    isStreamActive,
    error: streamError ?? videoElementError,
  };
};
