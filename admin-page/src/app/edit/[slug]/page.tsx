'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Edit({ params }: { params: { slug: string } }) {
  const [user, setUser] = useState<any>('');
  const [username, setUsername] = useState<any>('');
  const [fullName, setFullName] = useState<any>('');
  const [email, setEmail] = useState<any>('');
  const [role, setRole] = useState<any>('');
  const [avatar, setAvatar] = useState<any>('');
  useEffect(() => {
    axios({
      url: 'https://nt208-g4.site/v1/api/user/' + params.slug,
      withCredentials: true,
    }).then((res) => setUser(res.data.user));
  });

  const handleUpdate = () => {
    axios({
      url: 'https://nt208-g4.site/v1/api/user/' + params.slug,
      withCredentials: true,
      data: {
        ...(username && { username: username }),
        ...(fullName && { fullName: fullName }),
        ...(email && { email: email }),
        ...(role && { role: role }),
        ...(avatar && { avatar: avatar }),
      },
    }).then(res => console.log(res));
  };

  return (
    <main className='flex justify-center items-center h-screen'>
      <Card className='w-[600px]'>
        <CardHeader>
          <CardTitle>Edit User</CardTitle>
        </CardHeader>
        <CardContent className='space-y-5'>
          <div>
            <Label>Username</Label>
            <Input
              defaultValue={user.username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <Label>Full Name</Label>
            <Input
              defaultValue={user.user_fullname}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              defaultValue={user.user_email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label>Role</Label>
            <Input
              defaultValue={user.user_role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
          <div>
            <Label>Avatar</Label>
            <Input
              defaultValue={user.user_avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleUpdate}>Update</Button>
        </CardFooter>
      </Card>
    </main>
  );
}
