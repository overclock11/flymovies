import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatTabsModule} from "@angular/material/tabs";
import {OmdbService} from "../../api/omdb.service";
import {Show} from "../../models/show";
import {forkJoin} from "rxjs";
import {ShowsComponent} from "./shows/shows.component";
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatTabsModule, ShowsComponent, NgxSkeletonLoaderModule, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  featured: Show[];
  announcements: Show[];

  page = 1;
  years = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
  isLoading = true;

  constructor(private omdbService: OmdbService) {
  }

  ngOnInit() {
    const randomYear = Math.floor(Math.random() * (12));
    //const randomTitle = new Date().toLocaleDateString('es-co',{weekday: 'long'}).split("")[0];
    const randomTitle ='marvel';
    forkJoin([
      this.omdbService.getShows(randomTitle, 'movie', this.page, this.years[randomYear]),
      this.omdbService.getShows(randomTitle, 'movie', this.page)
    ]).subscribe(([featured, announcements]) => {
      this.featured = featured.Search;
      this.announcements = announcements.Search;
      this.isLoading = false;
    });
  }
}
