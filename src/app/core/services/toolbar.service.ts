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

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) { }

  selectChannel(channel: Channel) {
    this.currentChannel$.next(channel);
  }

  chatroom(){
    // this.currentChannel$
    //   .pipe(distinctUntilChanged())
    //   .subscribe(channel => {
    //     if (channel) {
    //     this.channel = channel;
    //     this.firestore.collection(`/messages/${this.channel.key}`)
    //       .snapshotChanges()
    //       .pipe(takeUntil(this.authService.loggedOut$))
    //       .subscribe(actions => {
    //         this.messages = [];
    //         actions.forEach(action => {
    //           // const payload = action.payload.;
    //           // this.messages.push({
    //           //   userId: payload.userId,
    //           //   message: payload.message,
    //           //   timestamp: payload.timestamp,
    //           //   userName: payload.userName,
    //           //   photoUrl: payload.photoUrl
    //           // });
    //         });
    //       })
    //     }
    //   });
  }

  toolbarChannels() {
    // this.firestore.collectionGroup('channels').valueChanges().pipe(take(1)).subscribe(channels => {
    //   // map(channels, (channel, key) => {
    //   //   this.channels.push({
    //   //     key,
    //   //     name: channel.name
    //   //   });
    // });

    // this.firestore.collection('channels')
    // const channelsRef = this.firestore.collection('channels').snapshotChanges();
    // channelsRef
    //   .pipe(takeUntil(this.authService.loggedOut$))
    //   .subscribe(channels => {
    //     channels.forEach(channel => {
    //       console.log(channel);
    //       this.channels.push({
    //         key: channel.key,
    //         name: channel.payload.
    //       })
    //     })
    //   });

    // this.firestore.collection('/channels')
    // // , ref => {
    // //   // return ref
    // //   //   .orderByChild('timestamp')
    // //   //   .startAt(Date.now())
    // //   //   .limitToLast(1);
    // // })
    // .snapshotChanges()
    // .pipe(takeUntil(this.authService.loggedOut$))
    // .subscribe(channels => {
    //   channels.forEach(channel => {
    //     this.channels.push({
    //       key: channel.key,
    //       name: channel.payload.val.name
    //       // name: channel.payload.val().name
    //     });
    //   });
    // });
  }

}
