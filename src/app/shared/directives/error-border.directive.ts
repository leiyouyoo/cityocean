import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Directive({
  selector: '[errorBorder]',
})
export class ErrorBorderDirective implements OnInit {

  _errorBorder: boolean = false;
  @Input() set errorBorder(value: boolean) {
    this._errorBorder = value;
    this.setClass() ;
  }
  private matchExp: RegExp;
  private addedClassName = 'redborder';

  constructor(private router: Router,
    private elementRef: ElementRef,
    private renderer: Renderer2,
  ) {
  }

  ngOnInit(): void {
   
  }

  setClass() {
    const el = this.elementRef.nativeElement;
    if(!el) return;
    if (this._errorBorder) {
      this.renderer.addClass(this.elementRef.nativeElement, this.addedClassName);
    } else {
      this.renderer.removeClass(el, this.addedClassName);
    }

  }
}
