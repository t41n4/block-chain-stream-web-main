import { ModeToggle } from '../mode-toggle';
import Image from 'next/image';
import Link from 'next/link';

export function Header() {
  return (
    <>
      <header className='flex items-center justify-between p-4'>
        <div className='flex space-x-10 items-center'>
          <div>
            <h1 className='font-bold text-[36px]'>ZiZi TV</h1>
          </div>
          <div>
            <ul className='font-bold flex space-x-8'>
              <li>
                <Link href="/user">User</Link>
              </li>
              <li>
                <Link href="/stream">Stream</Link>
              </li>
              <li>
                <Link href="/site">Site Setting</Link>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <ModeToggle />
        </div>
      </header>
    </>
  );
}
