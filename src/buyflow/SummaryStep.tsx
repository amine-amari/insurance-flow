import React from 'react'
import { Link } from 'react-router-dom'
import { Step } from '../App'
import { CollectedData } from './Buyflow'

type SummaryStepProps = {
  collectedData: CollectedData // Collected data object containing data from previous steps
  productId: string // ID of the product being purchased
  steps: Step[] // Array of Step objects defining the flow steps
}

// SummaryStep component displays the data collected in previous steps, allowing users to review before purchase
const SummaryStep: React.FC<SummaryStepProps> = ({collectedData, steps, productId}) => {
  // Filter collectedData to only include data from previous steps defined in the steps array
  const filteredData = Object.entries(collectedData)
    .filter(([key]) => steps.find(step => step.name === key))
    .reduce((obj, [key, value]) => ({...obj, [key]: value}), {}); // Convert filtered key-value pairs back to an object
  
  return (
    <>
      {
        Object.entries(filteredData)
        .map(([key, value]) => (
          <div>{`${key}`}: {`${value}`}</div>
        ))
      }
      <div>
        <Link to={`/purchased=${productId}`}>Purchase</Link>
      </div>
    </>
  )
}

export default SummaryStep
