import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SlimLoadingBarService }  from 'ng2-slim-loading-bar';
import { AuthenticationService } from '../api/api/authentication.service';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: [ './signup.component.scss' ]
})

export class SignupComponent implements OnInit {
  public model: any = {};
  public loading = false;
  public error = '';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private slimLoadingBarService: SlimLoadingBarService) { }

  public ngOnInit() {
    // reset login status
    this.authenticationService.logout();
  }

  public login() {
    this.slimLoadingBarService.start();
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe((result) => {
        if (result === true) {
          // this.router.navigate(['/']);
          // Navigate back to schedule view
          this.router.navigateByUrl('appointment/attendance');
        } else {
          this.error = 'Username or password is incorrect';
          this.slimLoadingBarService.stop();
        }
      });
  }
}
