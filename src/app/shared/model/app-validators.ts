import { NG_VALIDATORS, AbstractControl } from '@angular/forms';
import { Directive } from '@angular/core';


@Directive({
    selector: '[fkEmailValidator]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: EmailValidatorDirective, multi: true
    }]
})

export class EmailValidatorDirective {
  
    validate(control: AbstractControl): {[key: string]: any} {
      const pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
      if (!control.value || control.value === '' || pattern.test(control.value)) {
        return null;
      } else {
        return { 'invalidEMail' : true};
      }
    }
}

@Directive({
  selector: '[fkZipValidator]',
  providers: [{
      provide: NG_VALIDATORS,
      useExisting: ZipValidatorDirective, multi: true
  }]
})

export class ZipValidatorDirective {
  validate(control: AbstractControl): {[key: string]: any} {
    const pattern = /[0-9]{5}/;
    if (!control.value || control.value === '' || pattern.test(control.value)) {
      return null;
    } else {
      return { 'invalidPlz' : true};
    }
  }
}

@Directive({
  selector: '[fkYearValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: YearValidatorDirective, multi: true
  }]
})

  export class YearValidatorDirective {
    validate(control: AbstractControl): {[key: string]: any} {
      const pattern = /[19|20][0-9]{3}/;
      if (!control.value || control.value === '' || pattern.test(control.value)) {
        return null;
      } else {
        return { 'invalidYear' : true};
      }
    }
  }

  @Directive({
    selector: '[fkNumberValidator]',
    providers: [{
      provide: NG_VALIDATORS,
      useExisting: NumberValidatorDirective, multi: true
    }]
  })
  
    export class NumberValidatorDirective {
      validate(control: AbstractControl): {[key: string]: any} {
        const pattern = /[0-9]/;
        if (!control.value || control.value === '' || pattern.test(control.value)) {
          return null;
        } else {
          return { 'invalidNumber' : true};
        }
      }
    }

  export const APPLICATION_VALIDATORS = [
    EmailValidatorDirective, 
    ZipValidatorDirective, 
    YearValidatorDirective,
    NumberValidatorDirective,
  ];