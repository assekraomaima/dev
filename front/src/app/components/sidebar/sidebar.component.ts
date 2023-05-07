import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/shared/services/auth.service";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  permission: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "dashboard",
    title: "Dashboard",
    icon: "ni-tv-2 text-default",
    class: "",
    permission: "",
  },
  {
    path: "/users",
    title: "Users",
    icon: "ni-single-02 text-primary",
    class: "",
    permission: "PERMISSION_LIST_USERS",
  },
  {
    path: "/roles",
    title: "Roles",
    icon: "ni-paper-diploma text-info",
    class: "",
    permission: "PERMISSION_LIST_ROLES",
  },
  {
    path: "/departement",
    title: "Departement",
    icon: "fa fa-users text-warning",
    class: "",
    permission: "PERMISSION_LIST_DEPARTEMENTS",
  },
  {
    path: "/remote",
    title: "Remote",
    icon: "fa fa-address-book text-primary",
    class: "",
    permission: "PERMISSION_LIST_REMOTES",
  },
  {
    path: "/mission",
    title: "Mission",
    icon: "fa fa-truck text-danger",
    class: "",
    permission: "PERMISSION_LIST_MISSIONS",
   },
   {
    path: "/leave-request",
    title: "Leave Request",
    icon: "fa fa-calendar text-success",
    class: "",
    permission: "PERMISSION_LIST_LEAVE_REQUEST",
   },
   {
    path: "/material",
    title: "Manager Material",
    icon: "fa fa-shopping-cart text-default",
    class: "",
    permission: "PERMISSION_LIST_MATERIAL",
   },
   {
    path: "/cars",
    title: "Manager Cars",
    icon: "fa fa-car text-info",
    class: "",
    permission: "PERMISSION_LIST_CAR",
   },
   {
    path: "/reservattion-car",
    title: "Reservation Car",
    icon: "fa fa-car text-info",
    class: "",
    permission: "PERMISSION_LIST_RESERVATION_CAR",
   }

 ];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  public isCollapsed = true;
  permissions: string[];
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.permissions = this.authService.getPermissions();

    this.menuItems = ROUTES.filter((menuItem) =>
      this.permissions.includes(menuItem.permission) || menuItem.permission == ""
    );
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }

  logout() {
    this.authService.logout();
  }
}
