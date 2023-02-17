import { Component, OnInit } from '@angular/core';
import {Observable, take, timer} from "rxjs";


@Component({
  selector: 'app-observables-demo',
  template: `
  <app-observable-change-detection
    [items]="itemObservable">
    </app-observable-change-detection>
  `
})
export class ObservablesDemoComponent implements OnInit {
  itemObservable!: Observable<number>;

  constructor() { }

  ngOnInit() {
    this.itemObservable = timer(100, 100).pipe(take(101));
  }

}
