import type { WorkerMessageT } from './types';

let pingCount = 0;
self.onmessage = async (e) => {
  const message: WorkerMessageT = e.data;
  console.log('>Worker: Message received: ', message);

  switch (message.type) {
    case 'ping':
      self.postMessage({ pingCount: ++pingCount });
      break;
    default:
      console.log('>Worker: nothing to do:', e.data.type);
      break;
  }
};
