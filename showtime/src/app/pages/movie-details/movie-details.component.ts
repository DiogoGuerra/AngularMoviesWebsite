import { Component, OnInit } from '@angular/core';
import { MovieApiServiceService } from 'src/app/service/movie-api-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {
  constructor(
    private service: MovieApiServiceService,
    private router: ActivatedRoute
  ) {
    this.isFavorited = false;
  }

  //Defining variables
  getMovieDetailResult: any;
  getMovieVideoResult: any;
  getMovieCastResult: any;
  isFavorited: boolean;
  id: any;

  ngOnInit(): void {
    let getParamId = this.router.snapshot.paramMap.get('id');
    this.id = getParamId;

    //console.log(getParamId, 'getparamid#');
    this.getMovies(getParamId);
    this.getVideo(getParamId);
    this.getMovieCast(getParamId);
    //this.ShowAddBtn(getParamId);
    //this.toggleFavorite(getParamId);

    // this.isFavorited = localStorage.getItem(getParamId || '{}') !== null;
    let favorites = JSON.parse(localStorage.getItem('favorites')!) || [];
    this.isFavorited = favorites.includes(this.id);
    console.log(this.isFavorited, 'ISFAVORITED');
  }

  getMovies(id: any) {
    this.service.getMovieDetails(id).subscribe((result) => {
      //console.log(result, 'getmoviedetails#');
      this.getMovieDetailResult = result;
    });
  }

  getVideo(id: any) {
    this.service.getMovieVideo(id).subscribe((result) => {
      // console.log(result, 'getMovieVideo#');
      result.results.forEach((element: any) => {
        if (element.type == 'Trailer') {
          this.getMovieVideoResult = element.key;
        }
      });
    });
  }

  getMovieCast(id: any) {
    this.service.getMovieCast(id).subscribe((result) => {
      //console.log(result, 'movieCast#');
      this.getMovieCastResult = result.cast;
    });
  }

  removeFavorite() {
    let id = this.router.snapshot.paramMap.get('id');
    localStorage.removeItem(this.id);
    console.log(localStorage);
    // this.toggleFavorite(id);
    this.isFavorited = false;
  }
  addFavorite() {
    let id = this.router.snapshot.paramMap.get('id');
    localStorage.setItem(this.id, 'true');
    console.log(localStorage);
    // this.toggleFavorite(id);
    this.isFavorited = true;
  }

  addFavoriteMovie() {
    let id = this.router.snapshot.paramMap.get('id');
    let favorites = localStorage.getItem('favorites')
      ? JSON.parse(localStorage.getItem('favorites')!)
      : [];
    console.log(favorites, '#favorites');
    favorites.push(id);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    console.log(localStorage, '#localStorage');
    this.isFavorited = true;
  }

  removeFavoriteMovie() {
    let id = this.router.snapshot.paramMap.get('id');
    let favorites = localStorage.getItem('favorites')
      ? JSON.parse(localStorage.getItem('favorites')!)
      : [];
    console.log(favorites, '#favorites');
    let index = favorites.indexOf(id);
    console.log(index, '#index');
    if (index !== -1) {
      favorites.splice(index, 1);
      if (favorites.length === 0) {
        localStorage.removeItem('favorites');
      } else {
        localStorage.setItem('favorites', JSON.stringify(favorites));
      }
    }
    console.log(localStorage, '#localStorage');
    this.isFavorited = false;
  }
}
