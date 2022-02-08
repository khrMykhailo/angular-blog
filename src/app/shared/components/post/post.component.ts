import { Component, Input, OnInit } from '@angular/core';
import { PostInt } from '../../interfases';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post: PostInt

  constructor() { }

  ngOnInit(): void {
  }

}
