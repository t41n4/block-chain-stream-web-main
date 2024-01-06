'use client';

import { API_URL } from '@lib/helpers/env-provider';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

type Props = {
  fontSize?: string;
};

const Banner = (props: Props) => {
  const [title, setTitle] = useState<any>('');
  useEffect(() => {
    axios({
      url: `${API_URL}/settings/title`,
    }).then((res) => setTitle(res.data.title));
  });

  const { fontSize } = props;
  return (
    <Link
      href={'/'}
      className='flex flex-row w-fit h-fit items-center justify-start text-base md:text-banner px-4'>
      <div className={`relative font-black whitespace-nowrap ${fontSize}`}>
        {title}
      </div>
    </Link>
  );
};

export default Banner;
