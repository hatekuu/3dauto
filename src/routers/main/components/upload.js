import React, { useState } from 'react';

const Upload = (props) => {
  const [file, setFile] = useState(null);
  const [estimatedTime, setEstimatedTime] = useState('');
  const [time,setTime]=useState(0)
  const [bedTemperature, setBedTemperature] = useState(70);
  const [nozzleTemperature, setNozzleTemperature] = useState(210);
  const [fileSize, setFileSize] = useState(0);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileSize(selectedFile.size);
    setFileName(selectedFile.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const fileContent = event.target.result;
      const timeMatch = fileContent.match(/;TIME:(\d+)/);

      if (timeMatch) {
        const timeInSeconds = parseInt(timeMatch[1], 10);
        setEstimatedTime(formatTime(timeInSeconds));
      }
    };
    reader.onerror = () => {
      console.error('Error reading file.');
    };
    if (selectedFile) {
      reader.readAsText(selectedFile);
    }
  };

  const formatTime = (seconds) => {
    setTime(seconds)
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      return `${hours} giờ ${minutes} phút`;
    } else if (minutes > 0) {
      return `${minutes} phút ${remainingSeconds} giây`;
    } else {
      return `${remainingSeconds} giây`;
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const filee = event.target.result;
      const fileContent = filee
        .replace(/M140 S\d+/g, `M140 S${bedTemperature}`)
        .replace(/M104 S\d+/g, `M104 S${nozzleTemperature}`);
const KB=Number((fileSize / 1024).toFixed(2))
      // Gọi hàm props.setData để cập nhật dữ liệu
      const userId=props.id
      props.setData({fileContent, KB, time,userId,fileName});
    };

    reader.readAsText(file);
 
  };

  return (
    <div className="absolute top-0 left-0 m-6 p-6 bg-white rounded-lg shadow-md">
  <input 
    type="file" 
    accept=".gcode" 
    onChange={handleFileChange} 
    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
  />
  {estimatedTime && (
    <p className="mt-2 text-sm text-gray-600">Thời gian ước tính: {estimatedTime}</p>
  )}
  {fileSize > 0 && (
    <p className="mt-2 text-sm text-gray-600">Kích thước file: {(fileSize / 1024).toFixed(2)} KB</p>
  )}
  
  <div className="mt-4">
    <label className="block text-sm font-medium text-gray-700">
      Nhiệt độ bàn in (°C):
      <input 
        type="number" 
        value={bedTemperature} 
        onChange={(e) => setBedTemperature(e.target.value)} 
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </label>
  </div>

  <div className="mt-4">
    <label className="block text-sm font-medium text-gray-700">
      Nhiệt độ đầu đùn (°C):
      <input 
        type="number" 
        value={nozzleTemperature} 
        onChange={(e) => setNozzleTemperature(e.target.value)} 
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </label>
  </div>

  <button 
    onClick={handleUpload} 
    className="mt-6 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  >
    Upload
  </button>
</div>

  );
};

export default Upload;
