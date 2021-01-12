/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

export default class MovieTabs extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.getClass = this.getClass.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.sortBy !== this.props.sortBy) {
            return true;
        } else {
            return false;
        }
    }

    handleClick(value) {
        return (event) => {
            this.props.onChangeSortBy(value, event);
        }
    }

    getClass(key) {
        return `nav-link ${this.props.sortBy === key ? "active" : ""}`;
    }

    render() {
        return (
            <div className="col-12">
                <ul className="tabs nav nav-pills">
                    <li className="nav-item">
                        <a href="#" 
                        className={this.getClass("popularity.desc")}
                        onClick={this.handleClick("popularity.desc")}>
                            Popularity desc
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" 
                        className={this.getClass("revenue.desc")}
                        onClick={this.handleClick("revenue.desc")}>
                            Revenue desc
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" 
                        className={this.getClass("vote_count.desc")}
                        onClick={this.handleClick("vote_count.desc")}>
                            Vote count desc
                        </a>
                    </li>
                </ul>
            </div>
        )
    }
}