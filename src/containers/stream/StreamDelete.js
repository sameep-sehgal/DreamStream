import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import { fetchStream } from '../../actions';
import { deleteStream } from '../../actions';

class StreamDelete extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id)
    }

    action = () => {
        return (
            <React.Fragment>
                <button
                    onClick={() => this.props.deleteStream(this.props.match.params.id)}
                    className='ui button negative'>Delete</button>
                <Link
                    to='/'
                    className='ui button primary'
                >
                    Cancel
                </Link>
            </React.Fragment>
        )
    }

    onDismiss = () => [
        history.push('/')
    ]

    render() {
        return (
            <Modal
                title='Delete Stream'
                content={`Are you sure you want to delete stream: 
                            ${this.props.stream.title === undefined ?
                        '' : this.props.stream.title + '?'}`}
                action={this.action}
                onDismiss={this.onDismiss}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        stream: state.streams
    }
}

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);