import React from 'react';

function PrimaryButton({ children, ...props }) {
  return (
    <button 
      {...props}
      style={{
        backgroundColor: '#4F46E5',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 500
      }}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;