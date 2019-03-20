import { Component, OnInit } from '@angular/core';

import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { global } from '../../services/global';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [PostService, UserService]
})
export class ProfileComponent implements OnInit {

  public url: string;
  public posts: Post[];
  public identity: any;
  public token: any;
  public user: User;


  constructor(
    private _postService: PostService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.url = global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    this.getProfile();
  }

  private getProfile(): void {
    this._route.params.subscribe(params => {
      const userId = +params['id'];
      this.getUser(userId);
      this.getPosts(userId);
    });
  }

  private getUser(userId) {
    this._userService.getUser(userId).subscribe(
      response => {
        if (response.status == 'success') {
          this.user = response.user;
          console.log(this.user);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  public getPosts(userId): void {
    this._userService.getPosts(userId).subscribe(
      response => {
        if (response.status == 'success') {
          this.posts = response.posts;
          console.log(this.posts);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }



  public deletePost(id: number | string): void {
    this._postService.delete(this.token, id).subscribe(
      response => {
        this.getProfile();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
