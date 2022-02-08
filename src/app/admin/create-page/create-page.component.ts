import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostInt } from 'src/app/shared/interfases';
import { PostServise } from 'src/app/shared/post.servise';
import { AlertService } from '../shared/servises/alert.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  form: FormGroup

  constructor(
    private postSer: PostServise,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required)
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    const newPost: PostInt = {
      title: this.form.value.title,
      text: this.form.value.text,
      author: this.form.value.author,
      date: new Date()
    }

    this.postSer.create(newPost).subscribe(() => {
      this.form.reset()
    })

    this.alert.success('Пост успешно создан')

  }

}
