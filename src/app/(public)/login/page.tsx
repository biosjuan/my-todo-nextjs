'use client';
import { RootState } from '@/redux/store';
import { User, userLogin } from '@/redux/usersSlice';
import { Button, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Dispatch, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Login() {
  const router = useRouter();
  const dispatch: Dispatch<any> = useDispatch();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const isLogginButtonDisabled = () => {
    return !user.password || !user.email;
  };

  const onLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(userLogin(user));
  };

  const { currentUser }: { currentUser: User | null } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    if (currentUser) {
      router.push('/');
    }
  }, [currentUser, router]);

  return (
    <div className='bg-primary flex flex-col justify-center items-center h-screen lg:p-0 p-5'>
      <form
        onSubmit={onLogin}
        className='flex flex-col gap-5  bg-white p-5 lg:w-[700px] w=[380px] text-gray-600'
      >
        <h1 className='text-2xl font-bold uppercase'>
          <span className='text-primary'>Login</span>
        </h1>
        <hr />

        <div className='flex flex-col'>
          <TextField
            type='email'
            name='email'
            label='Email'
            variant='outlined'
            fullWidth
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
        </div>
        <div className='flex flex-col'>
          <TextField
            type='password'
            name='password'
            label='Password'
            variant='outlined'
            fullWidth
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
          />
        </div>
        <Button
          type='submit'
          variant='contained'
          color='primary'
          disabled={isLogginButtonDisabled()}
          fullWidth
        >
          Login
        </Button>
      </form>
    </div>
  );
}

export default Login;
