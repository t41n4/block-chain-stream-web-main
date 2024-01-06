'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [username, setUsername] = React.useState<any>('');
  const [password, setPassword] = React.useState<any>('');
  const router = useRouter();

  const handleLogin = () => {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);

    axios({
      method: 'POST',
      url: 'https://nt208-g4.site/v1/api/login',
      data: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      withCredentials: true,
    }).then((response) => {
      if (response.status === 200) {
        router.push('/user');
      }
    });
  };

  return (
    <main className='flex justify-center items-center h-screen'>
      <Card className='w-[30em]'>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Admin is require to login</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className='grid w-full items-center gap-4'>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='username'>Username</Label>
                <Input
                  id='username'
                  placeholder='e.g. pk200'
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='password'>Password</Label>
                <Input
                  id='password'
                  placeholder='•••••••••••'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className='flex justify-between'>
          <Button onClick={handleLogin}>Log in</Button>
        </CardFooter>
      </Card>
    </main>
  );
}
