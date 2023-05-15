import {Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

interface Field {
  id: number;
  type: string;
  value: string | string[];
  required: boolean;
  cond: Condition[];
}

interface Condition {
  join: string;
  field: number;
  value: string;
}

const FILL = 'fill';
const STRING = 'string'
const BOOLEAN = 'boolean'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  fields: Field[] = [
    {
      id: 1,
      type: 'text',
      value: 'My name is',
      required: false,
      cond: [
        {
          join: '',
          field: 2,
          value: 'fill'
        },
        {
          join: 'or',
          field: 3,
          value: 'IOS'
        }
      ]
    },
    {
      id: 2,
      type: 'checkbox',
      value: 'I am not a robot',
      required: false,
      cond: []
    },
    {
      id: 3,
      type: 'radio',
      value: ['Android', 'IOS'],
      required: true,
      cond: []
    },
    {
      id: 4,
      type: 'number',
      value: 'Price',
      required: true,
      cond: []
    }
  ];

  form: FormGroup;

  constructor() {
    this.form = new FormGroup(this._createForm());
  }

  _createForm() {
    const formControls: any = {};
    for (const field of this.fields) {
      formControls[field.id] = new FormControl(null);
    }
    return formControls
  }

  isFormValid(): boolean {
    const requiredFields = this.fields.filter(field => field.required);
    const submittedFields = requiredFields.filter(field => this.form.getRawValue()[field.id]);

    return requiredFields.length !== submittedFields.length;
  }

  submitForm() {
    alert('I was field as was demanded')
  }

  isConFulfilled(field: Field): boolean {
    let fulfilled: boolean = false;
    for (const condition of field.cond) {
      let conditionFulfilled: boolean = false;
      const fieldValue = this.form.getRawValue()[condition.field];
      if (typeof fieldValue === BOOLEAN) {
        conditionFulfilled = fieldValue === (condition.value === FILL);
      }
      if (typeof fieldValue === STRING) {
        conditionFulfilled = fieldValue === condition.value;
      }
      if (conditionFulfilled) {
        fulfilled = true;
        break;
      }
    }
    return fulfilled;
  }

  isValueArray(value: string | string[]): value is string[] {
    return Array.isArray(value);
  }
}
