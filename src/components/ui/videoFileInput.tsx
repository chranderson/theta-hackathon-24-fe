import { useDropzone } from 'react-dropzone';
import { UploadIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 *  A drop zone file input for loading a single video file.
 *
 *  - Accepts a single video file
 *  - has onChange handler which is called when file is selected or dropped
 *  - className is added to wrapper div
 *
 * @example
 * ```ts
 * <VideoFileInput onChange={(file: File) => console.log(file)} />
 * ```
 */
function VideoFileInput({
  className,
  onChange
}: {
  className?: string;
  onChange: (file: File) => void;
}) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'video/*': ['.mp4', '.mov', '.avi', '.wmv', '.mpg', '.mpeg']
    },
    maxFiles: 1,
    onDrop: (files) => onChange(files[0])
  });

  return (
    <div
      {...getRootProps({
        className: cn(
          'cursor-pointer px-4 py-6 sm:p-12 rounded-sm max-w-4xl mx-auto border bg-muted-foreground/10 sm:bg-default',
          className
        )
      })}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col gap-5 sm:gap-6 items-center text-center">
        <div className="max-w-prose mx-auto sm:text-balance">
          <h2 className="font-serif text-3xl sm:text-4xl mb-8 text-accent-foreground">
            Load a video to get started
          </h2>
          <p className="text-muted-foreground">
            <span>We support a variety of video formats,</span>{' '}
            <span>including MP4, MOV, AVI, WMV, and MPEG.</span>
          </p>
        </div>
        <Button
          className="font-bold inline-flex flex-nowrap gap-4 items-center "
          size="lg"
          variant="destructive"
        >
          <UploadIcon className="h-6 w-6" strokeWidth={2} /> Secure and load
          video
        </Button>
        <p className="text-sm text-accent-foreground">
          Drag and drop a video file here or click button to select a file.
        </p>
      </div>
    </div>
  );
}

export { VideoFileInput };
