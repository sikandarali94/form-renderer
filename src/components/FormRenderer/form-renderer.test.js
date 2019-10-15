import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import FormRenderer from './FormRenderer';

Enzyme.configure({ adapter: new Adapter() });

describe('FormRenderer component with full form schema', () => {
    let editor;

    it('renders', () => {
        editor = mount(<FormRenderer formSchema={null}/>);
        expect(editor).not.toBeNull();
    });

    it('renders all input fields with full schema provided', () => {
        const formJSONSchema = `
        {
            "fields": [
                { 
                    "type": "text", 
                    "name": "name",
                    "label": "Full Name", 
                    "required": true, 
                    "regex": "/^[a-z ,.'-]+$/i/", 
                    "onInvalidMessage": "Name is invalid. Please provide first name and last name separated by a space." 
                },
                { 
                  "type": "text",
                  "name": "date-of-birth",
                  "label": "Date of Birth",
                  "required": true,
                  "onInvalidMessage": "Please provide a date of birth."
                 },
                { 
                  "type": "radio",
                  "name": "gender",
                  "label": "Gender",
                  "required": true,
                  "onInvalidMessage": "Please select your gender.",
                  "options": [
                    { "value": "male", "label": "Male" },
                    { "value": "female", "label": "Female" }
                ]},
                {
                  "type": "text",
                  "name": "contact-number",
                  "label": "Contact Number",
                  "required": false,
                  "regex": "/^[0-9]*$/",
                  "onInvalidMessage": "Please provide a valid number"
                },
                { 
                  "type": "checkbox",
                  "name": "guardian-consent",
                  "required": false,
                  "label": "I consent to allow him/her to go to the CISCO field trip",
                  "enableDependentsOnValue": "1", 
                  "dependents": [
                    { 
                    "type": "text", 
                    "name": "name",
                    "label": "Full Name",
                    "required": true,
                    "regex": "/^[a-z ,.'-]+$/i/", 
                    "onInvalidMessage": "Name is invalid. Please provide first name and last name separated by a space." 
                    },
                    { 
                      "type": "text",
                      "name": "contact-number",
                      "label": "Contact Number",
                      "required": false,
                      "regex": "/^[0-9]*$/",
                      "onInvalidMessage": "Please provide a valid number"
                   }
                  ] }
            ]
        }
        `;

        editor = mount(<FormRenderer formSchema={JSON.parse(formJSONSchema)}/>);

        expect(editor.find('div.input-group > input[name="name"]').exists()).toEqual(true);
        expect(editor.find('div.input-group > input[name="date-of-birth"]').exists()).toEqual(true);
        expect(editor.find('div.input-group > input[name="gender"]').exists()).toHaveLength(2);
        expect(editor.find('div.input-group > input[name="contact-number"]').exists()).toEqual(true);
        expect(editor.find('div.input-group > input[name="guardian-consent"]').exists()).toEqual(true);
        expect(editor.find('div.dependent-input-group > input[name="name"]').exists()).toEqual(true);
        expect(editor.find('div.dependent-input-group > input[name="contact-number"]').exists()).toEqual(true);
    });

    it('renders input fields as per schema when name is omitted from it', () => {
        const formJSONSchema = `
        {
            "fields": [
                { 
                  "type": "text",
                  "name": "date-of-birth",
                  "label": "Date of Birth",
                  "required": true,
                  "onInvalidMessage": "Please provide a date of birth."
                 },
                { 
                  "type": "radio",
                  "name": "gender",
                  "label": "Gender",
                  "required": true,
                  "onInvalidMessage": "Please select your gender.",
                  "options": [
                    { "value": "male", "label": "Male" },
                    { "value": "female", "label": "Female" }
                ]},
                {
                  "type": "text",
                  "name": "contact-number",
                  "label": "Contact Number",
                  "required": false,
                  "regex": "/^[0-9]*$/",
                  "onInvalidMessage": "Please provide a valid number"
                },
                { 
                  "type": "checkbox",
                  "name": "guardian-consent",
                  "required": false,
                  "label": "I consent to allow him/her to go to the CISCO field trip",
                  "enableDependentsOnValue": "1", 
                  "dependents": [
                    { 
                    "type": "text", 
                    "name": "name",
                    "label": "Full Name",
                    "required": true,
                    "regex": "/^[a-z ,.'-]+$/i/", 
                    "onInvalidMessage": "Name is invalid. Please provide first name and last name separated by a space." 
                    },
                    { 
                      "type": "text",
                      "name": "contact-number",
                      "label": "Contact Number",
                      "required": false,
                      "regex": "/^[0-9]*$/",
                      "onInvalidMessage": "Please provide a valid number"
                   }
                  ] }
            ]
        }
        `;

        editor = mount(<FormRenderer formSchema={JSON.parse(formJSONSchema)}/>);

        expect(editor.find('div.input-group > input[name="name"]').exists()).toEqual(false);
        expect(editor.find('div.input-group > input[name="date-of-birth"]').exists()).toEqual(true);
        expect(editor.find('div.input-group > input[name="gender"]').exists()).toHaveLength(2);
        expect(editor.find('div.input-group > input[name="contact-number"]').exists()).toEqual(true);
        expect(editor.find('div.input-group > input[name="guardian-consent"]').exists()).toEqual(true);
        expect(editor.find('div.dependent-input-group > input[name="name"]').exists()).toEqual(true);
        expect(editor.find('div.dependent-input-group > input[name="contact-number"]').exists()).toEqual(true);
    });

    it('renders input fields as per schema when radio option is omitted from it', () => {
        const formJSONSchema = `
        {
            "fields": [
                { 
                    "type": "text", 
                    "name": "name",
                    "label": "Full Name", 
                    "required": true, 
                    "regex": "/^[a-z ,.'-]+$/i/", 
                    "onInvalidMessage": "Name is invalid. Please provide first name and last name separated by a space." 
                },
                { 
                  "type": "text",
                  "name": "date-of-birth",
                  "label": "Date of Birth",
                  "required": true,
                  "onInvalidMessage": "Please provide a date of birth."
                 },
                { 
                  "type": "radio",
                  "name": "gender",
                  "label": "Gender",
                  "required": true,
                  "onInvalidMessage": "Please select your gender.",
                  "options": [
                    { "value": "female", "label": "Female" }
                ]},
                {
                  "type": "text",
                  "name": "contact-number",
                  "label": "Contact Number",
                  "required": false,
                  "regex": "/^[0-9]*$/",
                  "onInvalidMessage": "Please provide a valid number"
                },
                { 
                  "type": "checkbox",
                  "name": "guardian-consent",
                  "required": false,
                  "label": "I consent to allow him/her to go to the CISCO field trip",
                  "enableDependentsOnValue": "1", 
                  "dependents": [
                    { 
                    "type": "text", 
                    "name": "name",
                    "label": "Full Name",
                    "required": true,
                    "regex": "/^[a-z ,.'-]+$/i/", 
                    "onInvalidMessage": "Name is invalid. Please provide first name and last name separated by a space." 
                    },
                    { 
                      "type": "text",
                      "name": "contact-number",
                      "label": "Contact Number",
                      "required": false,
                      "regex": "/^[0-9]*$/",
                      "onInvalidMessage": "Please provide a valid number"
                   }
                  ] }
            ]
        }
        `;

        editor = mount(<FormRenderer formSchema={JSON.parse(formJSONSchema)}/>);

        expect(editor.find('div.input-group > input[name="name"]').exists()).toEqual(true);
        expect(editor.find('div.input-group > input[name="date-of-birth"]').exists()).toEqual(true);
        expect(editor.find('div.input-group > input[name="gender"]').exists()).toHaveLength(1);
        expect(editor.find('div.input-group > input[name="contact-number"]').exists()).toEqual(true);
        expect(editor.find('div.input-group > input[name="guardian-consent"]').exists()).toEqual(true);
        expect(editor.find('div.dependent-input-group > input[name="name"]').exists()).toEqual(true);
        expect(editor.find('div.dependent-input-group > input[name="contact-number"]').exists()).toEqual(true);
    });

    it('renders input fields as per schema when a dependent is omitted from it', () => {
        const formJSONSchema = `
        {
            "fields": [
                { 
                    "type": "text", 
                    "name": "name",
                    "label": "Full Name", 
                    "required": true, 
                    "regex": "/^[a-z ,.'-]+$/i/", 
                    "onInvalidMessage": "Name is invalid. Please provide first name and last name separated by a space." 
                },
                { 
                  "type": "text",
                  "name": "date-of-birth",
                  "label": "Date of Birth",
                  "required": true,
                  "onInvalidMessage": "Please provide a date of birth."
                 },
                { 
                  "type": "radio",
                  "name": "gender",
                  "label": "Gender",
                  "required": true,
                  "onInvalidMessage": "Please select your gender.",
                  "options": [
                    { "value": "male", "label": "Male" },
                    { "value": "female", "label": "Female" }
                ]},
                {
                  "type": "text",
                  "name": "contact-number",
                  "label": "Contact Number",
                  "required": false,
                  "regex": "/^[0-9]*$/",
                  "onInvalidMessage": "Please provide a valid number"
                },
                { 
                  "type": "checkbox",
                  "name": "guardian-consent",
                  "required": false,
                  "label": "I consent to allow him/her to go to the CISCO field trip",
                  "enableDependentsOnValue": "1", 
                  "dependents": [
                    { 
                      "type": "text",
                      "name": "contact-number",
                      "label": "Contact Number",
                      "required": false,
                      "regex": "/^[0-9]*$/",
                      "onInvalidMessage": "Please provide a valid number"
                   }
                  ] }
            ]
        }
        `;

        editor = mount(<FormRenderer formSchema={JSON.parse(formJSONSchema)}/>);

        expect(editor.find('div.input-group > input[name="name"]').exists()).toEqual(true);
        expect(editor.find('div.input-group > input[name="date-of-birth"]').exists()).toEqual(true);
        expect(editor.find('div.input-group > input[name="gender"]').exists()).toHaveLength(2);
        expect(editor.find('div.input-group > input[name="contact-number"]').exists()).toEqual(true);
        expect(editor.find('div.input-group > input[name="guardian-consent"]').exists()).toEqual(true);
        expect(editor.find('div.dependent-input-group > input[name="name"]').exists()).toEqual(false);
        expect(editor.find('div.dependent-input-group > input[name="contact-number"]').exists()).toEqual(true);
    });
});