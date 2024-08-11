import React, { useState } from 'react';

const FieldOptions = ({ addField }) => {
    const [selectedField, setSelectedField] = useState('');

    const fieldTypes = [
        'Text Box (Short Text, Number, Date/Time, etc.)', 'Notes Box (Paragraph Text)', 'Calculated Field', 'Multiple Choice Dropdown',
        'Multiple Choice Radio Button', 'Checkboxes', 'Yes-No', 'True-False', 'Signature',
        'File Upload', 'Slider', 'Descriptive Text', 'Begin New Section'
    ];

    const handleAddField = () => {
        if (selectedField) {
            addField(selectedField);
            setSelectedField(''); // Reset the dropdown after adding a field
        }
    };

    return (
        <div>
            <h3>Add Field</h3>
            <select value={selectedField} onChange={(e) => setSelectedField(e.target.value)}>
                <option value="" disabled>Select a field type</option>
                {fieldTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                ))}
            </select>
            <button onClick={handleAddField} disabled={!selectedField}>Add Field</button>
        </div>
    );
};

export default FieldOptions;
