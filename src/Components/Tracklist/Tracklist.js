import React from "react"
import './Tracklist.css'
import { Track } from "../Track/Track"
export class Tracklist extends React.Component{
    render(){
        return (
            <div className="TrackList">
                {this.props.tracks?.map(track => <Track name={track.name} artist={track.artist} album={track.album}
                track={track} key={track.id} add={this.props.add} remove={this.props.remove} isRemoval={this.props.isRemoval}
                cover={track.preview_image} sound={track.preview_sound}/>)}
            </div>
        )
    }
}