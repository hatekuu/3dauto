import React from 'react'

const fileList = (props) => {
    const formatTime = (seconds) => {
        if (seconds < 0) {
            return "Đang chờ được xử lý"; // Display message for negative waiting time
        }
        
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.ceil(seconds % 60);
    
        return `${hours} giờ ${minutes} phút ${secs} giây`;
    };
  return (
    <div className="fixed top-4 right-2/4 space-y-4">
    {props.fileData?.fileList.map((file) => (
        <div key={file.fileid} className="p-4 border rounded-lg shadow-md bg-white">
            <p className="font-semibold text-lg">Tên file: <span className="font-normal">{file.fileName}</span></p>
            <p className="text-gray-600">Thời gian chờ dự kiến: <span className="font-normal">{formatTime(file.waitingTime)}</span></p>
            <p className="text-gray-600">
                Số thứ tự: <span className="font-normal">{file.index === 0 ? 'Đang in' : file.index}</span>
            </p>
        </div>
    ))}
</div>


  )
}

export default fileList