import { User } from '@/redux/usersSlice';

import React from 'react';

interface Props {
  user: User | null;
}

const UserGreeting: React.FC<Props> = ({ user }) => {
  if (!user) return null;

  return (
    <h1 className='flex flex-col items-center text-2xl font-semibold m-5'>
      {user.email}
    </h1>
  );
};

export default UserGreeting;
