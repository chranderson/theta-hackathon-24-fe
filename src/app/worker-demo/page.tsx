'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { WorkerMessageT } from '../../../workers/types';
import { Button } from '@/components/ui/button';

export default function WorkerDemoPage() {
  const [pingCount, setPingCount] = useState(0);
  const workerRef = useRef<Worker>();

  useEffect(() => {
    workerRef.current = new Worker('/workers/test.js', {
      type: 'module'
    });
    workerRef.current.onmessage = (event) => {
      console.log('> component: Message received: ', event.data);

      if (event.data.pingCount !== undefined) {
        const updatedPingCount = event.data.pingCount ?? 0;
        setPingCount(updatedPingCount);
      }
    };
    workerRef.current.onerror = (error) => {
      console.error('Worker error:', error);
    };
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);

  const pingWorker = useCallback((type: WorkerMessageT['type']) => {
    const workerMessage: WorkerMessageT = {
      type
    };
    if (workerRef.current) {
      workerRef.current.postMessage(workerMessage);
    }
  }, []);

  return (
    <main className="flex-1 flex h-full gap-8 flex-col items-center justify-center p-24">
      <h1 className="font-serif text-4xl text-center">Worker Demo</h1>
      <Button onClick={() => pingWorker('ping')}>Ping Worker</Button>
      <div className=" flex items-center justify-center text-2xl text-center">
        Ping Count: {pingCount}
      </div>
    </main>
  );
}
