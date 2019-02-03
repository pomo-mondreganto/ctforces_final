import React from 'react';

import { Input, Label, FormGroup, FormFeedback } from 'reactstrap';

const Component = ({ field, form, label, ...props }) => {
    const name = field.name;
    const invalid = form.errors[name] && form.errors[name] && true;

    return (
        <FormGroup check className="pb-3">
            <Label check>
                <Input
                    name={name}
                    value={field.value}
                    disabled={form.isSubmitting}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    invalid={invalid}
                    {...props}
                />
                {label}
            </Label>
            <FormFeedback>{form.errors[name]}</FormFeedback>
        </FormGroup>
    );
};

export default Component;