export type ProgressPayload = {
  processed: number;
  total: number;
  percent: number;
  finished: boolean;
};

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
  setFrames: (frames: string[]) => void
) {
  let processedFrames: string[] = [];
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
        videoEl.onseeked = () => {
          try {
            context.drawImage(videoEl, 0, 0, canvasEl.width, canvasEl.height);
            const dataURL = canvasEl.toDataURL('image/png');
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
    await capture(i * interval).then(({ dataURL }) => {
      processedFrames.push(dataURL);

      const thisFrame = i + 1;

      // update progress if provided
      onProgress?.({
        processed: thisFrame,
        total: frameCount,
        percent: (thisFrame / frameCount) * 100,
        finished: thisFrame === frameCount
      });
    });
  }

  setFrames(processedFrames);
}
