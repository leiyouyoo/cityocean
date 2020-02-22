import { Directive, ElementRef, HostListener, Input, NgZone, OnInit } from '@angular/core';

@Directive({
  selector: '[imgFailed]'
})
export class ImgFailedDirective implements OnInit {
  @Input() imgFailed = '';

  constructor(private el: ElementRef,
              private zone: NgZone,
              ) { }

  ngOnInit(): void {
    const el = this.el.nativeElement as HTMLImageElement;
    const listener = (e) => {
      el.src = this.imgFailed;
      el.removeEventListener('error', listener);
    };
    this.zone.runOutsideAngular(() => {
      el.addEventListener('error', listener);
    });
  }
}
