import { Frame } from './utils/captureFrames';

/**
 * A grid for rendering video frame images.
 */
export default function FramesGrid({ frames }: { frames: Frame[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 sm:mt-16 animate-fade-in">
      {frames.map((src, i) => (
        <div
          className="relative aspect-video flex items-center justify-center outline outline-offset-4 outline-secondary-foreground/10 hover:outline-secondary-foreground/40"
          key={src.id}
        >
          <img
            className="object-contain"
            src={src.url}
            alt={`video frame: ${i + 1}`}
          />
        </div>
      ))}
    </div>
  );
}
