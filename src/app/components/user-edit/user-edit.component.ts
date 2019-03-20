import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {

  public page_title: string;
  public user: User;
  public identity: any;
  public token: any;
  public status: string;
  public url: string;

  public froala_options: Object = {
    charCounterCount: true,
    language: 'es',
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat'],
  };
  public afuConfig: Object = {
    multiple: false,
    formatsAllowed: ".jpg, .png, .jpeg, .gif",
    maxSize: "50",
    uploadAPI: {
      url: `${global.url}user/upload`,
      headers: {
        "Authorization": this._userService.getToken()
      }
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    attachPinText: 'Sube tu avatar de usuario'
  };
  constructor(private _userService: UserService) {
    this.page_title = "Ajustes de usuario";
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.user = new User(
      this.identity.sub,
      this.identity.name,
      this.identity.surname,
      this.identity.role,
      this.identity.email,
      this.identity.password,
      this.identity.description,
      this.identity.image
    );
    this.url = global.url;
  }

  ngOnInit() {
  }

  public onSubmit(form) {
    this._userService.update(this.token, this.user).subscribe(
      response => {
        console.log(response);
        if (response && response.status == 'success') {
          this.status = 'success';

          this.user.name = (response.changes.name) ? response.changes.name : this.user.name;
          this.user.surname = (response.changes.surname) ? response.changes.surname : this.user.surname;
          this.user.email = (response.changes.email) ? response.changes.email : this.user.email;
          this.user.description = (response.changes.description) ? response.changes.description : this.user.description;
          this.user.image = (response.changes.image) ? response.changes.image : this.user.image;
          this.identity = this.user;

          localStorage.setItem('identity', JSON.stringify(this.identity));
        } else {
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    );
  }

  public avatarUpload(datos) {
    let data = JSON.parse(datos.response);
    this.user.image = data.image;
  }

  /*private escapeHtml(text) {
    var map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
    //return text.replace(/[&<>"']/g, m => map[m]);
  }*/

}
