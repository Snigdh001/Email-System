import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { timestamp } from 'rxjs';
import { AuthService } from '../auth.service';
import { regValidation } from '../validate';
import { mailRes, mailRess } from '../Interface';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-indox',
  templateUrl: './indox.component.html',
  styleUrls: ['./indox.component.css']
})
export class IndoxComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router, private reg: regValidation, private toastr: ToastrService,private appObj:AppComponent) { this.appObj.status()}
  ngOnInit(): void {
    let data = this.getSession()
    this.auth.allEmail(data.email).subscribe(res => {  this.mails.data = res.data.reverse() })
    this.auth.allEmailSent(data.email).subscribe(res => {  this.sentMails.data = res.data.reverse() })
    // this.preview=false;
  }
  emailregex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{1,5}$/i;
  mails: mailRess = {
    data: [],
    emailCount: 0
  }
  sentMails: mailRess = {
    data: [],
    emailCount: 0
  }
  currentData = this.mails.data[0]
  preview=false
  page='inbox'
  emailEr=""
  email=""
  validEmail=false
  senderid=""
  senderemail=""
  clicked(data: mailRes) {
    // console.warn(this.currentData.date)
    this.currentData = data;
    this.preview=true
    if(this.page=='inbox' && this.currentData.readStatus=='unread'){
      this.auth.readStatus( this.currentData.id).subscribe(res =>{console.warn(res)})
      this.currentData.readStatus='read';
      
    }

  }
  getSession() {
    let session = localStorage.getItem("Session")
    if (session) {
      let data = JSON.parse(session)
      this.senderemail=data.email
      this.senderid=data.id
      return data
    }
  }
  checkEmail() {
    
    
    let emailInput=this.email
    if (emailInput === "") {
        this.emailEr = "Email is Required";
        this.validEmail=false;
        return false
    }
    else {
        if (this.emailregex.test(emailInput) === false) {
            this.emailEr = "Please Enter Valid Email Address i.e xyz@abc.in";
            this.validEmail=false;
            return false
        }
        else {
            this.emailEr = ""
            this.validEmail=true;
            return true
        }
    }
}
  

  onSubmitHandler(data: Event) {
    const info = new FormData(data.target as HTMLFormElement)
    // console.error(info.get('attachment'))
    info.set('user_id',this.senderid)
    info.set('sender',this.senderemail)
    if(info.get('subject')=="")
    {
    info.set('subject','No Subject')
    }
    const mailInfo = {
      receiver: info.get('recipient'),
      subject: info.get('subject'),
      message: info.get('message'),
      file: info.get('attachment'),
    }
    // console.warn(mailInfo);
   
    this.auth.newMail(info).subscribe(res => {
      console.warn(res);
      if (res.messages.success === "true") {
        this.toastr.success('Email Sent');
        this.ngOnInit()
      }
      else {
        this.toastr.error('Email Failed');
      }

    })

  }

}
