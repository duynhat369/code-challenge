import React from 'react';

interface ExchangeRateDisplayProps {
  fromCurrency: string;
  exchangeRate: number;
  toCurrency: string;
}

const ExchangeRateDisplay: React.FC<ExchangeRateDisplayProps> = ({
  fromCurrency,
  exchangeRate,
  toCurrency,
}) => (
  <div style={{ color: 'black' }}>
    <h5>Exchange Rate</h5>
    <p>{`1 ${fromCurrency} = ${new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(exchangeRate)} ${toCurrency}`}</p>
  </div>
);

export default ExchangeRateDisplay;
