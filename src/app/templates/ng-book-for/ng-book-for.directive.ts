 import {
  Directive,
  IterableDiffer,
  IterableDiffers,
  ViewRef,
  ViewContainerRef,
  TemplateRef,
  DoCheck,
  Input
} from '@angular/core';

@Directive({
  selector: '[ngBookFor]'
})
export class NgBookForDirective implements DoCheck {
  private items: any;
  private differ!: IterableDiffer<any>;
  private views: Map<any, ViewRef> = new Map<
    any,
    ViewRef
  >();

  constructor(
    private viewContainer: ViewContainerRef,
    private template: TemplateRef<any>,
    private differs: IterableDiffers
  ) {}

  @Input()
  set ngBookForOf(items: any) {
    this.items = items;
    if (this.items && !this.differ) {
      this.differ = this.differs.find(items).create();
    }
  }

  ngDoCheck(): void {
    if (this.differ) {
      const changes = this.differ.diff(this.items);
      if (changes) {
        changes.forEachAddedItem(change => {
          const view = this.viewContainer.createEmbeddedView(
            this.template,
            { $implicit: change.item }
          );
          this.views.set(change.item, view);
        });
        changes.forEachRemovedItem(change => {
          const view = this.views.get(change.item);
          // @ts-ignore
          const idx = this.viewContainer.indexOf(view);
          this.viewContainer.remove(idx);
          this.views.delete(change.item);
        });
      }
    }
  }
}
