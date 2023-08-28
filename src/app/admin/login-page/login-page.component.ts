import {Component, OnInit} from '@angular/core'
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {User} from '../../shared/interfaces';
import {AuthService} from '../shared/services/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form!: FormGroup
  submitted = false
  message!: string

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private translateService: TranslateService
  ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
        this.message = 'login.errors.enter-data';
      } else if (params['authFailed']) {
        this.message = 'login.errors.session';
      }
    })

    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    })
  }

  get passwordErrors() {
    const errors: ValidationErrors | null | undefined = this.form?.get('password')?.errors?.['minlength'];

    return this.translateService.instant('login.errors.min-length', {
      requiredMinLength: errors?.['requiredLength'],
      actualLength: errors?.['actualLength']
    })
  };

  submit() {
    if (this.form.invalid) {
      return
    }

    this.submitted = true

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    }

    this.auth.login(user).subscribe((responce) => {
      this.form.reset()
      this.router.navigate(['/admin', 'dashboard'])
      this.submitted = false
    }, () => {
      this.submitted = false
    })
  }
}

