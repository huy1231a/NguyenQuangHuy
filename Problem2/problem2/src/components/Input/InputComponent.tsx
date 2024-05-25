import React from 'react'
import './style.css'

interface InputComponentsProps {
  title: string
  amount: any
  handleAmount: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const InputComponents: React.FC<InputComponentsProps> = ({
  amount,
  handleAmount,
  title,
}) => {
  return (
    <div className='form'>
      <div className='form_input'>
        <div className='form_input_right'>
          <span>{title}</span>
          <input
            type='number'
            min={'0'}
            placeholder='0,00'
            id='input'
            value={amount}
            onChange={handleAmount}
          />
        </div>
      </div>
    </div>
  )
}

export default InputComponents