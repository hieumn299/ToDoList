import React, { Component } from 'react';
import Search from './Search';
import Sort from './Sort';

class Control extends Component {
    onSearch=(data)=>{
        this.props.onSearch(data);
        console.log(data);
    }
    onSort=(sortBy,sortValue)=>{
        this.props.onSort(sortBy,sortValue)
    }
    render() {
        return (
            <div className="row mt-15">
                <Search></Search>
                <Sort onSort={this.onSort} sortBy={this.props.sortBy} sortValue={this.props.sortValue}></Sort>
            </div>
        );
    }
}

export default Control;