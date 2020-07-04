import React from 'react';
import flv from 'flv.js';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

class StreamShow extends React.Component {
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
        this.player.load();
    }

    renderContent = () => {
        if (!this.props.stream.title) {
            return <h1>Loading...</h1>
        }
        const { title, description, id } = this.props.stream
        return (
            <div>
                <video ref={this.videoRef} style={{ width: '100%' }} controls />
                <h1>{id}. {title}</h1>
                <h4>{description}</h4>
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
        stream: state.streams
    }
}

export default connect(mapStateToProps, { fetchStream })(StreamShow);