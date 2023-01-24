import { AbstractControl, ValidatorFn } from "@angular/forms";

export class PasswordVerificationValidator{
    static coincidenPasswords(control: AbstractControl):any{
     const password=control.get('password').value;
     const confirmPassword=control.get('confirmPassword').value;
     if(password!==confirmPassword&&(password!==''||confirmPassword!=='')){
      control.get('confirmPassword').setErrors({NotConfirmedPassword:true});
     }
     else{
      control.get('confirmPassword').setErrors(null);
      return null;
     }
    }
      
    }