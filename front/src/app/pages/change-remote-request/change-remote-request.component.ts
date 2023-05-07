import { Component, OnInit } from "@angular/core";
import {  UntypedFormGroup } from "@angular/forms";

import { UntypedFormControl } from '@angular/forms';
import { request } from "express";

@Component({
  selector: "app-change-remote-request",
  templateUrl: "./change-remote-request.component.html",
  styleUrls: ["./change-remote-request.component.scss"],
})
export class ChangeRemoteRequestComponent implements OnInit {
  isLoading = false;
  form = new UntypedFormGroup({
    remoteRequestResponse: new UntypedFormControl(),
    reason: new UntypedFormControl()
    
  });


  ngOnInit(): void {
  }

  async submitForm() {
    const { remoteRequestResponse, reason } = this.form.value;
    console.log(remoteRequestResponse);
    console.log(reason);

    let response = {
      "response":  remoteRequestResponse,
      "reason": reason
    };
    
    console.log(response);
    
    // do something with the form values
  }

}
