import React from 'react';

function InputField({ label, type, name, value, onChange }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '6px',
          border: '1px solid #ccc'
        }}
      />
    </div>
  );
}

export default InputField;