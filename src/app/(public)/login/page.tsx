'use client';
import { RootState } from '@/redux/store';
import { User, userLogin } from '@/redux/usersSlice';
import { useRouter } from 'next/navigation';
import { Dispatch, useEffect, useState } from 'react';
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

  const onLogin = () => {
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
      <div className='flex flex-col gap-5  bg-white p-5 lg:w-[500px] w=[380px] text-gray-600'>
        <h1 className='text-2xl font-bold uppercase'>
          <span className='text-primary'>Login</span>
        </h1>
        <hr />

        <div className='flex flex-col'>
          <label htmlFor='email' className='text-sm'>
            Email
          </label>
          <input
            type='text'
            name='email'
            id='email'
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            value={user.email}
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='password' className='text-sm'>
            Password
          </label>
          <input
            type='text'
            name='password'
            id='password'
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            value={user.password}
          />
        </div>
        <button
          className={isLogginButtonDisabled() ? 'btn-disabled' : 'btn-primary'}
          disabled={isLogginButtonDisabled()}
          onClick={() => onLogin()}
        >
          LOGIN
        </button>
      </div>
    </div>
  );
}

export default Login;
