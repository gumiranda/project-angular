import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { UsersService } from "src/app/services/users.service";
import { HttpParams } from "@angular/common/http";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {
  page: number;
  maxSize: any = 5;
  currentPage = 1;
  username;
  users: Array<any> = [];
  user = {
    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg",
    email: "",
    first_name: "",
    id: 0,
    last_name: ""
  };
  length = 100;
  pageSize = 5;
  pageSizeOptions: number[] = [5];
  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.find(1);
    let usersStorage = JSON.parse(localStorage.getItem("user"));
    if(usersStorage.length !== undefined){
      if(usersStorage.length !== this.users.length){
       this.users = usersStorage;
      }
    }
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


  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(",").map(str => +str);
  }
  inserirUsuario() {
    this.user.id = this.length + 1;
    this.users = [...this.users, this.user];
    localStorage.removeItem("users");
    localStorage.setItem("users", JSON.stringify(this.users));
  }
  removerUser(userToRemove) {
    localStorage.removeItem("users");
    let usersFiltrados = this.users.filter(user => {
      return user.id !== userToRemove.id;
    });
    localStorage.setItem("users", JSON.stringify(usersFiltrados));
    this.users = usersFiltrados;
  }
}
