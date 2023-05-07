import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  FormControl,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { LeaveRequest } from 'src/app/shared/models/LeaveRequest';
import { User } from 'src/app/shared/models/User';
import { LeaverequestService } from 'src/app/shared/services/leaverequest.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-add-leave-request',
  templateUrl: './add-leave-request.component.html',
  styleUrls: ['./add-leave-request.component.scss']
})
export class AddLeaveRequestComponent implements OnInit {

  errorMessage: string = "";
  successMessage: string = "";
  leaverequest:LeaveRequest;
  leaverequestForm: UntypedFormGroup;
  mode: string = "create";
  leaverequestId: number;
  isLoading = false;
  isSubmit: boolean = false;
  users:User[]=[];
  selectedFile: any;
  http: any;
  profileForm: any;
  imagePreview: string;

  types: string[] = ['maladie', 'normal'];
 
  constructor(
    private leaverequestService: LeaverequestService,
    private userService: UserService,
    private fb: UntypedFormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    
  ) {}

  ngOnInit(): void {
    this.initLeaverequestForm();
    this.checkMode();
    this.getUsers();
  }

  initLeaverequestForm() {
    this.leaverequestForm = this.fb.group({
      UserId:[null, [Validators.required ]],
      startDate: [null, [Validators.required ]],
      endDate: [null, [Validators.required ]],
      type:[null, [Validators.required ]],
      certificate: [null, [Validators.required ]],
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
        this.leaverequestId = +paramMap.get("id");
        this.mode = "edit";
        this.getLeaverequestById(this.leaverequestId);
      } else {
        this.mode = "create";
        this.leaverequestId = null;
      }
    });
  }

  getLeaverequestById(id: number) {
    this.isLoading = true;
    this.leaverequestService.getLeaverequestsById(id).subscribe({
      next: (leaverequest: LeaveRequest) => {
        this.isLoading = false;
        this.leaverequest = leaverequest;
        this.patchLeaverequestForm();
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

  patchLeaverequestForm() {
    this.leaverequestForm.patchValue({
     startDate: this.leaverequest.startDate,
     endDate : this.leaverequest.endDate,
     certificat: this.leaverequest.certificat,
     type: this.leaverequest.type,
     UserId: this.leaverequest.UserId,

    });
  }

  saveLeaverequest() {
    console.log(this.leaverequestForm.value);
    this.isLoading = true;
    this.isSubmit = true;
    if (this.leaverequestForm.invalid) {
      this.isLoading = false;
      return;
    }
    if (this.mode === "create") {
      this.leaverequestService.createLeaverequest(this.leaverequestForm.value).subscribe({
        next: (response: { message: string }) => {
          this.isLoading = false;
          this.router.navigate(["/leave-request"]);
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
      this.leaverequestService.editLeaverequest(this.leaverequestId, this.leaverequestForm.value).subscribe({
        next: (response: {message: string}) => {
          this.isLoading = false;
          this.router.navigate(["/leave-request"]);
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
