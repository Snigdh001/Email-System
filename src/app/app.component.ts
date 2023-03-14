import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css','../../src/assets/css/bootstrap.min.css', '../../src/assets/css/boxicons.min.css', '../../src/assets/css/style.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'email';
  isLogin=false;
  constructor(private toastr:ToastrService,private router:Router){ this.status()}
  status() {
    // console.log("Called")
    const session = localStorage.getItem("Session")
    if (session) {
      const sessionData = JSON.parse(session)

      this.isLogin=sessionData.isLoggedin
      

    }
    else
      this.isLogin = false
    
      
      
  }
  logout() {
    localStorage.removeItem('Session')
    this.toastr.success('Logged Out Successfully', 'Success', { progressBar: true });
    this.status()
    this.router.navigate(['/'])
    return true
  }
}
 