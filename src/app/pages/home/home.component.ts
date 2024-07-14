import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatTabsModule} from "@angular/material/tabs";
import {OmdbService} from "../../api/omdb.service";
import {Show} from "../../models/show";
import {firstValueFrom, forkJoin} from "rxjs";
import {ShowsComponent} from "./shows/shows.component";
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";
import {NgIf} from "@angular/common";
import {ShowType} from "../../enum/show-type";
import {ERROR_MESSAGE} from "../../constants/errorMessage";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatTabsModule, ShowsComponent, NgxSkeletonLoaderModule, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  featuredMovies: Show[];
  announcementsMovies: Show[];
  featuredSeries: Show[];
  announcementsSeries: Show[];

  page = 1;
  years = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
  isLoading = true;
  randomTitle ='marvel';
  randomYear = Math.floor(Math.random() * (12));

  constructor(private omdbService: OmdbService, private router: Router, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    //const randomTitle = new Date().toLocaleDateString('es-co',{weekday: 'long'}).split("")[0];\
    this.loadShows();
  }

  loadShows() {
    forkJoin([
      this.omdbService.getShows(this.randomTitle, ShowType.Movie, this.page, this.years[this.randomYear]),
      this.omdbService.getShows(this.randomTitle, ShowType.Movie, this.page),
      this.omdbService.getShows(this.randomTitle, ShowType.Series, this.page, this.years[this.randomYear]),
      this.omdbService.getShows(this.randomTitle, ShowType.Series, this.page)
    ]).subscribe((
      result
    ) => {
      result.forEach(async (shows)=> {
        if(shows.Response === "False") {
          let ref = this.snackBar.open(ERROR_MESSAGE.homeFailed, 'OK');
          await firstValueFrom(ref.onAction()).then(()=>{
            this.router.navigateByUrl('/');
          })
        }
      })
      const [
        featuredMovies,
        announcementsMovies ,
        featuredSeries,
        announcementsSeries,
      ] = result;
      this.featuredMovies = featuredMovies.Search;
      this.announcementsMovies = announcementsMovies.Search;
      this.featuredSeries = featuredSeries.Search;
      this.announcementsSeries = announcementsSeries.Search;
      this.isLoading = false;
    });
  }
}
