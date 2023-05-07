import { AbstractControl, ValidatorFn } from "@angular/forms";

export function passwordConfirming(): ValidatorFn {
  return (c: AbstractControl) => {    
    if (c.get("password").value !== c.get("confirmPassword").value) {
      return { notMatch: true };
    }
    return null;
  };
}