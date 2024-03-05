import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, getUserFiles } from 'wasp/client/operations';

const HomePage = () => {
  const { data: userFiles, isLoading, error } = useQuery(getUserFiles);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      <h1 className='text-3xl font-bold mb-4'>Welcome to QuickHost!</h1>
      <p className='text-lg mb-4'>Please log in or sign up to start hosting your files.</p>
      <input type='text' placeholder='Search files...' className='px-2 py-1 border rounded mr-2' />
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Search</button>
      <div className='mt-4'>
        {userFiles.map((file) => (
          <div key={file.id} className='bg-gray-100 p-4 mb-4 rounded-lg'>
            <div>{file.name}</div>
            <div>{file.type}</div>
            <div>{file.size} KB</div>
            <div>{new Date(file.uploadedAt).toLocaleString()}</div>
            <Link to={`/file/${file.id}`} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2'>Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;