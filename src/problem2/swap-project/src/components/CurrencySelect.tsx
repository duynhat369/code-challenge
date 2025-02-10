import React from 'react';

interface CurrencySelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { code: string; label: string }[];
}

const CurrencySelect: React.FC<CurrencySelectProps> = ({ value, onChange, options }) => (
  <select value={value} onChange={onChange}>
    {options.map((option) => (
      <option key={option.code} value={option.code}>
        {option.label}
      </option>
    ))}
  </select>
);

export default CurrencySelect;
