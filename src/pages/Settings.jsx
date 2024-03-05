import React, { useState } from 'react';
import { useQuery, useAction, getUserDetails, updateProfile } from 'wasp/client/operations';
import { Link } from 'react-router-dom';

const SettingsPage = () => {
  const { data: userDetails, isLoading, error } = useQuery(getUserDetails);
  const updateProfileFn = useAction(updateProfile);
  const [formData, setFormData] = useState({ email: '', password: '' });

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleSubmit = () => {
    updateProfileFn(formData);
  };

  return (
    <div className='p-4'>
      <h1 className='text-xl font-bold mb-4'>Account Settings</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-y-4'>
        <input
          type='email'
          placeholder='Email'
          className='px-2 py-1 border rounded'
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type='password'
          placeholder='Password'
          className='px-2 py-1 border rounded'
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default SettingsPage;