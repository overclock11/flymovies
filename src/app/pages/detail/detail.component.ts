import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {OmdbService} from "../../api/omdb.service";
import {firstValueFrom} from "rxjs";
import {ShowDetail} from "../../models/show-detail";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {MatChip, MatChipSet} from "@angular/material/chips";
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";
import {DEFAULT_IMAGE} from "fly-movies-ux/src/lib/constants";

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    NgOptimizedImage,
    MatChipSet,
    MatChip,
    NgForOf,
    NgxSkeletonLoaderModule,
    NgIf
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {
  title: string;
  show = {
    Type: '',
    Title: '',
    Year: '',
    Runtime: '',
    imdbRating: '',
    imdbVotes: '',
    Poster: '',
    Awards: '',
    Plot: '',
    Director: '',
    Actors: '',
    Country: '',
    Released: '',
    Genre: ''
  };
  genres: string[] = [];
  isLoading = true;
  defaultImage = DEFAULT_IMAGE;

  constructor(private route: ActivatedRoute, private omdbService: OmdbService) {
  }

  async ngOnInit() {
    this.title = this.route.snapshot.paramMap.get("title")!;
    this.route.params.subscribe(async (params) => {
      this.title = params["title"];
      this.show = await firstValueFrom(this.omdbService.getDetail(this.title));
      this.genres = this.show.Genre.split(",");
      this.isLoading = false;
    })
  }
}
