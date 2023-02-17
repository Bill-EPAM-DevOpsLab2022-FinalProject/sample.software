import {
  Component,
  Input,
  Output,
  EventEmitter,
  KeyValueDiffers,
  DoCheck, KeyValueDiffer
} from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html'
})
export class CommentComponent implements DoCheck {
  @Input() comment: any;
  @Output() onRemove: EventEmitter<any>;
  differ: KeyValueDiffer<any, any>;

  constructor(differs: KeyValueDiffers) {
    this.differ = differs.find([]).create();
    this.onRemove = new EventEmitter();
  }

  ngDoCheck(): void {
    const changes = this.differ.diff(this.comment);

    if (changes) {
      changes.forEachAddedItem((r: any) =>
        this.logChange({action: 'added', r: r})
      );
      changes.forEachRemovedItem((r: any) =>
        this.logChange({action: 'removed', r: r})
      );
      changes.forEachChangedItem((r: any) =>
        this.logChange({action: 'changed', r: r})
      );
    }
  }

  logChange({action, r}: { action: any, r: any }) {
    if (action === 'changed') {
      console.log(
        r.key,
        action,
        'from',
        r.previousValue,
        'to',
        r.currentValue
      );
    }
    if (action === 'added') {
      console.log(action, r.key, 'with', r.currentValue);
    }
    if (action === 'removed') {
      console.log(
        action,
        r.key,
        '(was ' + r.previousValue + ')'
      );
    }
  }

  remove(): void {
    this.onRemove.emit(this.comment);
  }

  clear(): void {
    delete this.comment.comment;
  }

  like(): void {
    this.comment.likes += 1;
  }
}
