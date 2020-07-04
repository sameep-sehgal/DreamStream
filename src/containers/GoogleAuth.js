import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions'

class GoogleAuth extends React.Component {
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '676593651017-ittursaqeipecr7b519slq958o4kofn6.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange) //this function takes in a callback function that is called whenever signedIn state changes 
            })
        });
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getBasicProfile().getEmail()
            );
        } else {
            this.props.signOut();
        }
    }

    signIn = () => {
        this.auth.signIn();
    }

    signOut = () => {
        let confirmSignOut = window.confirm('Are you sure you want to sign out?')
        if (confirmSignOut) {
            this.auth.signOut();
        }
    }

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <button
                    className='ui red google button'
                    onClick={this.signOut}
                >
                    <i className='google icon' />
                    Sign Out
                </button>
            )
        } else {
            return (
                <button
                    className='ui red google button'
                    onClick={this.signIn}
                >
                    <i className='google icon' />
                    Sign In With Google
                </button>
            )
        }
    }

    render() {
        return (
            this.renderAuthButton()
        )
    }
}

const mapStateToProps = state => {
    return {
        isSignedIn: state.auth.isSignedIn
    }
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);