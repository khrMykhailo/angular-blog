import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { PostInt } from 'src/app/shared/interfases';
import { PostServise } from 'src/app/shared/post.servise';
import { AlertService } from '../shared/servises/alert.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

  form: FormGroup
  postTh: PostInt
  submitted: boolean
  uSub: Subscription

  constructor(
    private route: ActivatedRoute,
    private postSer: PostServise,
    private alert: AlertService
  ) { }


  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((p: Params) => {
        return this.postSer.getById(p['id'])
      })
    ).subscribe((post: PostInt) => {
      this.postTh = post
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required)
      })
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }
    this.submitted = true
    this.uSub = this.postSer.update({
      ... this.postTh,
      title: this.form.value.title,
      text: this.form.value.text
    }).subscribe(() => {
      this.submitted = false
    })

    this.alert.warning('Вы внесли изменения в пост')
  }

  ngOnDestroy(): void {
    if (this.uSub) {
      this.uSub.unsubscribe()
    }
  }

}
