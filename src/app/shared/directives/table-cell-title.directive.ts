import { AfterViewChecked, Directive, ElementRef, Input, Renderer2 } from '@angular/core';

/**
 * set data-no-title to prevent setting title on td
 */
@Directive({
  selector: 'nz-table[nzData]'
})
export class TableCellTitleDirective implements AfterViewChecked {
  lastNzData: any[] = [];
  _nzData: any[] = [];
  @Input() set nzData(val) {
    if (val) {
      this._nzData = val;
    }
  }
  el: HTMLElement;

  constructor(private render: Renderer2,
              private elRef: ElementRef,
  ) {
    this.el = this.elRef.nativeElement;
  }

  ngAfterViewChecked() {
    if (this.lastNzData.length !== this._nzData.length) {
      this.detectDataChange();
      return;
    }

    for (let i = 0; i < this.lastNzData.length; i++) {
      if (this.lastNzData[i] !== this._nzData[i]) {
        this.detectDataChange();
        return;
      }
    }
  }

  detectDataChange() {
    this.lastNzData = this._nzData;
    this.addTitle();
  }

  addTitle() {
    const tdList = this.el.querySelectorAll('td');
    tdList.forEach(tdNode => {
      if (tdNode.innerText && !('noTitle' in tdNode.dataset)) {
        this.render.setAttribute(tdNode, 'title', tdNode.innerText);
      }
    });
  }
}
