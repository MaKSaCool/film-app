import React from 'react';
import MovieItem from './MovieItem';

export default class MovieList extends React.Component {
    render() {
        const {movies, willWatch, onDeleteMovie, onMovieToWatch, onMovieFromWatch} = this.props;

        return(
            <div className="row">
                {movies.map((movie) => {
                    return (
                        <div key={movie.id} className="col-6 mb-4">
                            <MovieItem  film={movie}
                            willWatch={willWatch}
                            onDeleteMovie={onDeleteMovie} 
                            onMovieToWatch={onMovieToWatch}
                            onMovieFromWatch={onMovieFromWatch}/>
                        </div>
                    )
                })}
            </div>
        )
    }
}