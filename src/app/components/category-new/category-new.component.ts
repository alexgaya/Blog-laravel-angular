import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Category } from '../../models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.css'],
  providers: [UserService, CategoryService]
})
export class CategoryNewComponent implements OnInit {

  public page_title: string;
  public token: any;
  public identity: any;
  public category: Category;
  public status: string;

  constructor(
    private _categoryService: CategoryService,
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = 'Crear nueva categoría';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.category = new Category(1, '');
  }

  ngOnInit() {
  }

  public onSubmit(form) {
    this._categoryService.create(this.token, this.category).subscribe(
      response => {
        if (response.status == 'success') {
          this.category = response.category;
          this.status = 'success';

          this._router.navigate(['/inicio']);
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

}
