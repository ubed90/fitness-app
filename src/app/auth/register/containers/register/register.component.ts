import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/shared/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  error: string = '';

  async registerUser(event: FormGroup) {
    const { email , password } = event.value;
    try {
      await this.auth.createUser(email , password);
      this.router.navigate(['/']);
    } catch (error: any) {
      this.error = error.message
    }
  }

}
