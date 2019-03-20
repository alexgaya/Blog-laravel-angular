import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [PostService]
})
export class PostDetailComponent implements OnInit {

  public post: Post;

  constructor(
    private _postService: PostService,
    private _route: ActivatedRoute,
    private _router: Router
    ) { }

  ngOnInit() {
    this.getPost();
  }


  public getPost() {
    // Sacar id de url
    this._route.params.subscribe(params => {
      let id = +params['id'];
      
      // Petición ajax
      this._postService.getPost(id).subscribe(
        response => {
          if (response.status == 'success') {
            this.post = response.posts;
            console.log(this.post);
          } else {
            this._router.navigate(['/inicio']);
          }
        },
        error => {
          console.log(<any>error);
          this._router.navigate(['/inicio']);
        }
      );
    });

    

  }

}
