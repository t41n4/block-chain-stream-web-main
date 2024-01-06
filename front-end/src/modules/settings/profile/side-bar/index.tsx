import { buttons } from '@lib/constant/profile-side-bar-buttons';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

type Props = {} & React.HTMLAttributes<HTMLDivElement>;

const UserSideBar: React.FC<Props> = ({ className, ...props }: Props) => {

  return (

    <section className={clsx("hidden md:flex flex-col w-64 bg-gray-800  h-full", className)}>
      <div className="flex items-center justify-center h-16 bg-gray-900">
        <span className="text-white font-bold uppercase">Accout Center</span>
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto">
        <nav className="flex-1 px-2 py-4 bg-gray-800">
          {
            buttons.map((button, index) => (
              <Link key={index} href="#" className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700">
                <button.icon className="w-6 h-6 mr-3" />
                {button.text}
              </Link>
            ))
          }
        </nav>
      </div>
    </section>

  );
};

export default UserSideBar;

