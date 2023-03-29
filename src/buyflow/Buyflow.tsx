import React, { useState } from 'react'
import { Step } from '../App'
import AgeStep from './AgeStep'
import EmailStep from './EmailStep'
import FullNameStep from './FullNameStep'
import SummaryStep from './SummaryStep'

type BuyflowProps = {
  productId: string;
  productName: string;
  steps: Step[];
};

// CollectedData type that defines the object for holding collected data
export type CollectedData = {
  email: string
  age: number
  fullName: string
}

// Buyflow component that renders the steps of a product purchase flow
const Buyflow: React.FC<BuyflowProps> = ({productId, productName, steps}) => {
  const [currentStep, setCurrentStep] = useState(steps[0].name) // state for the current step
  const [collectedData, setCollectedData] = useState({ // state for collected data
    email: '',
    age: 0,
    fullName: ''
  })
  const [stepIndex, setStepIndex] = useState(0); // state for the current step index

  // function to handle the callback from a step component
  const getStepCallback = (nextStep: string) => (field: string, value: any) => {
    setCollectedData({ ...collectedData, [field]: value }) // update collected data object with new field-value pair
    setCurrentStep(nextStep) // move to next step
    setStepIndex((prevStepIndex) => (prevStepIndex + 1)) // increment step index
  }

  // getProductIds function maps productId to a specific string based on a switch statement
  const getProductIds = (productId: string) => {
    switch(productId) {
      case 'devIns':
        return 'dev_ins'
      case 'desIns':
        return 'des_ins'
      default:
        return 'unkown_product_id'
    }
  }

  // getStepComponents function returns the correct step component based on the currentStep variable
  const getStepComponents = (currentStep: string) => {
    switch (currentStep) {
      case 'email':
        return <EmailStep getStepCallback={getStepCallback(steps[stepIndex + 1].name)} />;
      case 'fullName':
        return <FullNameStep getStepCallback={getStepCallback(steps[stepIndex + 1].name)} />;
      case 'age':
        return <AgeStep getStepCallback={getStepCallback(steps[stepIndex + 1].name)} />;
      case 'summary':
        return <SummaryStep collectedData={collectedData} steps={steps} productId={getProductIds(productId)} />;
      default:
        return <p>FlowComponent for {currentStep} is not defined</p>;
    }
  }; 

  return (
    <>
      <h4>Buying {productName}</h4>
      {
        getStepComponents(currentStep)
      }

    </>
  )
}

export default Buyflow
