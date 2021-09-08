import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../core/auth/account.service';
import { Router } from '@angular/router';
import { LoginService } from '../../login/login.service';
import { Login } from '../../login/login.model';

@Component({
  selector: 'jhi-user-auth-form',
  templateUrl: './user-auth-form.component.html',
  styleUrls: ['./user-auth-form.component.scss'],
})
export class UserAuthFormComponent implements OnInit {
  userAuth: FormGroup;
  login: FormControl;
  password: FormControl;
  hide: boolean;
  error: string;
  credential: Login;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.userAuth = new FormGroup({
      login: (this.login = new FormControl('', [Validators.required])),
      password: (this.password = new FormControl('', [Validators.required])),
    });
  }

  onAuthenticate(authForm: FormGroup): void {
    this.credential = {
      username: authForm.get('login')!.value,
      password: authForm.get('password')!.value,
      rememberMe: false,
    };
    this.userAuth.disable();
    this.loginService.login(this.credential).subscribe(
      () => {
        this.router.navigate(['/']);
      },
      err => {
        this.userAuth.enable();
        this.userAuth.reset();
        this.error = err.error.detail;
      }
    );
  }

  onRegistration(): void {
    this.router.navigate(['registration']);
  }
}
