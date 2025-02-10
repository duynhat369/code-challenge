import React from 'react';

interface AmountInputProps {
  amount: string; // Đổi thành string để phù hợp với tempAmountToSend
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AmountInput: React.FC<AmountInputProps> = ({ amount, onChange }) => (
  <>
    <label htmlFor="input-amount">Amount to send</label>
    <input id="input-amount" type="text" value={amount} onChange={onChange} />
  </>
);

export default AmountInput;
