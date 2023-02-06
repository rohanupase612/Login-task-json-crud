import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


 public info: any= "";
  baseurl = "http://localhost:3000/";

  constructor(private http:HttpClient) { }

  get(url:string){
    return this.http.get(this.baseurl + url);
  }

  post(url:string, data:any){
    return this.http.post(this.baseurl + url, data);
  }

  put(url:string, data:any){
    return this.http.put(this.baseurl + url + "/" + data.id, data);
  }

  delete(url:string, data:any){
    return this.http.delete(this.baseurl + url + "/" + data.id);
  }

}

