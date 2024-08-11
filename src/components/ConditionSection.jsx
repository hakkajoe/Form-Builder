// ConditionSection.jsx
import React, { useState } from 'react';

const ConditionSection = ({
    title,
    availableConditions = [], // Default to empty array if not provided
    setConditions,
    initialConditions = [], // Default to empty array if not provided
    selectedType,
    setSelectedType,
}) => {
    const [currentConditions, setCurrentConditions] = useState(initialConditions);

    const handleConditionToggle = (condition) => {
        const newConditions = currentConditions.includes(condition)
            ? currentConditions.filter(cond => cond !== condition)
            : [...currentConditions, condition];
        setCurrentConditions(newConditions);
        setConditions(newConditions);
    };

    return (
        <div className="condition-section">
            <h3>{title}</h3>
            <div className="condition-header">
                <h4>Field choices from other fields</h4>
                <h4>Show the field ONLY if...</h4>
            </div>
            <div className="condition-menu">
                <div className="available-conditions">
                    {availableConditions.map((condition, index) => (
                        <div
                            key={index}
                            className={`field-choice ${currentConditions.includes(condition) ? 'selected' : ''}`}
                            onClick={() => handleConditionToggle(condition)}
                        >
                            {condition}
                        </div>
                    ))}
                </div>
            </div>
            <div className="condition-radios">
                <label>
                    <input
                        type="radio"
                        checked={selectedType === 'all'}
                        onChange={() => setSelectedType('all')}
                    />
                    ALL selected are true
                </label>
                <label>
                    <input
                        type="radio"
                        checked={selectedType === 'any'}
                        onChange={() => setSelectedType('any')}
                    />
                    ANY selected are true
                </label>
            </div>
        </div>
    );
};

export default ConditionSection;
