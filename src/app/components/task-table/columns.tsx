'use client';

import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Task = {
  id: string;
  status: 'pending' | 'processing' | 'success' | 'failed';
  category: string;
  subcategory: string;
  task: string;
  difficulty: number;
  time: number;
  app: string;
};

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: 'status',
    header: 'Status'
  },
  {
    accessorKey: 'category',
    header: 'Category'
  },
  {
    accessorKey: 'subcategory',
    header: 'Subcategory'
  },
  {
    accessorKey: 'app',
    header: 'App'
  },
  {
    accessorKey: 'task',
    header: 'Task'
  },
  {
    accessorKey: 'difficulty',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Difficulty
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const difficulty = parseFloat(row.getValue('difficulty'));
      return <div className="text-center font-medium">{difficulty}</div>;
    }
  },
  {
    accessorKey: 'time',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Time
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const time = parseFloat(row.getValue('time'));
      return <div className="text-center font-medium">{time}</div>;
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const task = row.original;

      return (
        <Button
          variant="default"
          className=""
          onClick={() => alert(`perform task: ${task.id}`)}
        >
          Earn
        </Button>
      );
    }
  }
];
