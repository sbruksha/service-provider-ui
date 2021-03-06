import { Component, OnInit }      from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SlimLoadingBarService }  from 'ng2-slim-loading-bar';
import { AuthenticationService }  from '../api/api/authentication.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})

export class LoginComponent implements OnInit {
  public model: any = {};
  public returnUrl: string;
  public error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private slimLoadingBarService: SlimLoadingBarService) { }

  public ngOnInit() {
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  public login() {
    this.slimLoadingBarService.start();
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe((result)  => {
        if (result === true) {
          this.router.navigate([this.returnUrl]);
        } else {
          this.error = 'Email or password is incorrect';
          this.slimLoadingBarService.stop();
        }
      });
  }
}
