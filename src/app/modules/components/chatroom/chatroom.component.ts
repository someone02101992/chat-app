import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
// import { AngularFireDatabase } from 'angularfire2/database';
import { User } from '../../../shared/models/User';
import { ToolbarService } from '../../../core/services/toolbar.service';
import { Message } from '../../../shared/models/Message';
import { Channel } from '../../../shared/models/Channel';
import { takeUntil, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent implements OnInit {
  @Input()
  user: User;
  messages: Message[] = [];
  channel: Channel;
  
  constructor(
    private _toolbarService: ToolbarService,
    private _authService: AuthService,
    private _router: Router,
    private firestore: AngularFirestore) { }

  ngOnInit() {
  }

  logout() {
    this._authService.logout().then(() => {
      this._router.navigate(['/login']);
    });
  }

  onAddMessage(message: string) {
    if (message !== '') {
      const messages = this.firestore.collection(`/messages/${this.channel.key}`);

      messages.add({
        message,
        timestamp: new Date().toISOString(),
        userName: this.user.username,
        photoUrl: this.user.photoUrl
      });
    }
  }
}
