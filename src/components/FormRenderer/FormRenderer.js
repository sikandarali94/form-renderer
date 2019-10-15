import React, { useState } from 'react';

const getInitialFormState = fields => {
    const initialFormState = {};

    const initialInputFieldState = isRequired => ({
        isValid: false,
        value: '',
        isTouched: false,
        isRequired: isRequired
    });

    fields.forEach(field => {
        initialFormState[field.name] = initialInputFieldState(field.required);

        if (field.dependents) {
            const inputDependents = field.dependents;
            initialFormState[field.name].showDependents = false;
            initialFormState[field.name].dependents = [];

            inputDependents.forEach(inputDependent => {
                initialFormState[field.name].dependents.push(initialInputFieldState(inputDependent.required));
            })
        }
    });

    return initialFormState;
};

const handleSubmit = () => {};

const renderInputFields = fields => {};

const FormRenderer = ({ formSchema }) => {
    const formFields = formSchema.fields;

    const [form, setForm] = useState(getInitialFormState(formFields));

    return (
        <form onSubmit={handleSubmit}>
            {renderInputFields(formFields)}
        </form>
    );
};

export default FormRenderer;