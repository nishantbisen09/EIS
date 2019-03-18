import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";

@Component({
  selector: "app-adminlogin",
  templateUrl: "./adminlogin.component.html",
  styleUrls: ["./adminlogin.component.css"]
})
export class AdminloginComponent implements OnInit {
  username: String = "";
  password: String = "";
  constructor(
    private router: Router,
    private flashMessageService: FlashMessagesService,
    private spinnerService: Ng4LoadingSpinnerService
  ) {}

  ngOnInit() {}

  adminlogin() {
    if (!this.validateLogin()) {
      this.flashMessageService.show("One or more field is empty!", {
        cssClass: "alert-warning",
        timeout: 5000
      });
      return false;
    }
    this.spinnerService.show();
    if (this.username == "admin" && this.password == "root") {
      this.spinnerService.hide();
      this.flashMessageService.show("You are now logged in!", {
        cssClass: "alert-success",
        timeout: 5000
      });
      this.router.navigate(["admindashboard"]);
    } else {
      this.spinnerService.hide();
      this.flashMessageService.show("User or password is invalid", {
        cssClass: "alert-warning",
        timeout: 5000
      });
    }
  }

  validateLogin() {
    if (this.username == null || this.password == null) {
      return false;
    } else {
      return true;
    }
  }
}
