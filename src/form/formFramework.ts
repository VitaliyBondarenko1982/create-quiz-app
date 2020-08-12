import { Validation, OptionControl } from '../utils/interfaces';

export function createControl(config: OptionControl, validation: Validation): OptionControl {
  return {
    ...config,
    validation,
    valid: !validation,
  };
}

export function validate(value: string, validation?: Validation): boolean {
  if (!validation) {
    return true;
  }

  let isValid = true;

  if (validation.required) {
    isValid = value.trim() !== '' && isValid;
  }

  return isValid;
}

export function validateForm(formControls: Array<OptionControl>) {
  let isFormValid = true;

  formControls.forEach((controlItem) => {
    isFormValid = controlItem.valid && isFormValid;
  });

  return isFormValid;
}
