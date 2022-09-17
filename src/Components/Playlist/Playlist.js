import React from "react"
import './Playlist.css'
import { Tracklist } from "../Tracklist/Tracklist.js"
export class Playlist extends React.Component{
    constructor(props){
        super(props)
        this.rename=this.rename.bind(this)
    }
    rename(e){
        this.props.rename(e.target.value)
    }
    render(){
        return (
            <div class="Playlist">
                <input defaultValue="New Playlist" onChange={this.rename}/>
                <Tracklist tracks={this.props.tracks} remove={this.props.remove} isRemoval={true}/>
                <button class="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        )
    }
}