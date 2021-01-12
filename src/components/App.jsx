import React from 'react';

import {API_KEY_3, API_URL} from '../utils/api';

import MovieList from './MovieList';
import SidePanel from './SidePanel';
import MovieTabs from './MovieTabs';
import Pagination from './Pagination';

import './index.css';



export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			movies: [],
			willWatch: [],
			sortBy: 'popularity.desc',
			currentPage: 1,
			totalPages: 1
		}
		this.onDeleteMovie = this.onDeleteMovie.bind(this);
		this.onMovieToWatch = this.onMovieToWatch.bind(this);
		this.onMovieFromWatch = this.onMovieFromWatch.bind(this);
		this.onChangeSortBy = this.onChangeSortBy.bind(this);
		this.makeFetch = this.makeFetch.bind(this);
		this.onChangePage = this.onChangePage.bind(this);
	}

	// Початковий запрос до АПІ по монтуванні
	componentDidMount() {
		this.makeFetch(this.state.sortBy);
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevState.sortBy !== this.state.sortBy) {
			this.makeFetch(this.state.sortBy);
		}
		if(prevState.currentPage !== this.state.currentPage) {
			this.makeFetch(this.state.sortBy, this.state.currentPage);
		}
	}
	
	async makeFetch(sortKey, page = 1){
		await fetch(`${API_URL}/discover/movie/?api_key=${API_KEY_3}&sort_by=${sortKey}&page=${page}`)
		.then( (response) => response.json())
		.then( (data) => {
			this.setState({movies: data.results, totalPages: data.total_pages});
		})
	}

	// Видалення фільму із state.movies. Ф-ція приймає id фільму та оновлює states
	onDeleteMovie(id) {
		this.setState( ({movies, willWatch}) => {
			const updateMovies = movies.filter((item) => item.id !== id)
			const updatewillWatch = willWatch.filter((item) => item.id !== id)

			return {
				movies: updateMovies,
				willWatch: updatewillWatch
			}
		});
	}

	onMovieToWatch(movie) {
		if (this.state.willWatch.filter((item) => item.id === movie.id).length === 0) {
			this.setState( ({willWatch}) => {
				const newArr = [...willWatch, movie];
				return {
					willWatch: newArr
				}
			})
		}
	}

	onMovieFromWatch(movie) {
		this.setState( ({willWatch}) => {
			const updatewillWatch = willWatch.filter((item) => item.id !== movie.id);
			return {
				willWatch: updatewillWatch
			}
		});
	}
	
	onChangeSortBy(value, e) {
		e.preventDefault();
		this.setState({sortBy: value, currentPage: 1});
	}

	onChangePage(key, e) {
		e.preventDefault();
		const {currentPage, totalPages} = this.state;

		if ( (currentPage === 1 && !key)  || (currentPage === totalPages && key) ) {return}

		const newPage = key ? currentPage+1 : currentPage-1;
		this.setState({
			currentPage: newPage
		})
	}


	render() {
		const {movies, willWatch, sortBy, currentPage, totalPages} = this.state;

		return (
			<div className='container pt-3'>
				<div className="row">
					<div className="col-9">
						<div className="row mb-3">
							<MovieTabs sortBy={sortBy} onChangeSortBy={this.onChangeSortBy}/>
						</div>

						
						<MovieList movies={movies}
						willWatch={willWatch}
						onDeleteMovie={this.onDeleteMovie} 
						onMovieToWatch={this.onMovieToWatch}
						onMovieFromWatch={this.onMovieFromWatch}
						/>
						
						<Pagination pages={{currentPage, totalPages}} onChangePage={this.onChangePage}/>
					</div>

					<SidePanel movies={willWatch}/>
				</div>
			</div>
		)
	}
}