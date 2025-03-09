import { useEffect, useRef, useState, useCallback } from 'react';

export const useMediaStream = (constraints: MediaStreamConstraints) => {
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const [isStreamActive, setIsStreamActive] = useState<boolean>(false);
  const isStreamActiveRef = useRef<boolean>(false);
  const [streamError, setStreamError] = useState<string | null>(null);
  const streamAbortControllerRef = useRef<AbortController | null>(null);
  const streamOperationIdRef = useRef<number>(0);

  const stopMediaStream = useCallback(() => {
    console.log('useMediaStream stopMediaStream');
    streamOperationIdRef.current += 1;

    if (streamAbortControllerRef.current) {
      streamAbortControllerRef.current.abort();
      streamAbortControllerRef.current = null;
    }

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => {
        if (track.readyState === 'live') {
          track.stop();
        }
      });
      mediaStreamRef.current = null;
    }
    setIsStreamActive(false);
    setStreamError(null);
  }, []);

  const startMediaStream = useCallback(async () => {
    console.log('useMediaStream startMediaStream');

    if (isStreamActiveRef.current && mediaStreamRef.current) {
      const currentTracks = mediaStreamRef.current.getTracks();
      const allTracksActive = currentTracks.every((track) => track.readyState === 'live');

      if (allTracksActive) {
        console.log('Camera already streaming with active tracks, reusing stream');
        return;
      }
    }

    stopMediaStream();

    const currentOperationId = ++streamOperationIdRef.current;
    const abortController = new AbortController();
    streamAbortControllerRef.current = abortController;

    try {
      if (streamOperationIdRef.current !== currentOperationId || abortController.signal.aborted) {
        console.log('Operation superseded by newer operation before getUserMedia');
        return;
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (streamOperationIdRef.current !== currentOperationId || abortController.signal.aborted) {
        console.log('Operation aborted or superseded after getUserMedia');
        mediaStream.getTracks().forEach((track) => {
          track.stop();
        });
        return;
      }

      mediaStreamRef.current = mediaStream;
      isStreamActiveRef.current = true;
      setIsStreamActive(true);
    } catch (err) {
      if (
        streamOperationIdRef.current !== currentOperationId ||
        streamAbortControllerRef.current !== abortController ||
        abortController.signal.aborted
      ) {
        return;
      }

      console.error('camera start error: %o', err);
      setStreamError('failed to start camera');
    }
  }, [constraints, stopMediaStream]);

  // cleanup
  useEffect(() => {
    return () => {
      console.log('useMediaStream cleanup');
      stopMediaStream();
    };
  }, [stopMediaStream]);

  return {
    mediaStreamRef,
    isStreamActive,
    startMediaStream,
    stopMediaStream,
    streamError,
  };
};
