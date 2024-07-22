import { env } from '@/lib/env';
import { TaskTable } from './components/task-table/task-table';

export default function Home() {
  return (
    <main className="container">
      <h1 className="font-serif text-4xl text-center my-24">
        {env.NEXT_PUBLIC_APP_NAME}
        <span className="block text-primary text-6xl">2024</span>
      </h1>
      <TaskTable />
    </main>
  );
}
