import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { AuthModel } from '../../core/models/auth.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  private _authService = inject(AuthService);
  loginForm!: FormGroup;

  constructor(
    private _builder: FormBuilder,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = this._builder.group({
      email: this._builder.control(``, Validators.required),
      password: this._builder.control(``, Validators.required),
    });
  }

  proceedLogin() {
    const model: AuthModel = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    this._authService.authorize(model).subscribe(
      (response) => {
        this._router.navigate(['/dashboard']);
      }
    )
  }
}
