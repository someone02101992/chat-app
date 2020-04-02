import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
// import { AngularFireModule } from 'angularfire2';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { ChatroomComponent } from './modules/components/chatroom/chatroom.component';
import { ToolbarComponent } from './modules/components/toolbar/toolbar.component';
import { HomeComponent } from './modules/pages/home/home.component';
import { LoginComponent } from './modules/pages/login/login.component';
import { ChannelComponent } from './modules/components/channel/channel.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './core/services/auth.service';
import { AuthGuardService } from './core/guards/auth-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToolbarService } from './core/services/toolbar.service';

@NgModule({
  declarations: [
    AppComponent,
    ChatroomComponent,
    ToolbarComponent,
    HomeComponent,
    LoginComponent,
    ChannelComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    ToolbarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
