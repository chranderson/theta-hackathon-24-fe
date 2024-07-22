import { DataTable } from './data-table';
import { columns } from './columns';
import type { Task } from './columns';
import { tasks } from '@/task-fixtures';

const transformedTasks: Task[] = tasks.map((task) => ({
  ...task,
  id: task.id.toString(),
  status: 'pending'
}));

export function TaskTable() {
  return <DataTable columns={columns} data={transformedTasks} />;
}
