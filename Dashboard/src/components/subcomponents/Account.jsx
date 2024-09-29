import React, { useState } from 'react';
import Profile from './Profile';
import UpdateProfile from './UpdateProfile';
import UpdatePassword from './UpdatePassword';

const Account = () => {
  const [active, setActive] = useState('Profile');

  const tabClasses = (tab) => 
    `text-lg cursor-pointer px-4 py-2 rounded-lg transition-all duration-200 
    ${active === tab ? 'bg-blue-500 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100 hover:text-black'}`;

  return (
    <div className='sm:mt-6 mt-1 flex sm:flex-row flex-col h-auto sm:gap-8 gap-3'>
      <div className='flex flex-col gap-4 sm:w-[20%] w-fit bg-white shadow-lg p-6 rounded-md'>
        <h1 className='font-bold sm:text-2xl text-xl text-gray-800 mb-4 text-center'>Settings</h1>
        <hr className='mb-4'/>
        <p onClick={() => setActive('Profile')} className={tabClasses('Profile')}>
          Profile Overview
        </p>
        <p onClick={() => setActive('UpdateProfile')} className={tabClasses('UpdateProfile')}>
          Update Profile
        </p>
        <p onClick={() => setActive('UpdatePassword')} className={tabClasses('UpdatePassword')}>
          Update Password
        </p>
      </div>

      <div className='sm:w-[75%] w-full bg-white shadow-lg sm:p-8 p-4 rounded-md'>
        {active === 'Profile' && <Profile />}
        {active === 'UpdateProfile' && <UpdateProfile />}
        {active === 'UpdatePassword' && <UpdatePassword />}
      </div>
    </div>
  );
};

export default Account;
