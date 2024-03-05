import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useAction, getUserFiles, deleteFile } from 'wasp/client/operations';

const FileManagementPage = () => {
  const { data: files, isLoading, error } = useQuery(getUserFiles);
  const deleteFileFn = useAction(deleteFile);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      {files.map((file) => (
        <div key={file.id} className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'>
          <div>{file.name} - {file.type} - {file.size}MB - {new Date(file.uploadedAt).toDateString()}</div>
          <button
            onClick={() => deleteFileFn({ fileId: file.id })}
            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default FileManagementPage;