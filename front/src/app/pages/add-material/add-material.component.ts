import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Material } from 'src/app/shared/models/Material';
import { Role } from 'src/app/shared/models/Role';
import { Materialservice } from 'src/app/shared/services/material.service';

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.scss']
})
export class AddMaterialComponent implements OnInit {
  errorMessage: string = "";
  successMessage: string = "";
  materialForm: FormGroup;
  mode: string = "create";
  materialId: number;
  isLoading = false;
  isSubmit: boolean = false;
  material: Material;
  roleService: any;
  roles: Role[];
  constructor(
    
    private materialService: Materialservice,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute

  ) {}

  ngOnInit(): void {
    this.initMaterialForm();
    this.checkMode();

  }
  initMaterialForm() {
    this.materialForm = this.fb.group({
      name: [null, [Validators.required]],
    
    });
  }

  
  checkMode() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("id")) {
        this.materialId = +paramMap.get("id");
        this.mode = "edit";
        this.getMaterialById(this.materialId);
      } else {
        this.mode = "create";
        this.materialForm.addControl(
          "name",
          new FormControl("", Validators.required)
        );
        this.materialId = null;
      }
    });
  }
  getMaterialById(id: number) {
    this.isLoading = true;
    this.materialService.getMaterialById(id).subscribe({
      next: (material: Material) => {
        this.isLoading = false;
        this.material = material;
        this.patchMaterialForm();
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

  patchMaterialForm() {
    this.materialForm.patchValue({
      name: this.material.name,
      
    });
  }

  saveMaterial() {
    this.isLoading = true;
    this.isSubmit = true;
    if (this.materialForm.invalid) {
      this.isLoading = false;
      return;
    }
    if (this.mode === "create") {
      this.materialService.createMaterial(this.materialForm.value).subscribe({
        next: (response: { message: string }) => {
          this.isLoading = false;
          this.router.navigate(["/material"]);
        },
        error: (error) => {
          this.isLoading = false;
           {
            this.errorMessage ="An error occurred please connect the support";
          }
          setTimeout(() => {
            this.errorMessage = "";
          }, 5000);
        },
      });
    } else {
      this.materialService.editMaterial(this.materialId, this.materialForm.value).subscribe({
        next: (response: {message: string}) => {
          this.isLoading = false;
          this.router.navigate(["/material"]);
        },
        error: (error) => {
          this.isLoading = false;
      
            this.errorMessage = "An error occurred Please try again!";
          setTimeout(() => {
            this.errorMessage = "";
          }, 5000);
        },})
    }
  }
}