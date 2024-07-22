import { tasks } from '@/task-fixtures';

export async function getTask({ taskId }: { taskId: string }) {
  return new Promise<(typeof tasks)[number] | undefined>((resolve, reject) => {
    const task = tasks.find((task) => task.id.toString() === taskId);

    resolve(task);
  });
}
