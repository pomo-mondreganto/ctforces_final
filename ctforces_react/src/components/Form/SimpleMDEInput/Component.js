import React from 'react';

import SimpleMDE from 'react-simplemde-editor';
import { FormGroup, FormFeedback } from 'reactstrap';

const Component = ({ field, form, handleChange }) => (
    <FormGroup>
        <SimpleMDE
            onChange={handleChange}
            value={field.value}
            options={{
                autofocus: true,
                spellChecker: false,
            }}
        />
        <FormFeedback>{form.errors[field.name]}</FormFeedback>
    </FormGroup>
);

export default Component;
