import React, { useState } from 'react';
import './PasscodeModal.css';

interface PasscodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PasscodeModal: React.FC<PasscodeModalProps> = ({ isOpen, onClose }) => {
  const [passcode, setPasscode] = useState<string>('');

  const handlePasscodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasscode(e.target.value);
  };

  const handleSubmit = () => {
    if (passcode === '374') { 
      alert('Access Granted!');
      onClose();
    } else {
      alert('Incorrect Passcode');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <img
          src="/images/passcode_sequence.png"
          alt="Modal Content"
          className="modal-image"
        />
        <input
          type="password"
          placeholder="Enter Passcode"
          value={passcode}
          onChange={handlePasscodeChange}
          className="passcode-input"
        />
        <button onClick={handleSubmit} className="submit-button">Submit</button>
      </div>
    </div>
  );
};

export default PasscodeModal;
