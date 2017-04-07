import { NgModule }           from '@angular/core';
import { RouterModule }       from '@angular/router';

import { AboutComponent }     from './about/about.component';
import { NoContentComponent } from './no-content/no-content.component';
import { LoginComponent, SignupComponent } from './login/index';
import { AdminClientComponent } from './admin/index';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'admin/client', component: AdminClientComponent },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'about', component: AboutComponent },
      { path: '**',    component: NoContentComponent }
    ], { useHash: true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
