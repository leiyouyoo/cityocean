import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-message-rolling",
  templateUrl: "./message-rolling.component.html",
  styleUrls: ["./message-rolling.component.scss"]
})
export class MessageRollingComponent implements OnInit {
  @Input() massgeList = []
  constructor() {}

  ngOnInit() {
    let speed = 40;
    let massage = document.getElementById("massage");
    let massage2 = document.getElementById("massage2");
    let massage1 = document.getElementById("massage1");
    // massage2.innerHTML = massage1.innerHTML;
    function Marquee() {
      if (massage2.offsetTop - massage.scrollTop <= 0) {
        massage.scrollTop -= massage1.offsetHeight;
      } else {
        massage.scrollTop++;
      }
    }
    if(this.massgeList.length>1){
      let MyMar = setInterval(Marquee, speed);
      massage.onmouseover = function() {
        clearInterval(MyMar);
      };
      massage.onmouseout = function() {
        MyMar = setInterval(Marquee, speed);
      };
    }
  }
}
