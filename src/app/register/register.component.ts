import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formdata: any;
  data:any; 

  constructor( private router: Router,private api: ApiService, private http: HttpClient) { }

  ngOnInit(): void {
    this.formdata = new FormGroup(
      {
        fname : new FormControl("", Validators.compose([Validators.required])),
        lname : new FormControl("", Validators.compose([Validators.required])),
        email:new FormControl("", Validators.compose([Validators.required, Validators.email])),
        mobile: new FormControl("", Validators.compose([Validators.required,Validators.maxLength(10), Validators.pattern("^((\\+91-?) |0)?[0-9]{10}$")])),
        password : new FormControl("", Validators.compose([Validators.required,Validators.minLength(8)])) 
      })  
  }

  // passwordMatchingValidator(fg: FormGroup): Validators{
  //   return fg.get('password')?.value === fg.get('cpassword')?.value ? null : {nomatched: true}
  // }
onSubmit(data:any){
  // console.log(this.formdata.value );
  
  this.api.post("users", data).subscribe((result: any) =>
      {
        // res.end(JSON.stringify({status:"success", data:result}));
        console.log(result);
     if(result)
      {
      localStorage.setItem("usertype", "user");
      localStorage.setItem("email", result.email);
      this.router.navigate(['/', 'dashboard']);
      }
      Swal.fire('Thank you...', 'Register Succesfully..!', 'success');
    });
  }
}

// addUser(user: any){
//   let users= [];
//   if(localStorage.getItem('Users')){
//     users = JSON.parse(localStorage.getItem('Users')|| '{}');
//     users = [user, ...users];
//   }
//   else{
//     users= [user]
//   }
//   localStorage.setItem('Users', JSON.stringify(users))
// }
