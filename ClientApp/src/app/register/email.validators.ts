import { AbstractControl, ValidationErrors } from "@angular/forms";

export class EmailValidator {
  static isValidExtension(control: AbstractControl): ValidationErrors | null {
    const v = control.value as string;

    if (v.includes("@ogr") && v.endsWith(".edu.tr")) {
      return null;
    } else {
      return {
        wrongExtension: true
      }
    }
  }
}
