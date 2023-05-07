import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Remote } from 'src/app/shared/models/Remote';
import { AuthService } from 'src/app/shared/services/auth.service';
import { RemoteService } from 'src/app/shared/services/remote.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-my-remote',
  templateUrl: './my-remote.component.html',
  styleUrls: ['./my-remote.component.scss']
})
export class MyRemoteComponent implements OnInit {

  Date = Date.now();
  remotes: Remote[] = [];
  remotesCopy: Remote[] = [];
  closeResult = "";
  modalOptions: NgbModalOptions;
  successMessage: string = "";
  errorMessage: string = "";
  isLoading = false;
  permissions: string[] = [];
  itemsPerPage: number = 10;
  currentPage: number = 1;

  hasFilter: boolean = false;

  constructor(
    private remoteService: RemoteService,
    private authService: AuthService,
  ) {
    this.modalOptions = {
      backdrop: "static",
      backdropClass: "customBackdrop",
    };
  }

  ngOnInit(): void {
    this.getRemotes();
    this.permissions = this.authService.getPermissions();
    
  }

  hasPermission(permission: string) {
    return this.permissions.includes(permission);
  }

  getRemotes() {
    this.isLoading = true;
    this.hasFilter = false;
    this.remoteService.getRemotes().subscribe({
      next: (remotes: Remote[]) => {
        this.isLoading = false;
        this.remotes = remotes;
        this.remotesCopy = [...this.remotes];
        console.log(this.remotes);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = "An error occurred. Please contact the support";
        setTimeout(() => {
          this.errorMessage = "";
        });
      },
    });
  }

  

  
  

  


}
