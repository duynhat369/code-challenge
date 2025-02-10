import React from 'react';

interface AmountToReceiveInputProps {
  amount: string; // Sử dụng string để phù hợp với state
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AmountToReceiveInput: React.FC<AmountToReceiveInputProps> = ({ amount, onChange }) => (
  <>
    <label htmlFor="output-amount">Amount to receive</label>
    <input id="output-amount" type="text" value={amount} onChange={onChange} />
  </>
);

export default AmountToReceiveInput;
