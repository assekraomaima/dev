import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "src/app/shared/services/user.service";
import { passwordConfirming } from "src/app/shared/validators/confirm-password-validator.directive";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"],
})
export class ChangePasswordComponent implements OnInit {
  errorMessage: string = "";
  successMessage: string = "";
  changePasswordForm: FormGroup;
  isLoading = false;
  isSubmit: boolean = false;

  hideOldPassword = true;
  hidePassword = true;
  hideConfirmPassword = true;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initChangePasswordForm();
  }

  initChangePasswordForm() {
    this.changePasswordForm = this.fb.group(
      {
        password: [null, [Validators.required, Validators.minLength(8)]],
        confirmPassword: [null, [Validators.required, Validators.minLength(8)]],
      },
      {
        validators: [passwordConfirming()],
      }
    );
  }

  showPassword() {
    this.hidePassword = !this.hidePassword;
  }

  showConfirmPassword() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  changePassword() {
    this.isSubmit = true;
    if (this.changePasswordForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.userService
      .editPassword(this.changePasswordForm.value.password)
      .subscribe({
        next: (response) => {
          this.router.navigate(["/login"]);
        },
        error: (error) => {
          this.errorMessage = "An error occurred. Please try again";
          setTimeout(() => {
            this.errorMessage = "";
          }, 5000);
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }
}
