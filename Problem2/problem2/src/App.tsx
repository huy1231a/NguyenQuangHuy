import React, { useState } from 'react'
import './App.css'
import Input from './input'


function App() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

  const openModal = () => {
    setIsModalOpen(true)
    setTimeout(() => {
      setIsModalVisible(true)
    }, 10)
  }

  const closeModal = () => {
    setIsModalVisible(false)
    setTimeout(() => {
      setIsModalOpen(false)
    }, 300)
  }

  return (
    <div className='App'>
      <div className='box'>
        <h1>Swap Currency</h1>
        <Input />
        <button onClick={openModal}>Confirm</button>
        {isModalOpen && (
          <div className={`modal ${isModalVisible ? 'open' : 'close'}`}>
            <div className='modal_content'>
              <h2>Confirm Swap</h2>
              <p>Are you sure you want to swap the currencies?</p>
              <div className='modal_content_btn'>
                <button onClick={closeModal}>Yes</button>
                <button onClick={closeModal}>No</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App