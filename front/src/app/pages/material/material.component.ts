import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Material } from 'src/app/shared/models/Material';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Materialservice } from 'src/app/shared/services/material.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss']
})
export class MaterialComponent implements OnInit {

  materials: Material[] = [];
  materialsCopy: Material[] = [];
  closeResult = "";
  modalOptions: NgbModalOptions;
  deleteAlertMessage: string = "";
  successMessage: string = "";
  errorMessage: string = "";
  materialToDelete: Material;
  isLoading = false;
  permissions: string[] = [];

  itemsPerPage: number = 10;
  currentPage: number = 1;

  hasFilter: boolean = false;

  constructor(
    private materialService: Materialservice,
    private authService: AuthService,
    private modalService: NgbModal
  ) {
    this.modalOptions = {
      backdrop: "static",
      backdropClass: "customBackdrop",
    };
  }

  ngOnInit(): void {
    this.getMaterials();
    this.permissions = this.authService.getPermissions();
  }

  hasPermission(permission: string) {
    return this.permissions.includes(permission);
  }

  getMaterials() {
    this.isLoading = true;
    this.hasFilter = false;
    this.materialService.getMaterials().subscribe({
      next: (materials: Material[]) => {
        this.isLoading = false;
        this.materials = materials;
        this.materialsCopy = [...this.materials];
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

  open(content, material: Material) {
    this.deleteAlertMessage = `Are you sure you want to delete ${material.name}`;
    this.materialToDelete = material;
    this.modalService.open(content, this.modalOptions).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  deleteMaterial() {
    this.isLoading = true;
    this.materialService.deleteMaterial(this.materialToDelete.id).subscribe({
      next: (response: { message: string }) => {
        this.successMessage = "Material deleted successfully";
        this.getMaterials();
        setTimeout(() => {
          this.successMessage = "";
        }, 5000);
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

  search(event: any) {
    let search = event.target.value;
    this.hasFilter = search ? true : false;
    this.materials = [...this.materialsCopy];
    this.materials = this.materials.filter(
      (material) =>
      material.name.includes(search) 
          );
  }
}
