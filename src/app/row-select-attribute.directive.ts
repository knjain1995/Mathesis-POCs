import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appRowSelectAttribute]'
})
export class RowSelectAttributeDirective {

  constructor(
    private eleRef: ElementRef,
    private renderer: Renderer2
  ) {}

  // subscribe to the click event on an element. when clicked onCLick is called
   @HostListener('click') onClick() {
    this.toggleRowSelection();  // onclick calls toggleRowSelection
   }

   // method to assign/ unassign selected class to element. selected class has a css style which is applied to it
   toggleRowSelection() {
    const row = this.eleRef.nativeElement;  // get reference of the selected element
    const isSelected = row.classList.contains('rowSelected');  // check if rowSelected is a class of the element

    if (isSelected) {
      this.renderer.removeClass(row, 'rowSelected'); // if already selected, deselect
    } else {
      this.renderer.addClass(row, 'rowSelected'); // if not already selected, assign rowSelected to row
    }
  }
}
