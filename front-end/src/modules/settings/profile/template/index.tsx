'use client';
import UserSideBar from '@modules/settings/profile/side-bar';
import clsx from 'clsx';
import { useAuth } from 'context/auth-context';
import ProfileUpdate from '../profile-update/index';


const ProfilePageTemplate = () => {
    const { user } = useAuth();
    return (
        <main className='profile__page flex container center-item min-h-screen w-full'>
            <video src="https://firebasestorage.googleapis.com/v0/b/streamweb-9675d.appspot.com/o/gradient%2Fshadergradient6.webm?alt=media&token=3e89dcd2-c3f6-4e5e-af6d-651145896f4a" autoPlay loop muted className='absolute top-0 left-0 w-full h-full object-cover z-[-1]' />
            {
                user.user_id && (
                    <div className='basis-1/4 h-screen'>
                        <UserSideBar />
                    </div>
                )
            }
            <div className={clsx('h-full center-item', { "basis-3/4 ": user.user_id })}>
                <ProfileUpdate />
            </div>
        </main >
    );
}


export default ProfilePageTemplate;
