import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Show} from "../../../models/show";
import {JsonPipe, NgForOf} from "@angular/common";
import {PreviewCardComponent} from "fly-movies-ux";
import {InfiniteScrollDirective} from "ngx-infinite-scroll";

@Component({
  selector: 'app-shows',
  standalone: true,
  imports: [
    NgForOf,
    JsonPipe,
    PreviewCardComponent,
    InfiniteScrollDirective
  ],
  templateUrl: './shows.component.html',
  styleUrl: './shows.component.scss'
})
export class ShowsComponent implements OnInit {

  @ViewChild("scroll",  { read: ElementRef }) scrollContainer: ElementRef;

  @Input() featured: Show[] = [];
  @Input() announcements: Show[] = [];

  sum = 100;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;

  ngOnInit(): void {

  }

  scrolling() {
    this.scrollContainer.nativeElement.scrollLeft = 1;
  }

  onScrollDown(ev: any) {
    console.log("scrolled down!!", ev);
  }

  onUp(ev: any) {
    console.log("scrolled up!", ev);
  }
}
