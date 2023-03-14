import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { errorInterface, signupInterface } from '../Interface';
import { regValidation } from '../validate';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private reg: regValidation, private router: Router, private toast: ToastrService, private auth: AuthService) { }
  Errordata = { errorInterface }
  onSubmitHandler(data: typeof signupInterface) {

    let count = this.reg.validateAll(data)
    if (data.cpassword === data.password && count === 4) {
      // const infoData = {
      //   name: data.name, email: data.email, password: data.password
      // }
      this.auth.signUp(data).subscribe(res => {
        console.warn(res)
        if (res.messages.success === 'true') {
          this.toast.success("Account Successful Created")

          this.router.navigate(["/login"])
        }
        else {
          this.toast.error("Account Already Exist")
          // console.log("Account Already Exist")
        }
      })
    }
    else {
      this.toast.error("Failed");
      //  console.error("Failed")
    }
  }
}
  

    