import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

import * as firebase from 'firebase/app';
import { User } from '../../shared/models/User';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

export interface UserProfile {
  email: string;
  userId: string;
}

@Injectable()
export class AuthService {

  public get user$(): Observable<UserProfile> {
    return this._user.asObservable();
  }

  private _user: Subject<UserProfile> = new Subject();
  private currentUserSubject = new BehaviorSubject<User>(null);
  currentUser$: Observable<User> = this.currentUserSubject.asObservable();
  loggedOut$: Subject<boolean> = new Subject<boolean>();

  private profilesCollection: AngularFirestoreCollection;
  
  constructor(private afAuth: AngularFireAuth,
              // private _db: AngularFireDatabase,
              private firestore: AngularFirestore) {
    this.profilesCollection = this.firestore.collection('profiles');
    this.afAuth.authState
      .pipe(
        filter(user => !!user),
        switchMap(user => {
          return this.profilesCollection.doc<UserProfile>(user.uid).get();
        })
      )
      .subscribe((document) => {
        console.log(document.data());
        this._user.next(document.data() as UserProfile);
      });
  }

  async createUser(email: string, password: string): Promise<void> {
    const result = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    
    return this.profilesCollection.doc(result.user.uid).set({
      userId: result.user.uid,
      email: result.user.email
    });
  }

  login(email: string, password: string) {
    console.log(this._user);
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this._user.next(null);
    return this.afAuth.auth.signOut();
  }
}
