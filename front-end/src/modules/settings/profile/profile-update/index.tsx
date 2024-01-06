'use client';

import { UpdateSchema } from '@lib/constant/validation';
import { FormikInput } from '@modules/authentication/formik-comps';
import Avatar from '@modules/common/components/ui/avatar';
import { Button } from '@modules/common/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@modules/common/components/ui/card';
import clsx from 'clsx';
import { UpdateUser, useAuth } from 'context/auth-context';
import { ConnectedFocusError } from 'focus-formik-error';
import { Field, Form, Formik } from 'formik';
import { Loader2Icon, RotateCw } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import AlertLogin from '../alert-login';

type Props = {} & React.HTMLAttributes<HTMLDivElement>;

type user_avartar_display = Blob | string;

export const processImageBlob = (data: user_avartar_display) => {
  if (data === null) {
    return 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
  } else if (typeof data === 'string') {
    return data;
  } else if (typeof data === 'object') {
    return URL.createObjectURL(data);
  }
};

const ProfileUpdate: React.FC<Props> = ({ className, ...props }: Props) => {

  const { handleUpdateProfile, handleLogout } = useAuth();
  const [isChangeable, setIsChangeable] = React.useState(false);
  const currentPath = usePathname();

  const { user } = useAuth();
  const {
    user_id,
    username,
    user_fullname,
    user_email,
    user_avatar,
    user_stream_key,
  } = user;

  const initUpdateProfile: UpdateUser = {
    user_id: user_id,
    username: username,
    user_fullname: user_fullname,
    user_email: user_email,
    user_avatar: user_avatar,
  };

  // process avatar url

  return (
    <section className={clsx('min-w-[40vw]', className)}>
      {user_id ? (
        <Formik
          initialValues={initUpdateProfile}
          onSubmit={(values) => handleUpdateProfile(values)}
          validationSchema={UpdateSchema}
          enableReinitialize={true}>
          {({ submitForm, isSubmitting, dirty, resetForm, values }) => (
            <Card className='m-4 bg-ash-gray shadow-2xl'>
              <CardHeader className='flex flex-col center-item gap-3'>
                <Avatar
                  className='object-center object-cover w-24 h-24'
                  src={processImageBlob(values.user_avatar) || ''}
                  alt={user_fullname ? user_fullname : 'Unknown'}></Avatar>

                <div>
                  <Field
                    type='file'
                    disabled={!isChangeable}
                    name='user_avatar'
                    className='rounded-2xl'
                    accept='.jpg, .png'
                    component={FormikInput}
                  />
                </div>

                <div>
                  <CardTitle>
                    {user_fullname ? user_fullname : 'Unknown'}
                  </CardTitle>
                  <CardDescription>
                    {user_email ? user_email : 'Unknown'}
                  </CardDescription>
                  <CardDescription>
                    {username ? '@' + username : 'Unknown'}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className='flex flex-col'>
                <ConnectedFocusError />
                <Form
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      submitForm();
                    }
                  }}>
                  <div>
                    <Field
                      disabled={!isChangeable}
                      label='Username'
                      name='username'
                      className='rounded-2xl'
                      autoComplete='username'
                      component={FormikInput}
                    />
                  </div>
                  <div>
                    <Field
                      disabled={!isChangeable}
                      label='Fullname'
                      name='user_fullname'
                      className='rounded-2xl'
                      autoComplete='fullname'
                      component={FormikInput}
                    />
                  </div>

                  <div>
                    <Field
                      disabled={!isChangeable}
                      label='Email'
                      name='user_email'
                      className='rounded-2xl'
                      autoComplete='email'
                      component={FormikInput}
                    />
                  </div>

                  <div>
                    <Field
                      readOnly
                      disabled
                      isCopyable={true}
                      label='Stream Key'
                      name='user_stream_key'
                      className='rounded-2xl w-full flex flex-col'
                      autoComplete='stream_key'
                      component={FormikInput}
                      value={user_stream_key}
                    />
                  </div>
                </Form>
                <div className='flex gap-2 w-full flex-col text-white'>
                  <div className='flex gap-2 w-full'>
                    <Button
                      disabled={isSubmitting}
                      className='w-full'
                      onClick={async (e) => {
                        if (dirty) {
                          const foo =
                            (await submitForm()) as unknown as boolean;
                          if (foo) {
                            setIsChangeable(!isChangeable);
                          }
                        } else {
                          if (isChangeable && !dirty) {
                            setIsChangeable(false);
                          } else {
                            setIsChangeable(true);
                          }
                        }
                      }}>
                      {isSubmitting ? (
                        <Loader2Icon className='animate-spin duration-100' />
                      ) : isChangeable ? (
                        dirty ? (
                          'Update Profile'
                        ) : (
                          'Cancel'
                        )
                      ) : (
                        'Update'
                      )}
                    </Button>

                    <Button
                      disabled={!dirty}
                      onClick={() => resetForm()}>
                      <RotateCw />
                    </Button>

                  </div>


                  <div className='flex gap-2 w-full'>
                    <Button className='w-full whitespace-nowrap'>
                      Create Channel
                    </Button>
                    <Button className='w-full whitespace-nowrap' asChild>
                      <Link href={'/go-live'}>Create A Stream</Link>
                    </Button>
                  </div>
                  <div className='flex gap-2 w-full'>
                    <Button className="w-full whitespace-nowrap bg-red-700  hover:bg-red-400" onClick={(e) => { e.preventDefault; handleLogout(); }} >Logout</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </Formik>
      ) : (
        <AlertLogin fallbackPath={currentPath} />
      )}
    </section>
  );
};

export default ProfileUpdate;
