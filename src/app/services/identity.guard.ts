import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class IdentityGuard implements CanActivate {

  constructor(
    private _router: Router,
    private _userService: UserService
  ) { }

  canActivate() {
    const checkIndentity = this._userService.getIdentity();
    
    if(checkIndentity) {
      return true;
    } else {
      this._router.navigate(['/error']);
      return false;
    }
  } 

}
