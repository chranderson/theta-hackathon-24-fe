/**
 * provides the interval between frame and total frame count for a given duration.
 * Will try to set interval to 4 seconds between frames,
 * but will adjust interval if the frame count is too high or too low.
 *
 * @example
 * ```ts
 * getCaptureInterval(8) // {interval: 0.8, frameCount: 10}
 * getCaptureInterval(60) // {interval: 4, frameCount: 15}
 * getCaptureInterval(144) // {interval: 4, frameCount: 36}
 * getCaptureInterval(240) // {interval: 6, frameCount: 40}
 * getCaptureInterval(240, { maxFrameCount: 400 }) // {interval: 4, frameCount: 60}
 * getCaptureInterval(240, { desiredInterval: 10 }) // {interval: 10, frameCount: 24}
 *
 * ```
 */
export default function getCaptureInterval(
  duration: number,
  options?: {
    maxFrameCount?: number;
    minFrameCount?: number;
    desiredInterval?: number;
  }
) {
  const minFrameCount = options?.minFrameCount ?? 10;
  const maxFrameCount = options?.maxFrameCount ?? 40;
  const desiredInterval = options?.desiredInterval ?? 4;
  const frameCount = Math.min(
    Math.max(minFrameCount, Math.ceil(duration / desiredInterval)),
    maxFrameCount
  );

  // if frame count is over maxFrameCount, use maxFrameCount to determine interval
  if (frameCount >= maxFrameCount) {
    return {
      interval: duration / maxFrameCount,
      frameCount: maxFrameCount
    };
  }

  // if frame count is under maxFrameCount, use frameCount to determine interval
  return {
    interval: duration / frameCount,
    frameCount
  };
}
