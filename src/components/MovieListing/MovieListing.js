import React from 'react';
import Slider from 'react-slick';
import { useSelector } from 'react-redux';
import { getAllMovies, getAllShows } from '../../features/movies/movieSlice';
import MovieCard from '../MovieCard/MovieCard';
import "./MovieListing.scss";
import { Settings } from '../../common/setting';
const MovieListing = () => {

    const movies = useSelector(getAllMovies);
    const shows = useSelector(getAllShows);

    let renderMovies, renderShows = "";

    renderMovies = movies.Response === "True" ? (
        movies.Search.map(movie => {
            return <MovieCard key={movie.imdbID} data={movie} />;
        })
    ) : (
        <div className="moview-error">
            <h3>{movies.Error}</h3>
        </div>
    );

    renderShows = shows.Response === "True" ? (
        shows.Search.map(show => {
            return <MovieCard key={show.imdbID} data={show} />;
        })
    ) : (
        <div className="moview-error">
            <h3>{shows.Error}</h3>
        </div>
    );
    return (
        <div className='movie-wrapper'>
            {movies.length ===0 || shows.length===0 ?
                (<div>...Loading</div>) : (
                    <>
                        <div className='movie-list'>
                            <h2>Movies</h2>
                            <div className='movie-container'>
                                <Slider {...Settings}>{renderMovies}</Slider>
                            </div>
                        </div>
                        <div className='show-list'>
                            <h2>Shows</h2>
                            <div className='movie-container'>
                                <Slider {...Settings}>{renderShows}</Slider>
                            </div>
                        </div>
                    </>
                )
            }

        </div>
    );
};

export default MovieListing;