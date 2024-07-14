import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Show} from "../../../models/show";
import {JsonPipe, NgForOf, NgOptimizedImage} from "@angular/common";
import {PreviewCardComponent} from "fly-movies-ux";
import {InfiniteScrollDirective} from "ngx-infinite-scroll";
import {Router} from "@angular/router";
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";

@Component({
  selector: 'app-shows',
  standalone: true,
  imports: [
    NgForOf,
    JsonPipe,
    PreviewCardComponent,
    InfiniteScrollDirective,
    NgxSkeletonLoaderModule,
    NgOptimizedImage
  ],
  templateUrl: './shows.component.html',
  styleUrl: './shows.component.scss'
})
export class ShowsComponent {

  @ViewChild("scroll",  { read: ElementRef }) scrollContainer: ElementRef;

  @Input() featured: Show[] = [];
  @Input() announcements: Show[] = [];

  sum = 100;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;

  constructor(private router: Router) {
  }

  goToDetail(title: string) {
    void this.router.navigate([`detail/${title}`]);
  }
}
