import React, { useState } from 'react';
import { useAction, uploadFile } from 'wasp/client/operations';

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const uploadFileFn = useAction(uploadFile);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', file);
    uploadFileFn({ file: formData });
  };

  return (
    <div className='p-4'>
      <input type='file' onChange={handleFileChange} />
      <button onClick={handleUpload} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
        Upload
      </button>
    </div>
  );
}

export default UploadPage;