import {Component, Input} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'lib-preview-card',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './preview-card.component.html',
  styleUrl: './preview-card.component.css'
})
export class PreviewCardComponent {
  @Input() title: string;
  @Input() score: string;
  @Input() poster: string;
  @Input() defaultImage = 'https://media.istockphoto.com/id/995815438/vector/movie-and-film-modern-retro-vintage-poster-background.jpg?s=612x612&w=0&k=20&c=UvRsJaKcp0EKIuqDKp6S7Dwhltt0D5rbegPkS-B8nDQ=';
}
