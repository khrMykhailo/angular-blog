import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostInt } from '../shared/interfases';
import { PostServise } from '../shared/post.servise';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public posts$: Observable<PostInt[]>

  constructor(
    private postSer: PostServise
  ) { }

  ngOnInit(): void {
    this.posts$ = this.postSer.getAll()
  }

}
