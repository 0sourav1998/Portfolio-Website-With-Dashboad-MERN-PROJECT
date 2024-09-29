import React from 'react'
import { useSelector } from 'react-redux'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

const Profile = () => {
  const { user } = useSelector((state) => state.admin)
  return (
    <div className='w-full mx-auto sm:p-8 p-3 bg-gray-100 rounded-lg shadow-xl'>
      <h1 className='sm:text-3xl sm:font-bold sm:mb-4 text-lg font-semibold mb-2'>Profile Overview</h1>
      <h2 className='sm:text-xl text-xs font-semibold text-gray-700 sm:mb-6 mb-3'>{user?.fullName}</h2>
      <div className='flex flex-wrap gap-8 mt-6'>
        <div className='flex flex-col items-center'>
          <Label className='sm:text-lg text-sm mb-2'>Profile Photo</Label>
          <div className='sm:h-64 sm:w-64 h-24 w-24 rounded-lg overflow-hidden shadow-md border border-gray-300'>
            <img src={user?.image} alt="Profile" className='object-cover sm:h-full sm:w-full h-24 w-24' />
          </div>
        </div>
        <div className='flex flex-col items-center'>
          <Label className='sm:text-lg text-sm mb-2'>Resume</Label>
          <div className='sm:h-64 sm:w-64 h-24 w-24 rounded-lg overflow-hidden shadow-md border border-gray-300'>
            <img src={user?.resume} alt="Resume" className='object-cover sm:h-full sm:w-full h-24 w-24' />
          </div>
        </div>
      </div>
      <div className='sm:mt-12 mt-6'>
        <Label className='sm:text-lg text-sm mb-2'>Full Name</Label>
        <Input
          defaultValue={user?.fullName}
          disabled
          className='w-full py-3 px-4 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-600'
        />
      </div>
      <div className='sm:mt-12 mt-6'>
        <Label className='sm:text-lg text-sm mb-2'>Email</Label>
        <Input
          defaultValue={user?.email}
          disabled
          className='w-full py-3 px-4 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-600'
        />
      </div>
      <div className='sm:mt-12 mt-6'>
        <Label className='sm:text-lg text-sm mb-2'>Phone</Label>
        <Input
          defaultValue={user?.phone}
          disabled
          className='w-full py-3 px-4 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-600'
        />
      </div>
      <div className='sm:mt-12 mt-6'>
        <Label className='sm:text-lg text-sm mb-2'>About Me</Label>
        <Textarea
          defaultValue={user?.aboutMe}
          disabled
          className='w-full py-3 px-4 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-600'
        />
      </div>
      <div className='sm:mt-12 mt-6'>
        <Label className='sm:text-lg text-sm mb-2'>Portfolio</Label>
        <Input
          defaultValue={user?.portfolio}
          disabled
          className='w-full py-3 px-4 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-600'
        />
      </div>
      <div className='sm:mt-12 mt-6'>
        <Label className='sm:text-lg text-sm mb-2'>Github URL</Label>
        <Input
          defaultValue={user?.githubUrl}
          disabled
          className='w-full py-3 px-4 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-600'
        />
      </div>
      <div className='sm:mt-12 mt-6'>
        <Label className='sm:text-lg text-sm mb-2'>Linkedin Url</Label>
        <Input
          defaultValue={user?.linkedinUrl}
          disabled
          className='w-full py-3 px-4 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-600'
        />
      </div>
      <div className='sm:mt-12 mt-6'>
        <Label className='sm:text-lg text-sm mb-2'>Instagram Url</Label>
        <Input
          defaultValue={user?.instagramURl}
          disabled
          className='w-full py-3 px-4 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-600'
        />
      </div>
      <div className='sm:mt-12 mt-6'>
        <Label className='sm:text-lg text-sm mb-2'>Facebook Url</Label>
        <Input
          defaultValue={user?.facebookUrl}
          disabled
          className='w-full py-3 px-4 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-600'
        />
      </div>
      <div className='sm:mt-12 mt-6'>
        <Label className='sm:text-lg text-sm mb-2'>Twitter Url</Label>
        <Input
          defaultValue={user?.twitterUrl}
          disabled
          className='w-full py-3 px-4 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-600'
        />
      </div>
    </div>
  )
}

export default Profile
