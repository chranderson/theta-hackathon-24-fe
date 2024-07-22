import captureAndRedactFrame from './captureAndRedactFrame';

export type ProgressPayload = {
  processed: number;
  total: number;
  percent: number;
  finished: boolean;
};
export type Frame = { id: string; url: string };

/**
 * A utility function to capture frames at a given interval for a provided video element.
 *
 * @example
 * ```ts
 * 
 * captureFrames(
    {
      videoEl: videoRef.current!,
      canvasEl: canvasRef.current!,
      interval,
      frameCount,
      onProgress: setProgress
    },
    setFrames: (frames) => doSomethingWithFrames(frames)
  );
 * ```
 */
export default async function captureFrames(
  {
    videoEl,
    canvasEl,
    interval,
    frameCount,
    onProgress
  }: {
    videoEl: HTMLVideoElement;
    canvasEl: HTMLCanvasElement;
    interval: number;
    frameCount: number;
    onProgress?: (progress: ProgressPayload) => void;
  },
  /** callback - returns all processed frames upon completion */
  setFrames: (frames: Frame[]) => void
) {
  let processedFrames: Frame[] = [];
  const context = canvasEl.getContext('2d');
  if (!context) {
    throw new Error('canvasContext is not defined');
  }

  /**
   * Returns a Promise which captures and returns a frame at the given time.
   *
   * @example
   * ```ts
   * const { dataURL, time } = await capture(0.4);
   * ```
   */
  const capture = (time = 0): Promise<{ dataURL: string; time: number }> => {
    return new Promise((resolve, reject) => {
      try {
        // set the time for the desired frame
        videoEl.currentTime = time;
        // Use the seeked event to wait until the video has been seeked to the desired time.
        videoEl.onseeked = async () => {
          try {
            const { dataURL } = await captureAndRedactFrame({
              canvas: canvasEl,
              video: videoEl
            });

            resolve({ dataURL, time });
          } catch (error) {
            reject(error);
          }
        };
      } catch (error) {
        reject(error);
      }
    });
  };

  // capture a frame every interval seconds, until we have captured all frames
  for (let i = 0; i < frameCount; i++) {
    await capture(i * interval).then(async ({ dataURL }) => {
      const currentTime = i * interval;
      const idIDB = currentTime.toString();

      processedFrames.push({ id: idIDB, url: dataURL });

      const thisFrame = i + 1;

      if (typeof onProgress === 'function') {
        // update progress if provided
        onProgress({
          processed: thisFrame,
          total: frameCount,
          percent: (thisFrame / frameCount) * 100,
          finished: thisFrame === frameCount
        });
      }
    });
  }

  setFrames(processedFrames);
}
