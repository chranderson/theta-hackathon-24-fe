import { openDB, DBSchema } from 'idb';

export interface PendingTasksDB extends DBSchema {
  'processed-frames': {
    value: {
      frames: { id: string; url: string }[];
      complete: boolean;
      taskId: string;
      date: string;
    };
    key: string;
    indexes: { 'by-taskId': string };
  };
  tasks: {
    value: {
      taskId: string;
      status: 'processing' | 'processed' | 'submitting';
    };
    key: string;
    indexes: { 'by-taskId': string };
  };
}

export const initDb = async () =>
  openDB<PendingTasksDB>('pending-tasks', 1, {
    upgrade(db) {
      const processedFramesStore = db.createObjectStore('processed-frames', {
        keyPath: 'taskId'
      });
      processedFramesStore.createIndex('by-taskId', 'taskId');

      const pendingTasksStore = db.createObjectStore('tasks', {
        keyPath: 'taskId'
      });
      pendingTasksStore.createIndex('by-taskId', 'taskId');
    }
  });
