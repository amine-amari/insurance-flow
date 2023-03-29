import React, { useState } from 'react'

type FullNameStepProps = {
  getStepCallback: (field: string, value: string) => void
}

const FullNameStep: React.FC<FullNameStepProps> = ({getStepCallback}) => {
  
  // Define three states for the first name, last name, and error message
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [error, setError] = useState('')
  
  // Define a function to execute when the "Next" button is clicked
  const handleNext = () => {
    // Check if both first name and last name fields are filled
    if (firstName.trim() === '' || lastName.trim() === '') {
        // If not, set an error message
        setError('Please fill in both fields.')
    } else {
        // Otherwise, call the function passed down from the parent component with the full name as the value
        getStepCallback('fullName', `${firstName} ${lastName}`)
    }
  }

  return (
    <>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button onClick={handleNext}>Next</button>
    </>
  )
}

export default FullNameStep