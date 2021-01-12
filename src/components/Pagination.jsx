/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import './index.css';

export default class Pagination extends React.Component {
    constructor(props) {
        super(props);

        this.getClass = this.getClass.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(key) {
        return (event) => {
            this.props.onChangePage(key, event);
        }
    }

    getClass(value = 1) {
        return `page-item ${this.props.pages.currentPage === value ? "disabled" : ""}`;
    }

    render() {
        const {pages: {currentPage, totalPages}} = this.props; 
        return (
            <div className="row">
                <div className="col-12">
                    <nav>
                        <ul className="pagination justify-content-center align-items-center">
                            <li className={this.getClass()}
                            onClick={this.handleClick(false)}>
                                <a className="page-link" href="#">Previous</a>
                            </li>

                            <li className="page-item numeric-list">{currentPage} / {totalPages}</li>

                            <li className={this.getClass(totalPages)}
                            onClick={this.handleClick(true)}>
                                <a className="page-link" href="#">Next</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        )
    }
}