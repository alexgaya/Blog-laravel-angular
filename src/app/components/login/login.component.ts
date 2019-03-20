import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public page_title: string;
  public user: User;
  public status: string;
  public token: any;
  public identity: any;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = 'Identifícate';
    this.user = new User(
      1,
      '',
      '',
      'ROLE_USER',
      '',
      '',
      '',
      ''
    );
  }

  ngOnInit() {
    // Se ejecuta siempre y cierra sesión solo cuando le llega el parámetro sure por la url
    this.logout();
  }

  public onSubmit(form) {
    this._userService.signup(this.user).subscribe(
      response => {
        if (response.status != 'error') {
          this.status = 'success';
          this.token = response;
          this._userService.signup(this.user, true).subscribe(
            response => {
              this.identity = response;
              console.log(this.token);
              console.log(this.identity);

              // Persistencia de datos
              localStorage.setItem('token', this.token);
              localStorage.setItem('identity', JSON.stringify(this.identity));

              this._router.navigate(['inicio']);
            },
            error => {
              console.log(<any>error);
              this.status = 'error';
            }
          );
        } else {
          this.status = 'error';
          console.log(response);
        }
      },
      error => {
        console.log(<any>error);
        this.status = 'error';
      }
    );
  }

  public logout() {
    this._route.params.subscribe(params => {
      let logout = +params['sure'];

      if (logout == 1) {
        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        this.identity = null;
        this.token = null;

        // Redirección a inicio
        this._router.navigate(['inicio']);
      }
    });
  }

}
