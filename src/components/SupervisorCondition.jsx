import React, { useState } from 'react';

const SupervisorCondition = ({
    condition,
    setCondition,
    availableFields,
    initialConditions,
    selectedType,
    setSelectedType,
    isEnabled // Receive the isEnabled prop
}) => {
    const [selectedConditions, setSelectedConditions] = useState(initialConditions || []);

    const handleConditionToggle = (condition) => {
        const newConditions = selectedConditions.includes(condition)
            ? selectedConditions.filter(cond => cond !== condition)
            : [...selectedConditions, condition];
        setSelectedConditions(newConditions);
        setCondition(newConditions);
    };

    return (
        <div className="condition-section">
            {isEnabled && (
                <>
                    <div className="condition-menu">
                        <div className="available-conditions">
                            <h6>Show the field to supervisor ONLY if...</h6>
                            {availableFields.map((field, index) => (
                                <div
                                    key={index}
                                    className={`field-choice ${selectedConditions.includes(field) ? 'selected' : ''}`}
                                    onClick={() => handleConditionToggle(field)}
                                >
                                    {field}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="condition-radios">
                        <label>
                            <input
                                type="radio"
                                name="supervisorCondition"
                                value="all"
                                checked={selectedType === 'all'}
                                onChange={() => setSelectedType('all')}
                            />
                            ALL selected are true
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="supervisorCondition"
                                value="any"
                                checked={selectedType === 'any'}
                                onChange={() => setSelectedType('any')}
                            />
                            ANY selected are true
                        </label>
                    </div>
                </>
            )}
        </div>
    );
};

export default SupervisorCondition;
