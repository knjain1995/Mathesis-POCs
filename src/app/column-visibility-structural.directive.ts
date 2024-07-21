import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appColumnVisibilityStructural]'
})
export class ColumnVisibilityStructuralDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

  // private hasView = false;

  // @Input() set appColumnVisibilityStructural(condition: boolean) {
  //   if (condition && !this.hasView) {
  //     this.viewContainer.createEmbeddedView(this.templateRef);
  //     this.hasView = true;
  //   } else if (!condition && this.hasView) {
  //     this.viewContainer.clear();
  //     this.hasView = false;
  //   }
  // }

  // private hasView = false;

  @Input() set appColumnVisibilityStructural(condition: boolean) {
    if (condition) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      // this.hasView = true;
    } else {
      this.viewContainer.clear();
      // this.hasView = false;
    }
  }

}
