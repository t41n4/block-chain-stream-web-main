'use client';

import { ColumnDef } from '@tanstack/react-table';

export type User = {
  user_id: string;
  username: string;
  user_fullname: string;
  user_email: string;
  user_stream_key: string;
  user_role: string;
  user_avatar: string
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'user_id',
    header: 'ID',
  },
  {
    accessorKey: 'username',
    header: 'Username',
  },
  {
    accessorKey: 'user_fullname',
    header: 'User Full Name',
  },
  {
    accessorKey: 'user_email',
    header: 'Email',
  },
  {
    accessorKey: 'user_stream_key',
    header: 'Stream Key',
  },
  {
    accessorKey: 'user_role',
    header: 'Role',
  },
  {
    accessorKey: 'user_avatar',
    header: 'Avatar',
  },
];