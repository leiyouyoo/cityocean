import { Component, OnInit, ViewChild } from "@angular/core";
import { NavController, IonSlides } from "@ionic/angular";

@Component({
  selector: "app-guide",
  templateUrl: "./guide.page.html",
  styleUrls: ["./guide.page.scss"]
})
export class GuidePage implements OnInit {
  @ViewChild(IonSlides, { static: true }) ionslides: IonSlides;
  constructor(private nav: NavController) {}
  slides = [
    {
      order0: 0,
      order1: 1,
      order2: 2
    },
    {
      order0: 1,
      order1: 0,
      order2: 2
    },
    {
      order0: 2,
      order1: 0,
      order2: 1
    }
  ];
  ngOnInit() {}

  skipGuide() {
    this.nav.navigateRoot("/login");
  }
  slideNext(){
    this.ionslides.isEnd().then(res => {
      res && this.skipGuide();
      return;
    });
    this.ionslides.slideNext()
  }
  ionSlideDrag() {
    this.ionslides.isEnd().then(res => {
      res && setTimeout(()=>{
        this.skipGuide();
      },100) 
    });
  }
}
