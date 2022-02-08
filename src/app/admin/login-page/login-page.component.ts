import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from '../../shared/interfases';
import { AuthService } from '../shared/servises/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup
  submitted: boolean = false
  message: string

  constructor(
    public authServ: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe((par: Params) => {
      if (par['notLogin']) {
        this.message = 'Войдите, прежде чем продолжить'
      } else if (par['noAuth']) {
        this.message = 'Сессия истекла. Пожалуйста, авторизируйтесь заново'
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

  submit() {
    if (this.form?.invalid) {
      return
    }

    this.submitted = true

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    }

    this.authServ.login(user).subscribe(() => {
      this.form.reset
      this.router.navigate(['/admin', 'dashboard'])

    }, () => {
      this.submitted = false
    })

    this.submitted = false

  }

}
