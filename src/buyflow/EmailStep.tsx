import React, { useState } from 'react'

type EmailStepProps = {
  getStepCallback: (field: string, value: string) => void
}

const EmailStep: React.FC<EmailStepProps> = ({getStepCallback}) => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleNext = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    // validates if the email is not empty and matches a standard email pattern
    if (email.trim() === '') {
        setError('Please fill in field.')
    } else if (!emailRegex.test(email)) {
        setError('Please enter a valid email address.')
    } else {
        // calls the callback function to send the email value to the parent component
        getStepCallback('email', email)
    }
  }

  return (
    <>
      <div>
        Email:{' '}
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button onClick={handleNext}>Next</button>
    </>
  )
}

export default EmailStep
