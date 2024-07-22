'use client';

import { useEffect, useState } from 'react';
import { VideoProcessor } from './videoProcessor';
import { Button } from '@/components/ui/button';
import { VideoFileInput } from '@/components/ui/videoFileInput';
import FramesGrid from './framesGrid';
import { initDb } from '@/lib/db';
import type { Frame } from './utils/captureFrames';

export default function VideoLoader({ taskId }: { taskId: string }) {
  const [status, setStatus] = useState<'LOADING' | 'IDLE' | 'SUBMITTING'>(
    'LOADING'
  );
  const [file, setFile] = useState<File | null>(null);
  const [frames, setFrames] = useState<Frame[]>([]);
  const fileSizeInMB = (bytes: number) => (bytes / 1048576).toFixed(2);

  async function getFrames() {
    setStatus('LOADING');
    const db = await initDb();
    const processedFrames = await db.getFromIndex(
      'processed-frames',
      'by-taskId',
      taskId
    );
    if (!!processedFrames) {
      setFrames(processedFrames.frames);
    } else {
      setFrames([]);
    }
    setStatus('IDLE');
  }

  async function deleteFrames() {
    const db = await initDb();
    await db.delete('processed-frames', taskId);
    setFile(null);
    getFrames();
  }

  async function handleSubmit() {
    setStatus('SUBMITTING');
    const db = await initDb();
    await db.put('tasks', { taskId, status: 'submitting' });
    const sleep = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));
    await sleep(5000);

    deleteFrames();
    setStatus('IDLE');
  }

  useEffect(() => {
    getFrames();
  }, []);

  const hasFrames = !!frames.length;

  if (status === 'SUBMITTING') {
    return (
      <div className="absolute inset-0 flex items-center justify-center font-bold text-5xl animate-pulse">
        Submitting...
      </div>
    );
  }

  return (
    <div className="sm:container">
      {status === 'IDLE' && !file && !hasFrames && (
        <VideoFileInput onChange={setFile} />
      )}
      <section>
        <div className="py-8 sm:px-0 empty:hidden flex flex-col sm:flex-row gap-5 sm:justify-between sm:items-center border-b">
          {status === 'IDLE' && !!file && (
            <div className="flex justify-between items-center w-full">
              <span className="sm:text-lg">
                {file?.name} /{' '}
                {file?.size ? `${fileSizeInMB(file.size)} MB` : null}
              </span>
              <div className="flex gap-4">
                {hasFrames && (
                  <>
                    <Button variant="link">Download Frames</Button>
                    <Button onClick={deleteFrames} variant="destructive">
                      Clear
                    </Button>
                    <Button onClick={handleSubmit}>Submit Task</Button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="empty:hidden p-4 sm:p-0">
          {status === 'IDLE' && hasFrames && <FramesGrid frames={frames} />}
          {status === 'IDLE' && !!file && !hasFrames && (
            <VideoProcessor file={file} taskId={taskId} onSuccess={getFrames} />
          )}
        </div>
      </section>
    </div>
  );
}
