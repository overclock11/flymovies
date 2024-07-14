import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OmdbService} from "../../api/omdb.service";
import {firstValueFrom} from "rxjs";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {MatChip, MatChipSet} from "@angular/material/chips";
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";
import {DEFAULT_IMAGE} from "fly-movies-ux";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ERROR_MESSAGE} from "../../constants/errorMessage";

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
    Genre: '',
    Response: ''
  };
  genres: string[] = [];
  isLoading = true;
  defaultImage = DEFAULT_IMAGE;

  constructor(private route: ActivatedRoute, private omdbService: OmdbService, private snackBar: MatSnackBar, private router: Router) {
  }

  async ngOnInit() {
    this.title = this.route.snapshot.paramMap.get("title")!;
    this.route.params.subscribe(async (params) => {
      this.title = params["title"];
      this.show = await firstValueFrom(this.omdbService.getDetail(this.title));
      if(this.show.Response === 'False') {
        let ref = this.snackBar.open(ERROR_MESSAGE.detailFailed, 'OK');
        await firstValueFrom(ref.onAction()).then(()=>{
          this.router.navigate(['']);
        })
      }
      this.genres = this.show.Genre.split(",");
      this.isLoading = false;
    })
  }
}
