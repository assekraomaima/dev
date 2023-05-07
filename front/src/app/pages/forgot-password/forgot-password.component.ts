import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResetPasswordService } from 'src/app/shared/services/reset-password.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm!: FormGroup;
  isLoading = false;
  hasError = false;
  errorMessage = "";
  successMessage = "";
  constructor(private fb: FormBuilder,
    private router: Router,
    private resetPasswordService: ResetPasswordService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.forgotPasswordForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
    });
  }

  forgotPassword() {
    if (this.forgotPasswordForm.invalid) {
      return;
    }
    this.resetPasswordService
      .forgotPassword(this.forgotPasswordForm.value.email)
      .subscribe({
        next: (response) => {
          this.successMessage = "An email sent. Please check your email.";
          setTimeout(() => {
            this.successMessage = "";
            this.router.navigate(['/login']);
          }, 5000);
        },
        error: (error) => {
          console.log(error.error.message);
          if (error.error.message == "user_not_found") {
            this.errorMessage = "Email not found. Please check your inputs.";
          } else {
            this.errorMessage =
              "An error occurred. Please contact the support.";
          }
          setTimeout(() => {
            this.errorMessage = "";
          }, 5000);
        },
      });
  }

}
