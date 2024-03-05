import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useAction, getUserFiles, deleteFile } from 'wasp/client/operations';

const DashboardPage = () => {
  const { data: files, isLoading, error } = useQuery(getUserFiles);
  const deleteFileFn = useAction(deleteFile);

  if (isLoading) return 'Loading...';
  if (error) return `Error: ${error}`;

  const handleDeleteFile = (fileId) => {
    deleteFileFn({ fileId });
  };

  return (
    <div className='p-4'>
      {files.map((file) => (
        <div key={file.id} className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'>
          <div>{file.name}</div>
          <div>{file.type} - {file.size} MB</div>
          <div>Uploaded on {new Date(file.uploadedAt).toLocaleString()}</div>
          <button
            onClick={() => handleDeleteFile(file.id)}
            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
          >
            Delete
          </button>
          <Link
            to={`/file/${file.id}`}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2'
          >
            Details
          </Link>
        </div>
      ))}
    </div>
  );
}

export default DashboardPage;