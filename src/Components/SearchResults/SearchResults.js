import React from "react"
import './SearchResults.css'
import { Tracklist } from "../Tracklist/Tracklist"
export class SearchResults extends React.Component{
    render(){
        return (
            <div className="SearchResults">
                <h2>Search Results</h2>
                <Tracklist tracks={this.props.results} add={this.props.add}/>
            </div>
        )
    }
}