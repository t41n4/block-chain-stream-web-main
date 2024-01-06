'use client';

import { getAxiosParam } from '@lib/helpers/api';
import {
  notifyError,
  notifySuccess,
} from '@modules/common/components/toast-comps';
import axios from 'axios';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useRouter } from 'next/navigation';
import { createContext, use, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { storeUserData } from 'redux/slices/userSlices';
import { storage } from '../lib/helpers/firebase';

export type UserBase = {
  username: string;
  user_fullname: string;
  user_email: string;
  user_avatar: string;
};

export type User = {
  user_id: string;
  user_role: '1' | '2';
  user_stream_key: string;
  user_wallet_address: string
} & UserBase;

export type UpdateUser = {
  user_id: string;
} & UserBase;

interface AccountProviderProps {
  children?: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const compareObj = (obj1: any, obj2: any) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

export const AuthProvider = ({ children }: AccountProviderProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: any) => state.data.user) as User;
  
  // get cookie from document
  const cookie = document.cookie;

  const handleLogin = async (values: any, fallback: string) => {
    const paramsLogin = getAxiosParam(
      process.env.NEXT_PUBLIC_API_URL + '/login',
      'POST',
      {
        username: values.username,
        password: values.user_password,
      },
      '',
      {
        withCredentials: true,
      }
    );
    try {
      const res = await axios.request(paramsLogin);
      if (res.status === 200) {
        const userData = res.data.user;
        if (userData) {
          dispatch(storeUserData(userData));
          notifySuccess('Login success');
          console.log('fallback: ', fallback);
          if (fallback)
            router.push(`/${fallback}`);
          else
            router.push('/');
          // router.push('/stream/pk200');
        }
      }
    } catch (err: any) {
      if (err.code === 'ERR_NETWORK') notifyError(`Login failed ERR_NETWORK`);
      else
        notifyError(
          `Login failed ${err?.response?.data?.message?.toLowerCase()}`
        );
    }
  };

  const handleSignUp = async (values: any, fallback: any) => {
    const paramsSignUp = getAxiosParam(
      process.env.NEXT_PUBLIC_API_URL + '/register',
      'POST',
      {
        username: values.username,
        password: values.user_password,
        confirmed_password: values.confirm_password,
        user_email: values.user_email,
        user_fullname: values.user_fullname,
      },
      '',
      {
        withCredentials: true,
      }
    );
    try {
      const res = await axios.request(paramsSignUp);
      if (res.status === 201) {
        notifySuccess(`Welcome to the club!`);
        if (fallback) router.push(`/${fallback}`);
        else router.push('/settings/profile');
      }
    } catch (err: any) {
      console.log('err: ', err);
      notifyError(`Sign up failed \n ${err?.response.data.message}`);
    }
  };

  const handleLogout = async () => {
    dispatch(storeUserData(undefined));
    router.push('/login');
    // const paramsLogout = getAxiosParam(
    //   process.env.NEXT_PUBLIC_API_URL + '/logout',
    //   'POST',
    //   {},
    //   '',
    //   {
    //     withCredentials: true,
    //   }
    // );
    // try {
    //   const res = await axios.request(paramsLogout);
    //   if (res.status === 200) {
    //     notifySuccess('Logout success');
    //     router.push('/');
    //   }
    // } catch (err: any) {
    //   notifyError(`Logout failed ${(err?.message).toLowerCase()}`);
    // }
  };

  const handleUpdateProfile = async (values: UpdateUser) => {
    const blob = values.user_avatar as unknown as Blob;
    if (blob) {
      const storageRef = ref(storage, `avatar/${values.username}/${values.user_id}`);
      const uploadTask = uploadBytesResumable(storageRef, blob);
      try {
        await uploadTask;
      }
      catch (err: any) {
        notifyError(`Upload avatar failed ${(err?.message).toLowerCase()}`);
      }
      
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

      if (downloadURL) {
        const paramsUpdateProfile = getAxiosParam(
          process.env.NEXT_PUBLIC_API_URL + `/user/${values.user_id}`,
          'PUT',
          {
            username: values.username,
            user_fullname: values.user_fullname,
            user_email: values.user_email,
            user_avatar: downloadURL,
          },
          '',
          {
            withCredentials: true,
          }
        );

        // uploadTask.on('state_changed',
        //   (snapshot) => {
        //     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //     console.log('Upload is ' + progress + '% done');
        //   },
        //   (error) => {
        //     notifyError(`Upload avatar failed ${(error?.message).toLowerCase()}`);
        //   },
        //   () => {
        //     console.log('Upload avatar success');
        //   }
        // );

        try {
          const res = await axios.request(paramsUpdateProfile);
          if (res.status === 200) {
            const newData = res.data.user;
            const newUser = { ...user, ...newData };
            if (!compareObj(user, newUser)) {
              dispatch(storeUserData(newUser));
              notifySuccess('Update profile success');
              return true;
            } else {
              notifySuccess('Nothing changed');
              return false;
            }
          }
        } catch (err: any) {
          notifyError(`Update profile failed ${(err?.message).toLowerCase()}`);
        }
      }
    }
    return false;
  };

  return (
    <AuthContext.Provider
      value={{ handleLogin, handleSignUp, handleUpdateProfile, user, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

type AuthContextType = {
  user: User;
  handleLogin: (values: any, fallback: any) => void;
  handleSignUp: (values: any, fallback: any) => void;
  handleUpdateProfile: (values: UpdateUser) => Promise<boolean>;
  handleLogout: () => void;
};
