import React from 'react'
import { useSelector } from 'react-redux'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

const Profile = () => {
  const { user } = useSelector((state) => state.admin)
  return (
    <div className='w-full p-8 bg-gray-100 rounded-lg shadow-xl'>
      <h1 className='text-3xl font-bold mb-4'>Profile Overview</h1>
      <h2 className='text-xl font-semibold text-gray-700 mb-6'>{user?.fullName}</h2>
      <div className='flex flex-wrap gap-8 mt-6'>
        <div className='flex flex-col items-center'>
          <Label className='text-lg mb-2'>Profile Photo</Label>
          <div className='h-64 w-64 rounded-full overflow-hidden shadow-md'>
            <img src={user?.image} alt="Profile" className='object-cover h-full w-full' />
          </div>
        </div>
        <div className='flex flex-col items-center'>
          <Label className='text-lg mb-2'>Resume</Label>
          <div className='h-64 w-64 rounded-lg overflow-hidden shadow-md border border-gray-300'>
            <img src={user?.resume} alt="Resume" className='object-cover h-full w-full' />
          </div>
        </div>
      </div>
      <div className='mt-12'>
        <Label className='text-lg mb-2'>Full Name</Label>
        <Input
          defaultValue={user?.fullName}
          disabled
          className='w-full py-3 px-4 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-600'
        />
      </div>
      <div className='mt-12'>
        <Label className='text-lg mb-2'>Email</Label>
        <Input
          defaultValue={user?.email}
          disabled
          className='w-full py-3 px-4 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-600'
        />
      </div>
      <div className='mt-12'>
        <Label className='text-lg mb-2'>Phone</Label>
        <Input
          defaultValue={user?.phone}
          disabled
          className='w-full py-3 px-4 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-600'
        />
      </div>
      <div className='mt-12'>
        <Label className='text-lg mb-2'>About Me</Label>
        <Textarea
          defaultValue={user?.aboutMe}
          disabled
          className='w-full py-3 px-4 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-600'
        />
      </div>
      <div className='mt-12'>
        <Label className='text-lg mb-2'>Portfolio</Label>
        <Input
          defaultValue={user?.portfolio}
          disabled
          className='w-full py-3 px-4 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-600'
        />
      </div>
      <div className='mt-12'>
        <Label className='text-lg mb-2'>Github URL</Label>
        <Input
          defaultValue={user?.githubUrl}
          disabled
          className='w-full py-3 px-4 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-600'
        />
      </div>
      <div className='mt-12'>
        <Label className='text-lg mb-2'>Linkedin Url</Label>
        <Input
          defaultValue={user?.linkedinUrl}
          disabled
          className='w-full py-3 px-4 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-600'
        />
      </div>
      <div className='mt-12'>
        <Label className='text-lg mb-2'>Instagram Url</Label>
        <Input
          defaultValue={user?.instagramURl}
          disabled
          className='w-full py-3 px-4 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-600'
        />
      </div>
      <div className='mt-12'>
        <Label className='text-lg mb-2'>Facebook Url</Label>
        <Input
          defaultValue={user?.facebookUrl}
          disabled
          className='w-full py-3 px-4 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-600'
        />
      </div>
      <div className='mt-12'>
        <Label className='text-lg mb-2'>Twitter Url</Label>
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
