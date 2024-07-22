import VideoLoader from './video-loader/videoLoader';
import { getTask } from './getTask';
import { notFound } from 'next/navigation';

export default async function TaskPage({
  params
}: {
  params: { taskId: string };
}) {
  const taskData = await getTask({ taskId: params.taskId });
  if (!taskData) {
    notFound();
  }

  return (
    <main className="mt-16 sm:container flex flex-col">
      <header className="mt-12 mb-24">
        <h1 className="font-semibold text-3xl mb-6 flex flex-col">
          <span>{taskData.task}</span>
        </h1>
        <div className="mb-4">
          <p>Difficulty: {taskData.difficulty}</p>
          <p>Time: {taskData.time}</p>
        </div>
        <p>Record your screen while doing the task, then load the video.</p>
      </header>
      <VideoLoader taskId={params.taskId} />
    </main>
  );
}
