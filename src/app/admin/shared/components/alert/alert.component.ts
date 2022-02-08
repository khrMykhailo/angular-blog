import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from '../../servises/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

  @Input() delay = 5000;
  public text: string
  public type = 'success'
  aSub: Subscription

  constructor(
    private alertSer: AlertService
  ) { }


  ngOnInit(): void {
    this.aSub = this.alertSer.alert$.subscribe(a => {
      this.text = a.text
      this.type = a.type

      const timeout = setTimeout(() => {
        clearTimeout(timeout)
        this.text = ''
      }, this.delay)
    })
  }
  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

}
