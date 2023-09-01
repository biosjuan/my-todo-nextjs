import { User } from '@/redux/usersSlice';
import Typography from '@mui/material/Typography';

import React from 'react';

interface Props {
  user: User | null;
}

const UserGreeting: React.FC<Props> = ({ user }) => {
  if (!user) return null;

  return (
    <div className='flex flex-col items-center'>
      <h1 className=' text-2xl font-semibold m-5'>{user.email}</h1>
      <Typography variant='h2' color='text.secondary'>
        Hello Material
      </Typography>
    </div>
  );
};

export default UserGreeting;
