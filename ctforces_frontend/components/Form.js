import React, { Component } from 'react';
import { Form, FormGroup, Input, Button, FormFeedback } from 'reactstrap';
import validate from '../lib/validators';

class InputComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <FormGroup>
                <Input
                    type={
                        this.props.type === undefined ? 'text' : this.props.type
                    }
                    name={
                        this.props.name === undefined
                            ? 'default'
                            : this.props.name
                    }
                    hidden={
                        this.props.hidden == undefined
                            ? false
                            : this.props.hidden
                    }
                    className="form-control"
                    placeholder={this.props.placeholder}
                    onChange={this.props.handleChange}
                    invalid={this.props.name in this.props.errors}
                />
                {this.props.name in this.props.errors &&
                    this.props.errors[this.props.name].map((error, i) => (
                        <FormFeedback key={i}>{error}</FormFeedback>
                    ))}
            </FormGroup>
        );
    }
}

class FormComponent extends Component {
    constructor(props) {
        super(props);

        let formFieldsValues = {};
        let formFields = [];

        for (let key in this.props.fields) {
            let field = this.props.fields[key];
            formFieldsValues[field.name] = '';
            formFields.push(field);
        }

        formFields.push({ name: 'detail', hidden: true });

        this.state = {
            errors: {},
            formFieldsValues: formFieldsValues,
            formFields: formFields
        };
    }

    validate = validate_empty => {
        let validateResultAll = {};
        let ok = true;
        for (let key in this.state.formFields) {
            let field = this.state.formFields[key];
            if (
                !validate_empty &&
                this.state.formFieldsValues[field.name] === ''
            ) {
                continue;
            }
            let validateResult = validate(
                this.state.formFieldsValues[field.name],
                field.validators === undefined ? [] : field.validators,
                this.state.formFieldsValues
            );
            if (validateResult) {
                validateResultAll[field.name] = validateResult;
                ok = false;
            }
        }
        return {
            ok: ok,
            verdicts: validateResultAll
        };
    };

    applyServerErrors = data => {
        let applyState = {};
        for (let key in data) {
            applyState[key] = [data[key]];
        }
        this.setState({
            errors: applyState
        });
    };

    handleSubmit = async event => {
        event.preventDefault();

        let validated = this.validate(true);
        this.setState({
            errors: validated.verdicts
        });
        if (validated.ok) {
            let result = await this.props.onOkSubmit(
                this.state.formFieldsValues
            );
            if (!result.ok) {
                this.applyServerErrors(result.errors);
            }
        }
    };

    handleChange = event => {
        let dispatch = this.state.formFieldsValues;
        dispatch[event.target.name] = event.target.value;
        this.setState(dispatch);

        let validated = this.validate(false);
        this.setState({ errors: validated.verdicts });
    };

    render() {
        return (
            <Form
                className="justify-content-center"
                onSubmit={this.handleSubmit}
            >
                {this.state.formFields.map((obj, i) => {
                    return (
                        <InputComponent
                            type={obj.type}
                            name={obj.name}
                            hidden={obj.hidden}
                            placeholder={obj.placeholder}
                            handleChange={this.handleChange}
                            errors={this.state.errors}
                            key={i}
                        />
                    );
                })}
                <Button color="primary" className="btn-block" type="submit">
                    Submit
                </Button>
            </Form>
        );
    }
}

export default FormComponent;