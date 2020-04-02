import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/models/User';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: User;
  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this._authService.currentUser$.subscribe(user => {
      this.user = user;
    });
  }

}
