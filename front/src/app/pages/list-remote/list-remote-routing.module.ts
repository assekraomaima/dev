import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListRemoteComponent } from "./list-remote.component";

const routes: Routes = [
  {
    path: "",
    component: ListRemoteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListRemoteRoutingModule {}
