import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { errorInterface } from '../Interface';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { regValidation } from '../validate';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private auth: AuthService, private router: Router, private reg: regValidation, private toastr: ToastrService,private appObj:AppComponent) {this.appObj.status() }
  Errordata = { errorInterface }

  onSubmitHandler(data: NgForm) {
    let count = this.reg.validateAll(data)

    if (count == 2) {
      this.auth.login(data).subscribe(res => {
        if (res.messages.success == "true") {
          const session = {
            id: res.messages.id,
            email: res.messages.email,
            name: res.messages.name,
            isLoggedin: res.messages.success,
          }
          
          localStorage.setItem("Session", JSON.stringify(session))
          this.toastr.success('Logged In Successfully');
          this.router.navigate(['mail'])
        }
        else if (res.messages.success == "false") {
          this.toastr.warning('Wrong Credentials', 'Failed', { progressBar: true });
        }
      })
    }
    else {
      this.toastr.error('Check Your Details', 'Failed', { progressBar: true });
    }

  }

}
  
