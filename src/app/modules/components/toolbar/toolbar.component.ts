import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
// import { AngularFireDatabase } from 'angularfire2/database';
import { User } from '../../../shared/models/User';
import { Channel } from '../../../shared/models/Channel';
import map from 'lodash/map';
import { ToolbarService } from '../../../core/services/toolbar.service';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { takeUntil, switchMap } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input()
  user: User;
  channels: Channel[] = [];

  constructor(
    // private _db: AngularFireDatabase,
    private firestore: AngularFirestore,
    private _toolbarService: ToolbarService,
    private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  onChannelClick(channel: Channel) {
    this._toolbarService.selectChannel(channel);
  }

  onCreateChannelButtonClick() {
    console.log('Navigating');
    this._router.navigate(['/channel']);
  }
}