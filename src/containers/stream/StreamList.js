import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';
import { Link } from 'react-router-dom';

class StreamList extends React.Component {
    componentDidMount() {
        this.props.fetchStreams()
    }

    renderAdminButtons = (streamUserEmail, streamId) => {
        if (this.props.userEmail === streamUserEmail) {
            return (
                <div className='right floated content'>
                    <Link
                        className='ui button primary'
                        to={`/DreamStream/stream/edit/${streamId}`}
                    >
                        Edit
                    </Link>
                    <Link
                        className='ui button negative'
                        to={`/DreamStream/stream/delete/${streamId}`}
                    >
                        Delete
                    </Link>
                </div>
            )
        }
    }

    renderList = () => {
        return this.props.streams.map(stream => {
            if(stream.id){
                return (
                    <div className='item' key={stream.id}>
                        {this.renderAdminButtons(stream.userEmail, stream.id)}
                        <i className='large middle aligned icon camera' />
                        <div className='content'>
                            <Link to={`/DreamStream/stream/${stream.id}`}>{stream.title}</Link>
                            <div className='description'>
                                {stream.description}
                                <div><strong>Owner: {stream.userEmail}</strong> </div>
                            </div>
                        </div>
                    </div>
                )
            }
        })
    }

    renderCreateButton = () => {
        if (this.props.isSignedIn) {
            return (
                <div style={{ textAlign: 'center' }}>
                    <Link to='/DreamStream/stream/new' className='ui button secondary center'>
                        Create New Stream
                    </Link>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <h2 style={{ textAlign: 'center' }}>All Streams</h2>
                <div className='ui celled list'>
                    {this.renderList()}
                    {this.renderCreateButton()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        streams: Object.values(state.streams), //converts objects to arrays
        userEmail: state.auth.userEmail,
        isSignedIn: state.auth.isSignedIn
    };
}

export default connect(mapStateToProps, { fetchStreams })(StreamList);