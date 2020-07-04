import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id)
    }

    onSubmit = (formValues) => {
        this.props.editStream(this.props.match.params.id, formValues)
    }

    render() {
        return (
            <div>
                <h3>Edit A Stream</h3>
                <StreamForm
                    onSubmit={this.onSubmit}
                    enableReinitialize
                    initialValues={{
                        title: this.props.stream.title,
                        description: this.props.stream.description
                    }}
                />
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        stream: state.streams
    }
}

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);