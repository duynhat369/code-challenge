import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import AmountInput from './components/AmountInput';
import AmountToReceiveInput from './components/AmountToReceiveInput';
import CurrencySelect from './components/CurrencySelect';
import ExchangeRateDisplay from './components/ExchangeRateDisplay';

const currencyOptions = [
  { code: 'USD', label: 'US Dollar' },
  { code: 'EUR', label: 'Euro' },
  { code: 'GBP', label: 'British Pound' },
  { code: 'JPY', label: 'Japanese Yen' },
  { code: 'VND', label: 'Vietnamese Dong' },
  //more
];

function App() {
  const [amountToSend, setAmountToSend] = useState('');
  const [amountToReceive, setAmountToReceive] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await axios.get(
          `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
        );
        setExchangeRate(response.data.rates[toCurrency]);
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
      }
    };

    fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    if (parseFloat(value) < 0) return;
    setAmountToSend(value);
    setAmountToReceive('');
  };

  const handleOutputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    if (parseFloat(value) < 0) return;
    setAmountToReceive(value);
    setAmountToSend('');
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>, type: 'from' | 'to') => {
    if (type === 'from') {
      setFromCurrency(e.target.value);
    } else {
      setToCurrency(e.target.value);
    }
  };

  const handleConfirmSwap = () => {
    if (!amountToSend && !amountToReceive) return;

    const sendValue = parseFloat(amountToSend);
    const receiveValue = parseFloat(amountToReceive);

    if (!isNaN(sendValue)) {
      setAmountToReceive((sendValue * exchangeRate).toFixed(2));
    } else if (!isNaN(receiveValue)) {
      setAmountToSend((receiveValue / exchangeRate).toFixed(2));
    }

    setShowResult(true);
  };

  return (
    <div className="app-container">
      <form onSubmit={(e) => e.preventDefault()} className="form">
        <h5>Swap</h5>
        <div className="input-group">
          <div className="input-container">
            <AmountInput amount={amountToSend} onChange={handleAmountChange} />
          </div>
          <CurrencySelect
            value={fromCurrency}
            onChange={(e) => handleCurrencyChange(e, 'from')}
            options={currencyOptions}
          />
        </div>

        <div className="input-group">
          <div className="input-container">
            <AmountToReceiveInput amount={amountToReceive} onChange={handleOutputChange} />
          </div>
          <CurrencySelect
            value={toCurrency}
            onChange={(e) => handleCurrencyChange(e, 'to')}
            options={currencyOptions}
          />
        </div>

        <button type="button" onClick={handleConfirmSwap}>
          CONFIRM SWAP
        </button>
      </form>

      <div className={`exchange-rate-container ${showResult ? ' slide-in' : ''}`}>
        <ExchangeRateDisplay
          fromCurrency={fromCurrency}
          exchangeRate={exchangeRate}
          toCurrency={toCurrency}
        />
      </div>
    </div>
  );
}

export default App;
