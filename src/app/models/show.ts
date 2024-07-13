export type ShowType = 'movie' | 'series' | 'episode';

export interface Show {
  Title:  string;
  Year:   string;
  imdbID: string;
  Type:   ShowType;
  Poster: string;
}
