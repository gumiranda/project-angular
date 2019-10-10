import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { HttpParams } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  page: number;
  maxSize: any = 5;
  currentPage = 1;
  users:Array<any> = [];
  constructor(private userService:UsersService) { }

  ngOnInit() {
    this.find(1);
  }
  find(page) {
    var httpParam = new HttpParams();
    httpParam = httpParam.set("per_page",this.pageSize.toString());
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
    // MatPaginator Inputs
    length = 100;
    pageSize = 5;
    pageSizeOptions: number[] = [5];

    // MatPaginator Output
    pageEvent: PageEvent;

    setPageSizeOptions(setPageSizeOptionsInput: string) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
}
