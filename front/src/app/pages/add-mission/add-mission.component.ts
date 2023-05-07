import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Mission } from 'src/app/shared/models/Mission';
import { User } from 'src/app/shared/models/User';
import { MissionService } from 'src/app/shared/services/mission.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-add-mission',
  templateUrl: './add-mission.component.html',
  styleUrls: ['./add-mission.component.scss']
})
export class AddMissionComponent implements OnInit {

  errorMessage: string = "";
  successMessage: string = "";
  mission:Mission;
  missionForm: UntypedFormGroup;
  mode: string = "create";
  missionId: number;
  isLoading = false;
  isSubmit: boolean = false;
  users:User[]=[];
 
  constructor(
    private missionService: MissionService,
    private userService: UserService,
    private fb: UntypedFormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    
  ) {}

  ngOnInit(): void {
    this.initMissionForm();
    this.checkMode();
    this.getUsers();

  }

  initMissionForm() {
    this.missionForm = this.fb.group({
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      description: [null, [Validators.required]],
      userId: [null, [Validators.required]],

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
        this.missionId = +paramMap.get("id");
        this.mode = "edit";
        this.getMissionById(this.missionId);
      } else {
        this.mode = "create";
        this.missionForm.addControl(
          "description",
          new UntypedFormControl("", Validators.required)
        );
        this.missionId = null;
      }
    });
  }

  getMissionById(id: number) {
    this.isLoading = true;
    this.missionService.getMissionById(id).subscribe({
      next: (mission: Mission) => {
        this.isLoading = false;
        this.mission = mission;
        this.patchMissionForm();
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

  patchMissionForm() {
    this.missionForm.patchValue({
      startDate: this.mission.startDate,
      endDate: this.mission.endDate,
      description: this.mission.description,
      userId:this.mission.UserId,


    });
  }

  saveMission() {
    this.isLoading = true;
    this.isSubmit = true;
    if (this.missionForm.invalid) {
      this.isLoading = false;
      return;
    }
    if (this.mode === "create") {
      this.missionService.createMission(this.missionForm.value).subscribe({
        next: (response: { message: string }) => {
          this.isLoading = false;
          this.router.navigate(["/mission"]);
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
      this.missionService.editMission(this.missionId, this.missionForm.value).subscribe({
        next: (response: {message: string}) => {
          this.isLoading = false;
          this.router.navigate(["/mission"]);
        },
        error: (error) => {
          this.isLoading = false;
          if (error.error.message === "mission_exist") {
            
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