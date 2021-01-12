import React from 'react';

export default class WillWatchMovie extends React.Component {
    render() {
        const {movie} = this.props;
        return(
            <li  className="list-group-item">
                <div className="d-flex justify-content-between">
                    <h6 className="mb-0">{movie.title}</h6>
                    <p className="mb-0">{movie.vote_average}</p>
                </div>
            </li>
        )
    }
}