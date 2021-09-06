import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../admin/user-management/user-management.model';
import { UserService } from '../../entities/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent implements OnInit {
  users: User[] = [];
  searchKey: string;
  displayedColumns: string[] = [
    'id',
    'login',
    'first name',
    'last name',
    'email',
    'activated',
    'lang key',
    'authorities',
    'created by',
    'created',
    'options',
  ];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.dataSource.data = users;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  onClearSearch(): void {
    this.searchKey = '';
  }

  applyFilter(): void {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  onEditUser(id: number): void {
    // eslint-disable-next-line no-console
    this.router.navigate([`registration/${id}`]).then(value => console.log(id));
  }

  createUser(): void {
    this.router.navigate(['registration']);
  }
}
