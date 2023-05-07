import { Routes } from "@angular/router";
import { PermissionGuard } from "src/app/shared/guards/permission.guard";
import { AdminLayoutComponent } from "./admin-layout.component";

export const AdminLayoutRoutes: Routes = [
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "prefix",
      },
      {
        path: "dashboard",
        loadChildren: () =>
          import("../../pages/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: "user-profile",
        loadChildren: () =>
          import("../../pages/user-profile/user-profile.module").then(
            (m) => m.UserProfileModule
          ),
      },
      {
        path: "change-password",
        loadChildren: () =>
          import("../../pages/change-password/change-password.module").then(
            (m) => m.ChangePasswordModule
          ),
      },
      {
        path: "users",
        loadChildren: () =>
          import("../../pages/users/users.module").then((m) => m.UsersModule),
        canActivate: [PermissionGuard],
        data: { permission: "PERMISSION_LIST_USERS" },
      },
      {
        path: "add-user",
        loadChildren: () =>
          import("../../pages/add-user/add-user.module").then(
            (m) => m.AddUserModule
          ),
      },
      {
        path: "edit-user/:id",
        loadChildren: () =>
          import("../../pages/add-user/add-user.module").then(
            (m) => m.AddUserModule
          ),
      },
      {
        path: "roles",
        loadChildren: () =>
          import("../../pages/roles/roles.module").then((m) => m.RolesModule),
      },
      {
        path: "add-role",
        loadChildren: () =>
          import("../../pages/add-role/add-role.module").then(
            (m) => m.AddRoleModule
          ),
      },
      {
        path: "edit-role/:id",
        loadChildren: () =>
          import("../../pages/add-role/add-role.module").then(
            (m) => m.AddRoleModule
          ),
      },
      {
        path: "departement",
        loadChildren: () =>
          import("../../pages/departement/departement.module").then(
            (m) => m.DepartementModule
          ),
      },
      {
        path: "add-departement",
        loadChildren: () =>
          import("../../pages/add-departement/add-departement.module").then(
            (m) => m.AddDepartementModule
          ),
      },
      {
        path: "edit-departement/:id",
        loadChildren: () =>
          import("../../pages/add-departement/add-departement.module").then(
            (m) => m.AddDepartementModule
          ),
      },
      {
        path: "mission",
        loadChildren: () =>
          import("../../pages/mission/mission.module").then(
            (m) => m.MissionModule
          ),
      },
      {
        path: "add-mission",
        loadChildren: () =>
          import("../../pages/add-mission/add-mission.module").then(
            (m) => m.AddMissionModule
          ),
      },
      {
        path: "edit-mission/:id",
        loadChildren: () =>
          import("../../pages/add-mission/add-mission.module").then(
            (m) => m.AddMissionModule
          ),
      },
      {
        path: "list-mission",
        loadChildren: () =>
          import("../../pages/list-mission/list-mission.module").then(
            (m) => m.ListMissionModule
          ),
      },
      {
        path: "my-mission",
        loadChildren: () =>
          import("../../pages/my-mission/my-mission.module").then(
            (m) => m.MyMissionModule
          ),
      },
      {
        path: "remote",
        loadChildren: () =>
          import("../../pages/remote/remote.module").then(
            (m) => m.RemoteModule
          ),
      },
      {
        path: "add-remote",
        loadChildren: () =>
          import("../../pages/add-remote/add-remote.module").then(
            (m) => m.AddRemoteModule
          ),
      },
      {
        path: "edit-remote/:id",
        loadChildren: () =>
          import("../../pages/add-remote/add-remote.module").then(
            (m) => m.AddRemoteModule
          ),
      },
      {
        path: "list-remote",
        loadChildren: () =>
          import("../../pages/list-remote/list-remote.module").then(
            (m) => m.ListRemoteModule
          ),
      },
      {
        path: "my-remote",
        loadChildren: () =>
          import("../../pages/my-remote/my-remote.module").then(
            (m) => m.MyRemoteModule
          ),
      },
      {
        path: "change-remote-request",
        loadChildren: () =>
          import(
            "../../pages/change-remote-request/change-remote-request.module"
          ).then((m) => m.ChangeRemoteRequestModule),
      },
      {
        path: "leave-request",
        loadChildren: () =>
          import("../../pages/leave-request/leave-request.module").then(
            (m) => m.LeaveRequestModule
          ),
      },
      {
        path: "myleaverequest",
        loadChildren: () =>
          import("../../pages/my-leave-request/my-leave-request.module").then(
            (m) => m.MyLeaveRequestModule
          ),
      },
      {
        path: "add-leave-request",
        loadChildren: () =>
          import("../../pages/add-leave-request/add-leave-request.module").then(
            (m) => m.AddLeaveRequestModule
          ),
      },
      {
        path: "edit-leave-request/:id",
        loadChildren: () =>
          import("../../pages/add-leave-request/add-leave-request.module").then(
            (m) => m.AddLeaveRequestModule
          ),
      },
      {
        path: "listleaverequest",
        loadChildren: () =>
          import(
            "../../pages/list-leave-request/list-leave-request.module"
          ).then((m) => m.ListLeaveRequestModule),
      },
      {
        path: "material",
        loadChildren: () =>
          import(
            "../../pages/material/material-routing.module"
          ).then((m) => m.ManagerMaterialRoutingModule),
          
      },
      {
        path: "add-material",
        loadChildren: () =>
          import(
            "../../pages/add-material/add-material.module"
          ).then((m) => m.AddMaterialModule),
      },
      {
        path: "edit-material/:id",
        loadChildren: () =>
          import("../../pages/add-material/add-material.module").then(
            (m) => m.AddMaterialModule
          ),
      },
      {
        path: "cars",
        loadChildren: () =>
          import(
            "../../pages/cars/cars-routing.module"
          ).then((m) => m.CarsRoutingModule),
      },
      {
        path: "add-car",
        loadChildren: () =>
          import(
            "../../pages/add-car/add-car-routing.module"
          ).then((m) => m.AddCarRoutingModule),
      },
      {
        path: "edit-car/:id",
        loadChildren: () =>
          import("../../pages/add-car/add-car-routing.module").then(
            (m) => m.AddCarRoutingModule
          ),
      },

      

      {
        path: "add-reservation-car",
        loadChildren: () =>
          import(
            "../../pages/add-reservation-car/add-reservation-car-routing.module"
          ).then((m) => m.AddReservationCarRoutingModule),
      },
      {
        path: "edit-reservation-car/:id",
        loadChildren: () =>
          import(
            "../../pages/add-reservation-car/add-reservation-car-routing.module"
          ).then((m) => m.AddReservationCarRoutingModule),
      },
      
      
    ],
  },
];
