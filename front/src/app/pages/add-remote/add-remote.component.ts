import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap,Router } from '@angular/router';
import { Remote } from 'src/app/shared/models/Remote';
import { User } from 'src/app/shared/models/User';
import { RemoteService } from 'src/app/shared/services/remote.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-add-remote',
  templateUrl: './add-remote.component.html',
  styleUrls: ['./add-remote.component.scss'],
  
})
export class AddRemoteComponent implements OnInit {

  errorMessage: string = "";
  successMessage: string = "";
  users: User[] = [];
  remote: Remote;
  remoteForm: UntypedFormGroup;
  mode: string = "create";
  remoteId: number;
  isLoading = false;
  isSubmit: boolean = false;
  constructor(
    private remoteService: RemoteService,
    private userService: UserService,
    private fb: UntypedFormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initRemoteForm();
    this.checkMode();
    this.getUsers();
  }

  initRemoteForm() {
    //const type ="remote";
    this.remoteForm = this.fb.group({
      
      Date: [null, [Validators.required ]],
      //type:[ [type ]],
    });
  }

  getUsers() {
    this.isLoading = true;
    this.userService.getUsers().subscribe({
      next: (users: User[]) => {
        this.isLoading = false;
        this.users = users;
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = "An error occurred please connect the support";
        setTimeout(() => {
          this.errorMessage = "";
        }, 5000);
      },
    });
  }

  checkMode() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("id")) {
        this.remoteId = +paramMap.get("id");
        this.mode = "edit";
        this.getRemoteById(this.remoteId);
      } else {
        this.mode = "create";
        this.remoteForm.addControl(
          "Date",
          new UntypedFormControl("", Validators.required)
        );
        this.remoteId = null;
      }
    });
  }

  getRemoteById(id: number) {
    this.isLoading = true;
    this.remoteService.getRemoteById(id).subscribe({
      next: (remote: Remote) => {
        this.isLoading = false;
        this.remote = remote;
        this.patchRemoteForm();
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = "An error occurred please connect the support";
        setTimeout(() => {
          this.errorMessage = "";
        }, 5000);
      },
    });
  }

  patchRemoteForm() {
    this.remoteForm.patchValue({
      Date: this.remote.Date,
     type:this.remote.type,
    });
  }

  saveRemote() {
    this.isLoading = true;
    this.isSubmit = true;
    if (this.remoteForm.invalid) {
      this.isLoading = false;
      return;
    }
    if (this.mode === "create") {
      this.remoteService.createRemote(this.remoteForm.value).subscribe({
        next: (response: { message: string }) => {
          this.isLoading = false;
          this.router.navigate(["/remote"]);
        },
        error: (error) => {
          this.isLoading = false;
        
            this.errorMessage =
              "An error occurred please try again or contact the support";
          
          setTimeout(() => {
            this.errorMessage = "";
          }, 5000);
        },
      });
    } else {
      this.remoteService.editRemote(this.remoteId, this.remoteForm.value).subscribe({
        next: (response: {message: string}) => {
          this.isLoading = false;
          this.router.navigate(["/remote"]);
        },
        error: (error) => {
          this.isLoading = false;
          if (error.error.message === "work_exist") {
            
            this.errorMessage =
              "An error occurred please try again or contact the support";
          }
          setTimeout(() => {
            this.errorMessage = "";
          }, 5000);
        }
      })
    }
  }
}
