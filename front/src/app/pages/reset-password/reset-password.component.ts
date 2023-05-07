import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ResetPasswordService } from 'src/app/shared/services/reset-password.service';
import { passwordConfirming } from 'src/app/shared/validators/confirm-password-validator.directive';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm!: FormGroup;
  isLoading = false;
  hasError = false;
  errorMessage = "";
  hidePassword = true;
  hideConfirmPassword = true;

  token: string;
  isValidToken: boolean = true;
  constructor(private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private resetPasswordService: ResetPasswordService) { }

  ngOnInit(): void {
    this.initForm();
    this.checkToken();
  }


  initForm() {
    this.resetPasswordForm = this.fb.group(
      {
        password: ["", [Validators.required, Validators.minLength(8)]],
        confirmPassword: ["", [Validators.required, Validators.minLength(8)]],
      },
      { validators: passwordConfirming() }
    );
  }

  checkToken() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      if (params.has("token")) {
        this.token = params.get("token");
        this.resetPasswordService.checkToken(this.token).subscribe({
          next: (response) => {
            this.isValidToken = response.exist;
          },
          error: (error) => {
            this.errorMessage = "an error occurred. Please try again";
            setTimeout(() => {
              this.errorMessage = "";
            }, 5000);
          },
        });
      }
    });
  }

  showPassword() {
    this.hidePassword = !this.hidePassword;
  }

  showConfirmPassword() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  resetPassword() {
    this.resetPasswordService
      .resetPassword(this.token, this.resetPasswordForm.value.password)
      .subscribe({
        next: (response) => {
          this.router.navigate(["/login"]);
        },
        error: (error) => {
          this.errorMessage = "an error occurred. Please try again";
          setTimeout(() => {
            this.errorMessage = "";
          }, 5000);
        },
      });
  }

}
