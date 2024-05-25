import React, { useState, useEffect } from 'react'
import { SingleValue, ActionMeta } from 'react-select'
import './index.css';
import axios from 'axios'
import InputComponents from './components/Input/InputComponent'
import PullDownComponent from './components/PullDown/PullDownComponent'
 
export interface ExchangeRates {
  [key: string]: {
    value: number
    flag: string
  }
}

const Input: React.FC = () => {
  const [amountFrom, setAmountFrom] = useState<number>(0)
  const [amountTo, setAmountTo] = useState<number>(0)
  const [fromCurrency, setFromCurrency] = useState<string>('USD')
  const [toCurrency, setToCurrency] = useState<string>('VND')
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({})

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/exchange_rates'
        )
        const rates = response.data.rates
        setExchangeRates({
          USD: {
            value: rates.usd.value,
            flag: 'https://flagcdn.com/w20/us.png',
          },
          EUR: {
            value: rates.eur.value,
            flag: 'https://flagcdn.com/w20/eu.png',
          },
          GBP: {
            value: rates.gbp.value,
            flag: 'https://flagcdn.com/w20/gb.png',
          },
          VND: {
            value: rates.vnd.value,
            flag: 'https://flagcdn.com/w20/vn.png',
          },
        })
      } catch (error) {
        console.error('Error fetching exchange rates', error)
      }
    }

    fetchRates()
  }, [])

  const recalculateAmounts = (
    newFromCurrency: string,
    newToCurrency: string,
    currentAmountFrom: number
  ) => {
    if (exchangeRates[newFromCurrency] && exchangeRates[newToCurrency]) {
      const vndAmout = currentAmountFrom / exchangeRates[newFromCurrency].value
      const newAmountTo = vndAmout * exchangeRates[newToCurrency].value
      setAmountTo(newAmountTo)
    }
  }

  const handleAmountFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    setAmountFrom(value)
    if (exchangeRates[fromCurrency] && exchangeRates[toCurrency]) {
      const vndAmout = value / exchangeRates[fromCurrency].value
      const result = vndAmout * exchangeRates[toCurrency].value
      setAmountTo(result)
    }
  }

  const handleAmountToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    setAmountTo(value)
    if (exchangeRates[fromCurrency] && exchangeRates[toCurrency]) {
      const vndAmout = value / exchangeRates[toCurrency].value
      const result = vndAmout * exchangeRates[fromCurrency].value
      setAmountFrom(result)
    }
  }

  const handleFromCurrencyChange = (
    newValue: SingleValue<{ value: string; label: JSX.Element }>,
    actionMeta: ActionMeta<{ value: string; label: JSX.Element }>
  ) => {
    if (newValue) {
      const newCurrency = newValue.value
      setFromCurrency(newCurrency)
      recalculateAmounts(newCurrency, toCurrency, Number(amountFrom))
    }
  }

  const handleToCurrencyChange = (
    newValue: SingleValue<{ value: string; label: JSX.Element }>,
    actionMeta: ActionMeta<{ value: string; label: JSX.Element }>
  ) => {
    if (newValue) {
      const newCurrency = newValue.value
      setToCurrency(newCurrency)
      recalculateAmounts(fromCurrency, newCurrency, Number(amountFrom))
    }
  }

  const swapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
    setAmountFrom(amountTo)
    setAmountTo(amountFrom)
  }

  const currencies = ['USD', 'EUR', 'GBP', 'VND']  

  return (
    <>
      <div className='input_layout'>
        <InputComponents
          title='Amout to send'
          amount={amountFrom}
          handleAmount={handleAmountFromChange}
        />
        <PullDownComponent
          value={fromCurrency}
          onChange={handleFromCurrencyChange}
          currencies={currencies}
          exchangeRates={exchangeRates}
        />
      </div>
      <button onClick={swapCurrencies} className='btn_swap'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='size-6'
          style={{ color: 'black' }}>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5'
          />
        </svg>
      </button>
      <div className='input_layout'>
        <InputComponents
          title='Amount to receive'
          amount={amountTo}
          handleAmount={handleAmountToChange}
        />
        <PullDownComponent
          value={toCurrency}
          onChange={handleToCurrencyChange}
          currencies={currencies}
          exchangeRates={exchangeRates}
        />
      </div>
    </>
  )
}

export default Input