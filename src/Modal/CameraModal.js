import React from "react";

const CameraModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <p>저장 완료!</p>
        <button
          onClick={onClose}
          className="p-2 mt-4 text-white bg-blue-500 rounded-lg"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default CameraModal;