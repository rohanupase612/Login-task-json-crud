import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiService } from '../api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  formdata: any;
  data: any;
  employeeData: any;
  editid: any;

  constructor(private router: Router, private api: ApiService, private http: HttpClient) { }

  ngOnInit(): void {
    this.formdata = new FormGroup(
      {
        id: new FormControl(""),
        fname: new FormControl("", Validators.compose([Validators.required])),
        lname: new FormControl("", Validators.compose([Validators.required])),
        email: new FormControl("", Validators.compose([Validators.required, Validators.email])),
        mobile: new FormControl("", Validators.compose([Validators.required, Validators.maxLength(10), Validators.pattern("^((\\+91-?) |0)?[0-9]{10}$")])),
        salary: new FormControl("", Validators.compose([Validators.required]))
      })

    this.getAllEmployee();
  }

  logout() {
    Swal.fire({
      title: 'Are you sure want to Log Out?',
      text: 'You will able to Login by username and password',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Logged out!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        localStorage.clear();
        this.router.navigate(['/', 'login'])
        Swal.fire(

          'Logged Out Succesfully...!',
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Thank You',
          'error'
        )
      }
    })

  }

  onSubmit(data: any) {
    console.log(data);
    this.editid = data.id;
    console.log(this.editid);
    

    // console.log(this.formdata.value );
    if (data.id == "" || data.id == null) {
      this.api.post("employee", data).subscribe((result: any) => {
        // res.end(JSON.stringify({status:"success", data:result}));
        console.log(result);
        if (result) {
          Swal.fire('Thank you...', 'Added Succesfully..!', 'success');
          this.formdata.reset();
          let close = document.getElementById('close');
          close?.click();
          this.getAllEmployee();
          // this.router.navigate(['/', 'dashboard']);
        }
      });
    }
    else {

      this.api.put("employee", data).subscribe((result: any) => {
        console.log(result);
          Swal.fire('Thank you...', 'Updated Succesfully..!', 'success');
          this.formdata.reset();
          let close = document.getElementById('close');
          close?.click();
          this.getAllEmployee();
          // this.router.navigate(['/', 'dashboard']);
      })
    }
  }




  getAllEmployee() {
    this.api.get("employee").subscribe((result: any) => {
      // console.log(result);


      this.employeeData = result;
      // console.log(this.employeeData);


    })
  }

  onEdit(data: any) {
    console.log(data.id);
    this.formdata = new FormGroup({
      id: new FormControl(data.id),
      fname: new FormControl(data.fname, Validators.compose([Validators.required])),
      lname: new FormControl(data.lname, Validators.compose([Validators.required])),
      email: new FormControl(data.email, Validators.compose([Validators.required, Validators.email])),
      mobile: new FormControl(data.mobile, Validators.compose([Validators.required, Validators.maxLength(10), Validators.pattern("^((\\+91-?) |0)?[0-9]{10}$")])),
      salary: new FormControl(data.salary, Validators.compose([Validators.required]))
    })


  }
  // updateEmployee(data:any){
  //   this.api.post("employee", data).subscribe((result: any) =>
  //     {
  //       // res.end(JSON.stringify({status:"success", data:result}));
  //       console.log(result);
  //    if(result)
  //     {
  //     Swal.fire('Thank you...', 'Updated Succesfully..!', 'success');
  //     this.formdata.reset();
  //     let close = document.getElementById('close');
  //     close?.click();
  //     this.getAllEmployee();
  //     // this.router.navigate(['/', 'dashboard']);
  //     }
  //   });
  // }


  deleteEmployee(data: any) {
    Swal.fire({
      title: 'Are you sure you want to Delete?',
      text: 'You will not able to See this Employee Data Again..!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete It!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {

        //Delete Api

        this.api.delete("employee", data).subscribe((result: any) => {
          // console.log(result);
        })
        Swal.fire(

          'Deleted Succesfully...!',
        )
        this.getAllEmployee();
      }
      else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Thank You',
          'error'
        )
      }
    })
    // this.api.delete("employee",data).subscribe((result:any)=>{
    //   // console.log(result);

    //   Swal.fire('Yes', 'Deleted Succesfully. .!', 'success');
    //   this.getAllEmployee();
    // })
  }
  refresh(){
    this.formdata.reset();
  }

}
