import { useEffect, useRef, useState } from 'react';
import getCaptureInterval from './utils/getCaptureInterval';
import { Progress } from '@/components/ui/progress';
import captureFrames from './utils/captureFrames';
import type { ProgressPayload } from './utils/captureFrames';

/**
 * A grid for rendering video frame images.
 */
function FramesGrid({ frames }: { frames: string[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 sm:mt-16 animate-fade-in">
      {frames.map((src, i) => (
        <div
          className="relative aspect-video flex items-center justify-center outline outline-offset-4 outline-secondary-foreground/10 hover:outline-secondary-foreground/40"
          key={src}
        >
          <img
            className="object-contain"
            src={src}
            alt={`video frame: ${i + 1}`}
          />
        </div>
      ))}
    </div>
  );
}

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
        <Progress value={percent * 1.1} />
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
function VideoProcessor({ file }: { file: File }) {
  const [frames, setFrames] = useState<string[]>([]);
  const [progress, setProgress] = useState<ProgressPayload>({
    processed: 0,
    total: 0,
    percent: 0,
    finished: false
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // initialze video & canvas
    const videoEl = videoRef.current;
    const canvasEl = canvasRef.current;
    if (!videoEl || !canvasEl) return;

    videoEl.src = URL.createObjectURL(file);

    videoEl.onloadedmetadata = (event) => {
      const target = event.target as HTMLVideoElement;
      canvasEl.width = target.videoWidth;
      canvasEl.height = target.videoHeight;

      // this caps frame count to make demo faster.
      // in real applications, we would not use interval snapshots.
      const { interval, frameCount } = getCaptureInterval(target.duration);

      captureFrames(
        {
          videoEl: videoRef.current!,
          canvasEl: canvasRef.current!,
          interval,
          frameCount,
          onProgress: setProgress
        },
        setFrames
      );
    };

    return () => {
      if (!videoRef.current?.src) return;
      // revmoe the video url to prevent memory leaks
      URL.revokeObjectURL(videoRef.current.src);
    };
  }, []);

  return (
    <>
      <canvas className="hidden" ref={canvasRef} />
      <video className="hidden" ref={videoRef} />

      {!!frames.length && <FramesGrid frames={frames} />}

      {!progress.finished && (
        <ProcessingProgress
          message="Processing Video"
          percent={progress.percent}
        />
      )}
    </>
  );
}

export { VideoProcessor };
