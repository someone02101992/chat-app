import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './modules/pages/home/home.component'
import { LoginComponent } from './modules/pages/login/login.component'
import { ChannelComponent } from './modules/components/channel/channel.component'
import { AuthGuardService } from './core/guards/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [AuthGuardService],
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'channel',
    canActivate: [AuthGuardService],
    component: ChannelComponent
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
}
