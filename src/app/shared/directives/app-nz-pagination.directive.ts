import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appAppNzPagination]'
})
export class AppNzPaginationDirective {
  @Input() nzPageSize = 10;
  @Output() appSkipCount = new EventEmitter<number>();

  constructor() { }

  @HostListener('nzPageIndexChange', ['$event'])
  indexChange(page: number) {
    this.appSkipCount.emit((page - 1) * this.nzPageSize);
  }


}
