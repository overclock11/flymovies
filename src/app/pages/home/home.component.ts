import {Component, OnInit} from '@angular/core';
import {MatTabsModule} from "@angular/material/tabs";
import {OmdbService} from "../../api/omdb.service";
import {Show} from "../../models/show";
import {forkJoin} from "rxjs";
import {ShowsComponent} from "./shows/shows.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatTabsModule, ShowsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  featured: Show[];
  announcements: Show[];

  page = 1;
  years = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

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
    });
  }
}