import {Component} from '@angular/core';
import {SearchBarComponent} from "fly-movies-ux";
import {OmdbService} from "../../api/omdb.service";
import {debounceTime, firstValueFrom, map, startWith} from "rxjs";
import {SearchBar} from "fly-movies-ux/lib/models/searchBar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    SearchBarComponent,
    SearchBarComponent,
    SearchBarComponent
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  shows: SearchBar[] = [];

  constructor(private omdbService: OmdbService, private router:Router) {
  }

  async getShows(keyword: string) {
    this.shows = [];
    this.shows = await firstValueFrom(this.omdbService.getByTitle(keyword).pipe(
      map((shows) => {
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
}
