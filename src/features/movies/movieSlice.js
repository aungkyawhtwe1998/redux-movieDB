import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import movieApi from '../../common/apis/movieApi';
import { APIKey } from "../../common/apis/MovieApiKey";

export const fetchAsyncMovies = createAsyncThunk('movies/fetchAsyncMovies', async(term) => {
    const response = await movieApi.get(`?apikey=${APIKey}&s=${term}&type=movie`);
    return response.data;
});

export const fetchAsyncShows = createAsyncThunk('movies/fetchAsyncShows', async(term) => {
    const response = await movieApi.get(`?apikey=${APIKey}&s=${term}&type=series`);
    return response.data;
});

export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
    'movies/fetchAsyncMovieOrShowDetail', 
    async(id) => {
        const response = await movieApi.get(`?apikey=${APIKey}&i=${id}&Plot=full`);
        return response.data;
    }
);

const initialState = {
    movies:{},
    shows:{},
    selectedMovieOrShow:{},
}

const movieSlice = createSlice({
    name:"movies",
    initialState,
    reducers:{
        addMovies:(state, {payload})=>{
            state.movies = payload;
        },
        //clean up
        removeSelectedMovieOrShow:(state) => {
            state.selectedMovieOrShow = {};
        }
    },
    extraReducers:{
        [fetchAsyncMovies.pending]:()=>{
            console.log("Pending");
        },
        [fetchAsyncMovies.fulfilled]:(state, {payload})=>{
            console.log("Fetched Successfully");
            return {...state, movies:payload};
        },
        [fetchAsyncMovies.rejected]:()=>{
            console.log("Rejected!");
        },
        [fetchAsyncShows.fulfilled]:(state, {payload})=>{
            console.log("Fetched Successfully");
            return {...state, shows:payload};
        },
        [fetchAsyncMovieOrShowDetail.fulfilled]:(state, {payload})=>{
            console.log("Fetched Successfully");
            return {...state, selectedMovieOrShow:payload};
        },

    }
});
export const {addMovies, removeSelectedMovieOrShow} = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows
export const getSelectedMovieOrShow = (state) => state.movies.selectedMovieOrShow
export default movieSlice.reducer;