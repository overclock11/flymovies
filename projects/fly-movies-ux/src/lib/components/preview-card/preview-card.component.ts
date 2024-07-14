import {Component, Input} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {DEFAULT_IMAGE} from "../../constants/defaultImage";

@Component({
  selector: 'lib-preview-card',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './preview-card.component.html',
  styleUrl: './preview-card.component.scss'
})
export class PreviewCardComponent {
  @Input() title: string;
  @Input() score: string;
  @Input() poster: string;
  defaultImage = DEFAULT_IMAGE;
}
