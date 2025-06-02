import React from 'react';
import './loadingSpinner.css'; // 스타일 파일 따로 분리

const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <div className="loading-spinner" />
    </div>
  );
};

export default LoadingSpinner;
