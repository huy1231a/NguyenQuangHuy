import React from 'react'
import Select, { SingleValue, ActionMeta } from 'react-select'
import './style.css'
import { ExchangeRates } from '../../input';
 

interface PullDownComponentProps {
  value: string
  onChange: (
    newValue: SingleValue<{ value: string; label: JSX.Element }>,
    actionMeta: ActionMeta<{ value: string; label: JSX.Element }>
  ) => void
  currencies: string[]
  exchangeRates: ExchangeRates
}

const PullDownComponent: React.FC<PullDownComponentProps> = ({
  value,
  onChange,
  currencies,
  exchangeRates,
}) => {
  const options = currencies.map((currency) => ({
    value: currency,
    label: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {exchangeRates[currency] && (
          <img
            src={exchangeRates[currency].flag}
            alt={`${currency} flag`}
            style={{ width: '20px', marginRight: '5px' }}
          />
        )}
        {currency}
      </div>
    ),
  }))

  const selectedValue = options.find((option) => option.value === value)

  return (
    <Select
      value={selectedValue}
      onChange={onChange}
      options={options}
      formatOptionLabel={(option) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {exchangeRates[option.value] && (
            <img
              src={exchangeRates[option.value].flag}
              alt={`${option.value} flag`}
              style={{ width: '20px', marginRight: '5px' }}
            />
          )}
          {option.value}
        </div>
      )}
    />
  )
}

export default PullDownComponent