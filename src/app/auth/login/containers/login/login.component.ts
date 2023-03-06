import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error: string = '';

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  async loginUser(event: FormGroup) {
    const { email , password } = event.value;
    try {
      await this.auth.loginUser(email , password);
      this.router.navigate(['/']);
    } catch (error: any) {
      this.error = error.message
    }
  }

}
