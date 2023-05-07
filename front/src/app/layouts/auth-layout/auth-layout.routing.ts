import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { AuthLayoutComponent } from './auth-layout.component';

export const AuthLayoutRoutes: Routes = [
    {
        path: "",
        component: AuthLayoutComponent,
        children: [
          {
            path: "",
            redirectTo: "login",
            pathMatch: "prefix",
          },
          {
            path: "login",
            loadChildren: () =>
              import("../../pages/login/login.module").then(
                (m) => m.LoginModule
              ),
          },
          {
            path: "forgot-password",
            loadChildren: () =>
              import("../../pages/forgot-password/forgot-password.module").then(
                (m) => m.ForgotPasswordModule
              ),
          },
          {
            path: "reset-password/:token",
            loadChildren: () =>
              import("../../pages/reset-password/reset-password.module").then(
                (m) => m.ResetPasswordModule
              ),
          },
        ],
      },
];
