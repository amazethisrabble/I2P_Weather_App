import React, { useState } from 'react';

interface AddressInputProps {
  onAddress: (address: string) => void;
}

const AddressInput: React.FC<AddressInputProps> = ({ onAddress }) => {
  const [address, setAddress] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onAddress(address);
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter address"
        />
        <button type="submit">Get Weather</button>
      </form>
    </div>
  );
};

export default AddressInput;
