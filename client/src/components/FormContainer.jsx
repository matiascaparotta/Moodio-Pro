import React from 'react';

function FormContainer({ children }) {
  return (
    <div style={{
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '10px',
      boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
      maxWidth: '400px',
      margin: '40px auto'
    }}>
      {children}
    </div>
  );
}

export default FormContainer;