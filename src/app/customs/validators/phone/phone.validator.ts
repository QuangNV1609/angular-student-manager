import { AbstractControl } from "@angular/forms";

export function PhoneValidator(control: AbstractControl) {
    const regex = new RegExp('0+[3|7|8|9]+[0-9]{8}');
    if (!regex.test(control.value)) {
        return {
            invalidPhone: true
        }
    }
    return null;
}