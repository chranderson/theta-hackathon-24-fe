import { useEffect, useRef, useState } from 'react';
import getCaptureInterval from './utils/getCaptureInterval';
import { Progress } from '@/components/ui/progress';
import captureFrames, { Frame } from './utils/captureFrames';
import type { ProgressPayload } from './utils/captureFrames';
import { initDb } from '@/lib/db';

/**
 * Progress bar indicator with message for pending state
 */
function ProcessingProgress({
  message,
  percent
}: {
  message: string;
  percent: number;
}) {
  return (
    <div className="flex items-center justify-center pulse py-16 sm:py-24">
      <div className="max-w-100 grid gap-4">
        <span className="text-xl font-semibold animate-pulse">{message}</span>
        <Progress value={percent} />
      </div>
    </div>
  );
}

/**
 * WIP
 * A component that processes a video file, generates frames and returns them to parent component.
 * TODO:
 * - Add Tesseract & config to Redact frames
 * - determine if this component should handle storing frames in web storage
 * - add Sonner to provide user feedback
 * - look into using webworker to process frames
 */
function VideoProcessor({
  file,
  taskId,
  onSuccess
}: {
  file: File;
  taskId: string;
  onSuccess: () => void;
}) {
  const [progress, setProgress] = useState<ProgressPayload>({
    processed: 0,
    total: 0,
    percent: 0,
    finished: false
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleProcessComplete = async (frames: Frame[]) => {
    const db = await initDb();
    await db.put('processed-frames', {
      complete: true,
      taskId,
      frames,
      date: new Date().toISOString()
    });
    await db.put('tasks', { taskId, status: 'processed' });
    onSuccess();
  };

  useEffect(() => {
    // initialze video & canvas
    const videoEl = videoRef.current;
    const canvasEl = canvasRef.current;
    if (!videoEl || !canvasEl) return;

    videoEl.src = URL.createObjectURL(file);

    videoEl.onloadedmetadata = async (event) => {
      const db = await initDb();
      await db.put('tasks', { taskId, status: 'processing' });

      const target = event.target as HTMLVideoElement;
      canvasEl.width = target.videoWidth;
      canvasEl.height = target.videoHeight;

      // this caps frame count to make demo faster.
      // in real applications, we would not use interval snapshots.
      const { interval, frameCount } = getCaptureInterval(target.duration, {
        // maxFrameCount: 2 // set for development and testing
      });

      captureFrames(
        {
          videoEl: videoRef.current!,
          canvasEl: canvasRef.current!,
          interval,
          frameCount,
          onProgress: setProgress
        },
        handleProcessComplete
      );
    };

    return () => {
      if (!videoEl.src) return;
      // revmoe the video url to prevent memory leaks
      URL.revokeObjectURL(videoEl.src);
    };
  }, [file]);

  return (
    <>
      <canvas className="hidden" ref={canvasRef} />
      <video className="hidden" ref={videoRef} />

      {!progress.finished && (
        <ProcessingProgress
          message="Processing Video"
          percent={Math.max(10, progress.percent)}
        />
      )}
    </>
  );
}

export { VideoProcessor };
