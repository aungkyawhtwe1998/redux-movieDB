import React, { useEffect } from 'react';
import MovieListing from "../MovieListing/MovieListing"
// import movieApi from '../../common/apis/movieApi';
// import { APIKey } from "../../common/apis/MovieApiKey";
import { useDispatch } from 'react-redux';
import {fetchAsyncMovies, fetchAsyncShows } from '../../features/movies/movieSlice';
const Home = () => {
    const dispatch = useDispatch();
    const movieText = "Harry";
    const showText = "Friends";
    useEffect(() => {
        // const fetchMovies = async () => {
        //     const response = await movieApi
        //     .get(`?apikey=${APIKey}&s=${movieText}&type=movie`)
        //     .catch((err) => {
        //         console.log("Err: ", err);
        //     });
        //     console.log("The response from API ", response.data);
        //     dispatch(addMovies(response.data));
        // };
        // fetchMovies();
        dispatch(fetchAsyncMovies(movieText));
        dispatch(fetchAsyncShows(showText));
    }, [dispatch])
    return (
        <div>
            <div className='banner-img'>
                <MovieListing />
            </div>
        </div>
    );
};

export default Home;

