import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { PostInt } from '../shared/interfases';
import { PostServise } from '../shared/post.servise';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  public post$: Observable<PostInt>

  constructor(
    private route: ActivatedRoute,
    private postSer: PostServise
  ) { }

  ngOnInit(): void {
    this.post$ = this.route.params
      .pipe(
        switchMap((par: Params) => {
          return this.postSer.getById(par['id'])
        })
      )
  }

}
