import { Component, OnInit } from '@angular/core';
import { MovieApiServiceService } from 'src/app/service/movie-api-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private service: MovieApiServiceService) {}

  //Definition of variables
  bannerResult: any = [];
  trendingMovieResult: any = [];
  actionMovieResult: any = [];
  adventureMovieResult: any = [];
  animationMovieResult: any = [];
  comedyMovieResult: any = [];
  documentaryMovieResult: any = [];
  sciencefictionMovieResult: any = [];
  thrillerMovieResult: any = [];
  favoriteMovieResult: any = [];

  ngOnInit(): void {
    //localStorage.clear();
    this.bannerData();
    this.trendingData();
    this.actionMovie();
    this.adventureMovie();
    this.comedyMovie();
    this.animationMovie();
    this.documentaryMovie();
    this.sciencefictionMovie();
    this.thrillerMovie();
    this.favoritesData();
    // const favoriteIdsString = localStorage.getItem('favorites');
    // console.log(favoriteIdsString, '#FAV');
  }

  favoritesData() {
    // Retrieve the stored favorite movie IDs from local storage
    const favoriteIdsString = localStorage.getItem('favorites');
    if (favoriteIdsString) {
      const favoriteIds = JSON.parse(favoriteIdsString);
      // console.log(favoriteIds, 'favoriteIdsArray');
      if (favoriteIds) {
        favoriteIds.forEach((id: any) => {
          const movieId = parseInt(id, 10); // convert id to number
          // console.log(movieId);
          this.service.getMovieByID(movieId).subscribe((result) => {
            //console.log(result);
            this.favoriteMovieResult.push(result);
          });
        });
      }
    }
    console.log(this.favoriteMovieResult, 'resultado');
  }
  // data for banner
  bannerData() {
    this.service.bannerApiData().subscribe((result) => {
      //console.log(result, 'bannerresult#');
      this.bannerResult = result.results;
    });
  }
  // data for trending section
  trendingData() {
    this.service.trendingMovieApiData().subscribe((result) => {
      //console.log('aqui');
      //console.log(result, 'trendingresult#');
      this.trendingMovieResult = result.results;
    });
  }
  // action
  actionMovie() {
    this.service.fetchActionMovies().subscribe((result) => {
      this.actionMovieResult = result.results;
    });
  }

  // adventure
  adventureMovie() {
    this.service.fetchAdventureMovies().subscribe((result) => {
      this.adventureMovieResult = result.results;
    });
  }

  // animation
  animationMovie() {
    this.service.fetchAnimationMovies().subscribe((result) => {
      this.animationMovieResult = result.results;
    });
  }

  // comedy
  comedyMovie() {
    this.service.fetchComedyMovies().subscribe((result) => {
      this.comedyMovieResult = result.results;
    });
  }

  // documentary
  documentaryMovie() {
    this.service.fetchDocumentaryMovies().subscribe((result) => {
      this.documentaryMovieResult = result.results;
    });
  }

  // science-fiction
  sciencefictionMovie() {
    this.service.fetchScienceFictionMovies().subscribe((result) => {
      this.sciencefictionMovieResult = result.results;
    });
  }

  // thriller
  thrillerMovie() {
    this.service.fetchThrillerMovies().subscribe((result) => {
      this.thrillerMovieResult = result.results;
    });
  }
}
