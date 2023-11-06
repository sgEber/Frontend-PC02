import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getUsers().subscribe({
      next: (data) => {
        console.log(data);  // ¿Se muestran los usuarios aquí?
        this.users = data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}