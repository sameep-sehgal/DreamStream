import React from 'react';
import flv from 'flv.js';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

class StreamShow extends React.Component {
    state={shown:false,playing:false}

    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
    }

    componentDidMount() {
        const { id } = this.props.match.params
        this.props.fetchStream(id)
        this.buildPlayer();
    }

    componentDidUpdate() {
        this.buildPlayer();
    }

    componentWillUnmount = () => {
        this.player.destroy();
    }

    buildPlayer = () => {
        const { id } = this.props.match.params

        if (this.player || !this.props.stream.title) {
            return;
        }

        this.player = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${id}.flv`
        })
        this.player.attachMediaElement(this.videoRef.current)
        console.log(this.player)
        this.setState({playing:this.player._receivedCanPlay})
    
        this.player.load();
    }

    renderStreamStatus = (userEmail) => {
        if(this.player){
            console.log(this.player._receivedCanPlay,this.state.playing)
            return !this.player._receivedCanPlay? <h4 style={{color:'red',paddingLeft:30}}>{userEmail} is not streaming currently.</h4>
                            :<h4 style={{color:'green',paddingLeft:30}}>{userEmail} is streaming now.</h4>;
        }
    }

    renderSteps = (userEmail) => {
        if(this.props.auth.userEmail === userEmail){
            return <div style={{textAlign:'center', padding:5}}>Open OBS studio, enter the streaming ID present in URL and start streaming!</div>
        }
    }

    renderContent = () => {
        if (!this.props.stream.title) {
            return <h1>Loading...</h1>
        }
        const { title, description, id, userEmail } = this.props.stream
        return (
            <div>
                {this.renderSteps(userEmail)}
                <video ref={this.videoRef} style={{ width: '100%' }} controls />
                <h1 style={{paddingLeft:20}}>{id}. {title}</h1>
                {this.renderStreamStatus(userEmail)}
                <h4 style={{paddingLeft:30,paddingBottom:20}}>Description: {description}</h4>
            </div>
        )
    }

    render() {
        return (
            this.renderContent()
        )
    }
}

const mapStateToProps = (state) => {
    return {
        stream: state.streams,
        auth:state.auth
    }
}

export default connect(mapStateToProps, { fetchStream })(StreamShow);