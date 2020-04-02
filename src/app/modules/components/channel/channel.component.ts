import { Component, OnInit } from '@angular/core';
import { Form, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Channel } from '../../../shared/models/Channel';
import { ToolbarService } from '../../../core/services/toolbar.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit {
  createChannelForm: Form;
  name = new FormControl('', [Validators.required]);
  channelsRef: any;

  constructor(
    private _router: Router,
    private firestore: AngularFirestore,
    private _toolbarService: ToolbarService
  ) { 
    // this.channelsRef = this.firestore.list('/channels');
    this.channelsRef = this.firestore.collection('channels').snapshotChanges();
  }

  ngOnInit() {
  }

  onCreateChannelButtonClick() {
    this.channelsRef.push(
      {
        name: this.name.value,
        timestamp: Date.now()
      }
    ).then(channel => {
      const c: Channel = {
        key: channel.key,
        name: this.name.value
      };

      this._toolbarService.currentChannel$.next(c);
      this._router.navigate(['']);
    });
  }

  onCancelButtonClick() {
    this._router.navigate(['']);
  }
}
