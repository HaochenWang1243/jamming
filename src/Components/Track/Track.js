import React from "react"
import './Track.css'

export class Track extends React.Component{
    constructor(props){
        super(props)
        this.addTrackToPlaylist=this.addTrackToPlaylist.bind(this);
        this.removeTrackFromPlaylist=this.removeTrackFromPlaylist.bind(this);
    }
    addTrackToPlaylist(e){
        this.props.add(this.props.track);
    }
    removeTrackFromPlaylist(e){
        this.props.remove(this.props.track);
    }
    renderAction(){
        if(!this.props.isRemoval)
            return <button className='Track-action' onClick={this.addTrackToPlaylist}>+</button>
        else
            return <button className='Track-action' onClick={this.removeTrackFromPlaylist}>-</button>
    }
    preview(){

    }
    render(){
        return (
            <div className="Track">
                <img src={this.props.cover} alt='failed to load'/>
                <div className="Track-information">
                    <audio controls src={this.props.sound}></audio>
                    <h3>{this.props.name}</h3>
                    <p>{this.props.artist+'  '+this.props.album}</p>
                </div>
                {this.renderAction()}
            </div>
        )
    }
}