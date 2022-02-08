import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostInt } from 'src/app/shared/interfases';
import { PostServise } from 'src/app/shared/post.servise';
import { AlertService } from '../shared/servises/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  public posts: PostInt[]
  pSub: Subscription
  dSub: Subscription
  searchStr: string = ''
  constructor(
    private postSer: PostServise,
    private alert: AlertService
  ) { }



  ngOnInit(): void {
    this.postSer.getAll().subscribe((resp) => {
      this.posts = resp
    })
  }

  remove(id: string | undefined) {

    this.dSub = this.postSer.removeSer(id!).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id)
    })

    this.alert.danger('Пост будет удалён безвозвратно')

  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }

    if (this.dSub) {
      this.dSub.unsubscribe()
    }
  }



}
