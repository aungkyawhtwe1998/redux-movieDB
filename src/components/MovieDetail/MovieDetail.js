import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchAsyncMovieOrShowDetail, getSelectedMovieOrShow, removeSelectedMovieOrShow } from '../../features/movies/movieSlice';
import "./MovieDetail.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faThumbsUp, faFilm, faCalendar } from '@fortawesome/free-solid-svg-icons';
const MovieDetail = () => {
    const { imdbID } = useParams();
    const dispatch = useDispatch();
    const data = useSelector(getSelectedMovieOrShow);
    console.log('detail', data);
    useEffect(() => {
        dispatch(fetchAsyncMovieOrShowDetail(imdbID));
        return () => {
            dispatch(removeSelectedMovieOrShow());
        }
    }, [dispatch, imdbID])

    return (
        <div className='movie-section'>
            {Object.keys(data).length === 0 ?
                (<div>...Loading</div>) : (

                    <>
                        <div className='section-left'>
                            <div className='movie-title'>
                                {data.Title}
                            </div>
                            <div className='movie-rating'>
                                <span>
                                    IMDB Rating <FontAwesomeIcon className='fa-star' icon={faStar} /> : {data.imdbRating}
                                </span>
                                <span>
                                    IMDB Votes <FontAwesomeIcon className='fa-thumbsUp' icon={faThumbsUp} /> : {data.imdbVotes}
                                </span>
                                <span>
                                    Runtime <FontAwesomeIcon icon={faFilm} className="fa-film" /> : {data.Runtime}
                                </span>
                                <span>
                                    Year <FontAwesomeIcon icon={faCalendar} className="fa-calendar" /> : {data.Year}
                                </span>
                            </div>

                            <div className='movie-plot'>{data.Plot}</div>
                            <div className='movie-info'>
                                <div>
                                    <span>Director</span>
                                    <span>{data.Director}</span>
                                </div>
                                <div>
                                    <span>Stars</span>
                                    <span>{data.Actors}</span>
                                </div>
                                <div>
                                    <span>Genres</span>
                                    <span>{data.Genre}</span>
                                </div>
                                <div>
                                    <span>Language</span>
                                    <span>{data.Language}</span>
                                </div>
                                <div>
                                    <span>Awards</span>
                                    <span>{data.Awards}</span>
                                </div>
                            </div>

                        </div>
                        <div className='section-right'>
                            <img src={data.Poster} alt={data.Title} />
                        </div>
                    </>
                )
            }
        </div>
    );
};

export default MovieDetail;