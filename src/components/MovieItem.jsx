import React from 'react';

import './index.css';

export default class MovieItem extends React.Component{
    constructor(props) {
        super(props);

        this.newState = this.props.willWatch.filter((item) => item.id === this.props.film.id).length === 1 ? true : false;
        this.state = {
            willWatch:  this.newState 
        }
    }

    render() {
        const {film, onDeleteMovie, onMovieToWatch, onMovieFromWatch} = this.props;
       
        return(
            <div className="card">
                
                <img className="card-img-top"
                    src={`https://image.tmdb.org/t/p/w500${film.backdrop_path || film.poster_path}`}
                    alt={film.title}
                />
                <div className="card-body">
                    <h6 className="card-title">{film.title}</h6>

                    <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-0">Rating: {film.vote_average}</p>
                        <div className="dflex justify-content-between align-items-center">

                            {this.state.willWatch === true ? 
                                <button type="button" className="btn btn-primary"
                                    onClick={() => {
                                        this.setState({willWatch: false})
                                        onMovieFromWatch(film)
                                    }}>
                                    Clear Watch
                                </button>
                                :
                                <button type="button" className="btn btn-secondary"
                                    onClick={() => {
                                        this.setState({willWatch: true})
                                        onMovieToWatch(film)
                                    }}>
                                    Will Watch
                                </button>
                            }
                            

                            <button type='button' className="btn btn-secondary ml-3" 
                                onClick={() => onDeleteMovie(film.id)}>
                                Delete Movie
                            </button>
    
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}