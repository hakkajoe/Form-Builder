import React, { useState } from 'react';
import Field from './Field';
import FieldOptions from './FieldOptions';

const FormBuilder = () => {
    const [fields, setFields] = useState([]);
    const [formName, setFormName] = useState('');
    const [savedForms, setSavedForms] = useState([]);

    const addField = (type) => {
        setFields([...fields, { 
            id: Date.now(), 
            type, 
            label: '', 
            identifier: false, 
            options: {}, 
            required: false, 
            supervisorCondition: null, 
            jumpCondition: null,
            choices: ['', '', '']
        }]);
    };

    const updateField = (id, updatedField) => {
        setFields(fields.map(field => field.id === id ? updatedField : field));
    };

    const removeField = (id) => {
        setFields(fields.filter(field => field.id !== id));
    };

    const clearFields = () => {
        setFields([]); // Clear all fields from the form
    };

    const saveForm = () => {
        if (formName) {
            const formId = Date.now(); // Unique ID for each form
            setSavedForms([...savedForms, { id: formId, name: formName, fields }]);
            setFormName(''); // Reset the form name
            setFields([]); // Clear the current form
        }
    };

    const loadForm = (form) => {
        setFields(form.fields);
        setFormName(form.name);
    };

    const removeForm = (formId) => {
        setSavedForms(savedForms.filter(form => form.id !== formId));
    };

    const getFieldSpecificLabels = (field) => {
        const baseLabel = field.label || field.type;
        switch (field.type) {
            case 'Yes-No':
                return [`${baseLabel} - Answer option (Yes)`, `${baseLabel} - Answer option (No)`];
            case 'True-False':
                return [`${baseLabel} - Answer option (True)`, `${baseLabel} - Answer option (False)`];
            case 'Multiple Choice Dropdown':
            case 'Multiple Choice Radio Button':
            case 'Checkboxes':
                // Return individual choices with the base label included
                return field.choices.map((choice, index) => `${baseLabel} - Choice ${index + 1}: ${choice}`);
            case 'Signature':
                return [`${baseLabel} - Signature field`];
            case 'File Upload':
                return [`${baseLabel} - Upload button`];
            case 'Slider':
                return [`${baseLabel} - Slider field`];
            case 'Descriptive Text':
                return [`${baseLabel} - Text box`];
            case 'Text Box (Short Text, Number, Date/Time, etc.)':
                return [`${baseLabel} - Short text input`];
            case 'Notes Box (Paragraph Text)':
            case 'Calculated Field':
                return [`${baseLabel} - Text Box`];
            default:
                return [];
        }
    };

    // Include all field-specific labels and default labels for each field, prefixed with the field label or type
    const availableFields = fields.flatMap(field => [
        ...getFieldSpecificLabels(field),
        // Always add these, including for multiple-choice fields
        `${field.label || field.type} - Identifier`,
        `${field.label || field.type} - Required`,
        `${field.label || field.type} - Supervisor Condition`,
        `${field.label || field.type} - Jump Condition`
    ]);

    return (
        <div>
            <h1>Form Builder</h1>
            <input 
                type="text" 
                placeholder="Form Name" 
                value={formName} 
                onChange={(e) => setFormName(e.target.value)} 
            />
            <FieldOptions addField={addField} />
            <div>
                {fields.map((field) => (
                    <Field 
                        key={field.id} 
                        field={field} 
                        updateField={updateField} 
                        removeField={removeField} 
                        availableFields={availableFields}
                        clearFields={clearFields}
                    />
                ))}
            </div>
            <button onClick={saveForm} disabled={!formName || fields.length === 0}>
                Save Form
            </button>
            <h2>Saved Forms</h2>
            <ul>
                {savedForms.map((form) => (
                    <li key={form.id}>
                        <span 
                            onClick={() => loadForm(form)} 
                            style={{ cursor: 'pointer', textDecoration: 'underline', marginRight: '10px' }}
                        >
                            {form.name}
                        </span>
                        <button onClick={() => removeForm(form.id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FormBuilder;
