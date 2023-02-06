import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ApiService } from "../api.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formdata: any;
  user: any;

  constructor(private http: HttpClient,private api: ApiService, private router: Router, ) { }

  ngOnInit(): void {
    
  
  if (localStorage.getItem("usertype") !== null) {
    this.user = localStorage.getItem("usertype")!;
    if (this.user) {
      this.router.navigate(['/', 'dashboard']);
    }
  }
  this.formdata = new FormGroup({
    email: new FormControl("", Validators.compose([Validators.required, Validators.email])),
    password: new FormControl("", Validators.required)
  })

}
login(data: any) {
  this.api.get("users").subscribe((result: any) => {
    result.forEach((ele: any) => {
      if (data.email === ele.email && data.password === ele.password){
        this.router.navigate(['/', 'dashboard']);
        localStorage.setItem("usertype", "user");
        localStorage.setItem("email", ele.email);
        return true;
      }
      return false;
    });
  });
}
}