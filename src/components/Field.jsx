import React, { useState, useEffect } from 'react';
import JumpCondition from './JumpCondition';
import SupervisorCondition from './SupervisorCondition';

const Field = ({ field, updateField, removeField, availableFields, clearFields }) => {
    const [supervisorType, setSupervisorType] = useState(field.supervisorConditionType || 'all');
    const [jumpType, setJumpType] = useState(field.jumpConditionType || 'all');
    
    // Load the initial state of these checkboxes from the field data
    const [showSupervisorCondition, setShowSupervisorCondition] = useState(field.showSupervisorCondition || false);
    const [showJumpCondition, setShowJumpCondition] = useState(field.showJumpCondition || false);

    useEffect(() => {
        // Update the field whenever showSupervisorCondition or showJumpCondition changes
        updateFieldDetails({ showSupervisorCondition, showJumpCondition });
    }, [showSupervisorCondition, showJumpCondition]);

    const updateFieldDetails = (details) => {
        updateField(field.id, { ...field, ...details });
    };

    const choices = field.choices || ['', '', ''];

    const addChoice = () => {
        const newChoices = [...choices, ''];
        updateFieldDetails({ choices: newChoices });
    };

    const removeChoice = () => {
        const newChoices = choices.slice(0, -1);
        updateFieldDetails({ choices: newChoices });
    };

    const updateChoice = (index, value) => {
        const newChoices = choices.map((choice, i) => (i === index ? value : choice));
        updateFieldDetails({ choices: newChoices });
    };

    return (
        <>
            <button onClick={clearFields}>Return without saving</button>
            <div className="field">
                <h4>{field.type}</h4>
                <button onClick={() => removeField(field.id)}>Remove</button>

                <label>
                    Field Label:
                    <input
                        type="text"
                        value={field.label}
                        onChange={(e) => updateFieldDetails({ label: e.target.value })}
                    />
                </label>
                <div>
                    <label>
                        Field Description:
                        <textarea
                            rows="5"
                            value={field.notesBoxValue || ''}
                            onChange={(e) => updateFieldDetails({ notesBoxValue: e.target.value })}
                        />
                    </label>
                </div>
                <div>
                    <h3>Includes:</h3>
                    {field.type === 'Text Box (Short Text, Number, Date/Time, etc.)' && (
                        <label>- Short text input</label>
                    )}
                    {(field.type === 'Notes Box (Paragraph Text)' || field.type === 'Calculated Field') && (
                        <label>- Text Box</label>
                    )}
                    {(field.type === 'Multiple Choice Dropdown' || field.type === 'Multiple Choice Radio Button' || field.type === 'Checkboxes') && (
                        <div>
                            <label>- Choices:</label>
                            {choices.map((choice, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    value={choice}
                                    onChange={(e) => updateChoice(index, e.target.value)}
                                    style={{ display: 'block', marginBottom: '5px' }}
                                />
                            ))}
                            <div>
                                <button type="button" onClick={addChoice}>Add Choice</button>
                                {choices.length > 1 && (
                                    <button type="button" onClick={removeChoice}>Remove Last Choice</button>
                                )}
                            </div>
                        </div>
                    )}
                    {field.type === 'Yes-No' && (
                        <div>
                            <div><label>- Answer option (Yes)</label></div>
                            <div><label>- Answer option (No)</label></div>
                        </div>
                    )}
                    {field.type === 'True-False' && (
                        <div>
                            <div><label>- Answer option (True)</label></div>
                            <div><label>- Answer option (False)</label></div>
                        </div>
                    )}
                    {field.type === 'Signature' && (
                        <div><label>- Signature field</label></div>
                    )}
                    {field.type === 'File Upload' && (
                        <div><label>- Upload button</label></div>
                    )}
                    {field.type === 'Slider' && (
                        <div><label>- Slider field</label></div>
                    )}
                    {field.type === 'Descriptive Text' && (
                        <div><label>- Text box</label></div>
                    )}
                </div>
                <div>
                    <label>
                        - Identifier:
                        <input
                            type="checkbox"
                            checked={field.identifier || false}
                            onChange={(e) => updateFieldDetails({ identifier: e.target.checked })}
                        />
                    </label>

                    <label>
                        - Required:
                        <input
                            type="checkbox"
                            checked={field.required || false}
                            onChange={(e) => updateFieldDetails({ required: e.target.checked })}
                        />
                    </label>
                </div>
                
                <div>
                    <label>
                        - Supervisor Condition
                        <input
                            type="checkbox"
                            checked={showSupervisorCondition}
                            onChange={(e) => setShowSupervisorCondition(e.target.checked)}
                        />
                    </label>
                    <SupervisorCondition
                        condition={field.supervisorCondition || []}
                        setCondition={(conditions) => updateFieldDetails({ supervisorCondition: conditions })}
                        availableFields={availableFields || []}
                        initialConditions={field.supervisorCondition || []}
                        selectedType={supervisorType}
                        setSelectedType={setSupervisorType}
                        isEnabled={showSupervisorCondition} // Pass isEnabled state
                    />
                </div>

                <div>
                    <label>
                        - Jump Condition
                        <input
                            type="checkbox"
                            checked={showJumpCondition}
                            onChange={(e) => setShowJumpCondition(e.target.checked)}
                        />
                    </label>
                    <JumpCondition
                        condition={field.jumpCondition || []}
                        setCondition={(conditions) => updateFieldDetails({ jumpCondition: conditions })}
                        availableFields={availableFields || []}
                        initialConditions={field.jumpCondition || []}
                        selectedType={jumpType}
                        setSelectedType={setJumpType}
                        isEnabled={showJumpCondition} // Pass isEnabled state
                    />
                </div>
            </div>
        </>
    );
};

export default Field;
