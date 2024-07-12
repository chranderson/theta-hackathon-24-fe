'use client';

import { useState } from 'react';
import { VideoProcessor } from './videoProcessor';
import { Button } from '@/components/ui/button';
import { VideoFileInput } from '@/components/ui/videoFileInput';

export default function VideoLoader() {
  const [file, setFile] = useState<File>();

  const fileSizeInMB = (bytes: number) => (bytes / 1048576).toFixed(2);

  return (
    <div className="sm:container">
      {!file && <VideoFileInput onChange={setFile} />}
      <section>
        <div className="p-4 sm:px-0 empty:hidden flex flex-col sm:flex-row gap-5 sm:justify-between sm:items-center border-b">
          {file ? (
            <>
              <span className="sm:text-lg">
                {file?.name} /{' '}
                {file?.size ? `${fileSizeInMB(file.size)} MB` : null}
              </span>
              <Button onClick={() => setFile(undefined)} variant="destructive">
                Clear Video
              </Button>
            </>
          ) : null}
        </div>
        <div className="empty:hidden p-4 sm:p-0">
          {!!file && <VideoProcessor file={file} />}
        </div>
      </section>
    </div>
  );
}
