import { Component, OnInit } from "@angular/core";
import { UsersService } from "src/app/services/users.service";
import { HttpParams } from "@angular/common/http";
import { PageEvent } from "@angular/material/paginator";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"]
})
export class MainComponent implements OnInit {
  page: number;
  maxSize: any = 5;
  currentPage = 1;
  username;
  users: Array<any> = [];
  user = {
    avatar:"https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg",
    email:"",
    first_name:"",
    id:0,
    last_name:""
  };

  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.find(1);
    //this.user = JSON.parse(localStorage.getItem("user"));
//localStorage.setItem('url',this.document.location.href);
//    localStorage.removeItem(TOKEN_NAME);

}
  find(page) {
    var httpParam = new HttpParams();
    httpParam = httpParam.set("per_page", this.pageSize.toString());
    httpParam = httpParam.set("page", page);
    this.userService.findAll(httpParam).subscribe(response => {
      const r = response;
      this.users = r.data;
      this.length = r.total;
    });
  }
  getUsers(event: any): void {
    this.find(event.pageIndex + 1);
  }
  length = 100;
  pageSize = 5;
  pageSizeOptions: number[] = [5];
  pageEvent: PageEvent;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(",").map(str => +str);
  }
  inserirUsuario(){
    console.log(this.users);
    this.user.id = this.length + 1;
    this.users = [...this.users, this.user];
  }

}
