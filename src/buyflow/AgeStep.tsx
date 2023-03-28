import React, { useState } from 'react'

type AgeStepProps = {
  getStepCallback: (field: string, value: number) => void
}

const AgeStep: React.FC<AgeStepProps> = ({getStepCallback}) => {
  
  // Set the initial state for the age and error variables
  const [age, setAge] = useState(0)
  const [error, setError] = useState('')

  // Define a function to validate the age input
  const validateAge = () => {
    // Check if the input is a valid age (a positive integer between 18 and 130)
    const isValidAge = /^[1-9]\d*$/.test(age.toString()) && age >= 18 && age <= 130
    // Set the error message if the input is invalid
    setError(isValidAge ? '' : 'Please enter a valid age between 18 and 130')
    // Return true if the input is valid, false otherwise
    return isValidAge
  }

  return (
    <>
      <div>
        Age:{' '}
        <input
          type="number"
          onChange={({ target: { value } }) => {
            setAge(Number(value))
          }}
          value={age}
        ></input>
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button onClick={() => validateAge() && getStepCallback('age', age)}>Next</button>
    </>
  )
}

export default AgeStep
