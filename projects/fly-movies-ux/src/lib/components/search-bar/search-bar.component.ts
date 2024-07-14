import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {DEFAULT_IMAGE} from "../../constants";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {SearchBar} from "../../models/searchBar";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {debounceTime, fromEvent, map} from "rxjs";
import {emit} from "@angular-devkit/build-angular/src/tools/esbuild/angular/compilation/parallel-worker";

@Component({
  selector: 'lib-search-bar',
  standalone: true,
  imports: [
    MatAutocomplete,
    MatOption,
    NgOptimizedImage,
    MatAutocompleteTrigger,
    ReactiveFormsModule,
    MatInput,
    NgForOf,
    MatFormField,
    MatLabel
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent implements AfterViewInit {
  @Input() shows: SearchBar[];
  @Input() debounce: number = 300;

  @Output() searchKeyword: EventEmitter<string> = new EventEmitter();
  @Output() selected: EventEmitter<string> = new EventEmitter();

  @ViewChild("searchBar") searchBar: ElementRef;

  defaultImage = DEFAULT_IMAGE;

  ngAfterViewInit() {
    fromEvent(this.searchBar.nativeElement, "keyup").pipe(
      debounceTime(this.debounce)
    ).subscribe(()=> {
      const value = this.searchBar.nativeElement.value;
      if (value) {
        this.searchKeyword.emit(value);
      }
    })
  }

  selectedShow() {
    const value = this.searchBar.nativeElement.value;
    this.selected.emit(value);
  }
}
