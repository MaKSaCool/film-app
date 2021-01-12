import React from 'react';
import WillWatchMovie from './WillWatchMovie';

export default class SidePanel extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.movies !== this.props.movies) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        const {movies} = this.props;
        return(
            <div className="col-3 sticky-top height-ft">
                <h5> Will watch: {movies.length} </h5>
                <ul className="list-group">
                    {movies.map((movie) => <WillWatchMovie key={movie.id}  movie={movie}/> )}
                </ul>
            </div>
        )
    }
}