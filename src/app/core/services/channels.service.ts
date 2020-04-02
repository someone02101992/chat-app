import { Injectable } from '@angular/core';
import { Channel } from '../../shared/models/Channel';
import { Message } from '../../shared/models/Message';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { takeUntil, switchMap, take, distinctUntilChanged } from 'rxjs/operators';

@Injectable()
export class ToolbarService {
  currentChannel$ = new BehaviorSubject<Channel>(null);
  channels: Channel[] = [];
  channel: Channel;
  messages: Message[] = [];
  channelsRef: any;

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService,
    private _router: Router
  ) { 
    this.channelsRef = this.firestore.collection('channels').snapshotChanges();
  }

createChannel() {
    this._router.navigate(['/channel']);
}

selectChannel(channel: Channel) {
  console.log('Channel selected!');
    // this._toolbarService.selectChannel(channel);
}

}