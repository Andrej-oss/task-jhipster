import { Component, Input, OnInit } from '@angular/core';
import { IUser, MyUserDefault, User } from 'app/admin/user-management/user-management.model';
import { UserService } from '../../entities/user/user.service';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Params, Router } from '@angular/router';
import { RegisterService } from '../../account/register/register.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from '../../config/error.constants';
import { UserManagementService } from '../../admin/user-management/service/user-management.service';

@Component({
  selector: 'jhi-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  public hide = true;
  user: IUser;
  userForm: FormGroup;
  login: FormControl;
  name: FormControl;
  lastName: FormControl;
  password: FormControl;
  confirmPassword: FormControl = new FormControl('', [Validators.minLength(4), Validators.maxLength(50), Validators.required]);
  email: FormControl;
  message: Params;
  doNotMatch = false;
  error = false;
  errorEmailExists = false;
  errorUserExists = false;
  success = false;
  id: number = +this.snapShot.snapshot.params.id;

  constructor(
    private userService: UserService,
    private registerService: RegisterService,
    private userManagementService: UserManagementService,
    private snapShot: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // eslint-disable-next-line no-console
    console.log(this.id);
    if (this.id > 0) {
      this.userService.getOneUser(this.id).subscribe(user => {
        this.user = user;
        this.userForm = new FormGroup({
          login: (this.login = new FormControl(user.login, [Validators.maxLength(30), Validators.required])),
          password: (this.password = new FormControl('', [Validators.minLength(4), Validators.maxLength(50), Validators.required])),
          confirmPassword: this.confirmPassword,
          email: (this.email = new FormControl(user.email, [
            Validators.email,
            Validators.required,
            Validators.min(5),
            Validators.max(100),
          ])),
          name: (this.name = new FormControl('', [Validators.maxLength(30), Validators.required])),
          lastName: (this.lastName = new FormControl('', [Validators.maxLength(30), Validators.required])),
        });
      });
    } else if (!this.id) {
      this.userForm = new FormGroup({
        login: (this.login = new FormControl('', [Validators.maxLength(30), Validators.required])),
        password: (this.password = new FormControl('', [Validators.minLength(4), Validators.maxLength(50), Validators.required])),
        confirmPassword: this.confirmPassword,
        email: (this.email = new FormControl('', [Validators.email, Validators.required, Validators.min(5), Validators.max(100)])),
      });
    }
  }

  passwordLengthValidator(form: FormGroup): null | unknown {
    const { value: password } = form.controls.password;
    if (password && password.length < 10) {
      return { passwordLengthError: true };
    } else {
      return null;
    }
  }

  emailValidator(form: FormGroup): null | {} {
    const { value: email } = form.controls.email;
    const regExpMatchArray = email.match(/['.']/g);
    if (!!regExpMatchArray && regExpMatchArray.length) {
      return null;
    } else {
      return { emailError: true };
    }
  }

  onSave(userForm: FormGroup): void {
    this.resetErrors();
    const password = this.userForm.get(['password'])!.value;
    if (password !== this.userForm.get(['confirmPassword'])!.value) {
      this.doNotMatch = true;
      return;
    }
    const login = userForm.get(['login'])!.value;
    const email = userForm.get(['email'])!.value;
    this.userForm.disable();
    this.registerService.save({ login, email, password, langKey: 'en' }).subscribe(
      () => {
        this.success = true;
        this.userForm.reset();
        this.router.navigate(['/']);
      },
      response => {
        this.processError(response);
        this.userForm.enable();
      }
    );
  }

  onUpdate(userForm: FormGroup): void {
    this.user = {
      ...this.user,
      login: userForm.get(['login'])!.value,
      email: userForm.get(['email'])!.value,
      firstName: userForm.get(['name'])!.value,
      lastName: userForm.get(['lastName'])!.value,
    };
    this.userForm.disable();
    this.userManagementService.update(this.user).subscribe(
      data => {
        this.resetErrors();
        window.history.back();
      },
      // eslint-disable-next-line no-console
      err => {
        this.userForm.enable();
      }
    );
  }

  private processError(response: HttpErrorResponse): void {
    if (response.status === 400 && response.error.type === LOGIN_ALREADY_USED_TYPE) {
      this.errorUserExists = true;
    } else if (response.status === 400 && response.error.type === EMAIL_ALREADY_USED_TYPE) {
      this.errorEmailExists = true;
    } else {
      this.error = true;
    }
  }
  private resetErrors(): void {
    this.doNotMatch = false;
    this.error = false;
    this.errorEmailExists = false;
    this.errorUserExists = false;
  }
}
