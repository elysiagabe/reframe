import React, { useState } from 'react';
// Components
import InitialThought from '../components/newJournalForm/InitialThought';
import TagSelection from '../components/newJournalForm/TagSelection';
import Prompts from '../components/newJournalForm/Prompts';
import UpdatedThought from '../components/newJournalForm/UpdatedThought';
import UpdatedDistress from '../components/newJournalForm/UpdatedDistress';
import Submitted from '../components/newJournalForm/Submitted';

const NewJournalForm = () => {
    const [step, setStep] = useState(1)

    const nextStep = () => {
        setStep(step+1)
    }

    const prevStep = () => {
        setStep(step-1)
    }

    const renderFormStep = () => {
        switch(step) {
            case 1: 
                return (
                    <InitialThought />
                )
            case 2: 
                return (
                    <TagSelection />
                )
            case 3: 
                return (
                    <Prompts />
                ) 
                case 4: 
                    return (
                        <UpdatedThought />
                    )
                case 5: 
                    return (
                        <UpdatedDistress />
                    )
                case 6: 
                    return (
                        <Submitted />
                    )
        }
    }

    return (
        <>
            <h1>Create a new journal entry</h1>
            {renderFormStep()}
            {step < 6 ? <button onClick={nextStep}>Next</button> : null}
            {step !== 1 && step !== 6 ? <button onClick={prevStep}>Previous</button> : null}
        </>
    )
}

export default NewJournalForm;