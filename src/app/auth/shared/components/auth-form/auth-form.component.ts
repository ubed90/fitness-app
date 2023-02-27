import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  @Output()
  submitted = new EventEmitter<FormGroup>()

  form = this.fb.group({
    email: ['', Validators.email],
    password: ['', Validators.required]
  })

  onSubmit() {
    if(this.form.valid) {
      this.submitted.emit(this.form)
    }
  }


  get passwordInvalid() {
    const control = this.form.get('password');
    return control?.touched && control.hasError('required');
  }

  get emailFormat() {
    const control = this.form.get('email');
    return control?.touched && control.hasError('email');
  }

}
