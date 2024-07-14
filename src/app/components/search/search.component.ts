import {Component} from '@angular/core';
import {SearchBarComponent} from "fly-movies-ux";
import {OmdbService} from "../../api/omdb.service";
import {firstValueFrom, map} from "rxjs";
import {SearchBar} from "fly-movies-ux/lib/models/searchBar";
import {Router} from "@angular/router";
import {DEFAULT_IMAGE} from "fly-movies-ux/src/lib/constants";
import {ERROR_MESSAGE} from "../../constants/errorMessage";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    SearchBarComponent,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  shows: SearchBar[] = [];
  defaultImage = DEFAULT_IMAGE;

  constructor(private omdbService: OmdbService, private router:Router) {
  }

  async getShows(keyword: string) {
    this.shows = [];
    this.shows = await firstValueFrom(this.omdbService.getByTitle(keyword).pipe(
      map((shows) => {
        if (shows.Response === "False") {
          return [
            {
              title: ERROR_MESSAGE.noCoincidence,
              poster: this.defaultImage,
              year: ''
            }
          ]
        }
        return shows.Search.map((show) => {
          return {
            title: show.Title,
            poster: show.Poster,
            year: show.Year
          }
        })
      })
    ))
  }

  goToDetail(title: string) {
    void this.router.navigate([`detail/${title}`]);
  }

  goHome(){
    void this.router.navigate(['']);
  }
}
