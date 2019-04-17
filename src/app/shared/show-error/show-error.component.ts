import { Component, OnInit, Input } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';

@Component({
  selector: 'fk-show-error',
  templateUrl: './show-error.component.html',
  styleUrls: ['./show-error.component.scss']
})
export class ShowErrorComponent implements OnInit {
  /**
   * @var path string the inputfield
   * @var text string own inputfield name optional 
   */
  @Input('path') controlPath;
  @Input('text') displayName = '';

  constructor( private ngForm: NgForm ) { 
    
  }

  ngOnInit() {
  }

  get errorMessages(): string[] {
    


    const messages = [];
    const form: FormGroup = this.ngForm.form;
    const control = form.get(this.controlPath);
    
    if (!control || !(control.touched) || !(control.errors)) {
      return null;
    }
    
    for (const code in control.errors) {
      if (control.errors.hasOwnProperty(code)) {
        const error = control.errors[code];
        let message = '';
        
        switch (code) {
          case 'required':
            message = `${this.displayName} ist ein Pflichtfeld`;
            break;
          case 'minlength':
            message = `${this.displayName} muss mindestens ${error.requiredLength} Zeichen haben`;
            break;
          case 'maxlength':
            message = `${this.displayName} darf maximale ${error.requiredLength} Zeichen haben`;
            break;
          case 'invalidEMail':
            message = 'Bitte geben Sie eine gültige E-Mail-Adresse an';
            break;
          case 'invalidPlz':
            message = 'Bitte geben Sie eine gültige Postleitzahl ein';
            break;
          case 'invalidYear':
            message = 'Bitte geben Sie ein gültiges Jahr ein (vierstellig)';
            break;
          case 'invalidNumber':
            message = 'Bitte geben Sie eine Zahl ein';
            break;
        }

        messages.push(message);
      }
    }
    return messages;
  }

}
