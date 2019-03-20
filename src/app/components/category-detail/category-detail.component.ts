import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { CategoryService } from 'src/app/services/category.service';
import { global } from '../../services/global';
import { Category } from 'src/app/models/category';
import { Post } from 'src/app/models/post';
import { UserService } from 'src/app/services/user.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css'],
  providers: [UserService, CategoryService, PostService]
})
export class CategoryDetailComponent implements OnInit {

  public page_title: string;
  public category: Category;
  public posts: Post[];
  public url: string;
  public identity: any;
  public token: any;

  constructor(
    private _categoryService: CategoryService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _postService: PostService,
    private _router: Router
  ) {
    this.url = global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    this.getPostsByCategory();
  }

  private getPostsByCategory(): void {
    this._route.params.subscribe(params => {
      const id = +params['id'];

      this._categoryService.getCategory(id).subscribe(
        response => {
          if (response.status == 'success') {
            console.log(response);
            this.category = response.categories;

            this._categoryService.getPosts(id).subscribe(
              response => {
                console.log(response);
                if (response.status == 'success') {
                  this.posts = response.post;
                } else {
                  this._router.navigate(['/inicio']);
                }
              },
              error => {
                console.log(<any>error);
              }
            );
          } else {
            this._router.navigate(['/inicio']);
          }
        },
        error => {
          console.log(<any>error);
        }
      );
    })
  }

  public deletePost(id: number | string): void {
    this._postService.delete(this.token, id).subscribe(
      response => {
        this.getPostsByCategory();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
