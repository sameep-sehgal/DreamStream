import streams from '../apis/streams'
import {
    SIGN_IN,
    SIGN_OUT,
    CREATE_STREAM,
    DELETE_STREAM,
    FETCH_STREAM,
    FETCH_STREAMS,
    EDIT_STREAM
} from './types';
import history from '../history';

export const signIn = (userEmail) => {
    return {
        type: SIGN_IN,
        payload: userEmail
    }
}
export const signOut = () => {
    return {
        type: SIGN_OUT
    }
}

export const createStream = formData => async (dispatch, getState) => {
    const { userEmail } = getState().auth;
    const response = await streams.post('/streams', { ...formData, userEmail })

    dispatch({ type: CREATE_STREAM, payload: response.data })
    history.push('/DreamStream');
}

export const fetchStreams = () => async (dispatch) => {
    const response = await streams.get('/streams')

    dispatch({ type: FETCH_STREAMS, payload: response.data })
}
export const fetchStream = (id) => async dispatch => {
    const response = await streams.get(`/streams/${id}`)

    dispatch({ type: FETCH_STREAM, payload: response.data })
}

export const deleteStream = id => async dispatch => {
    await streams.delete(`streams/${id}`);

    dispatch({ type: DELETE_STREAM, payload: id })
    history.push('/DreamStream')
}

export const editStream = (id, formData) => async dispatch => {
    const response = await streams.patch(`streams/${id}`, formData)

    dispatch({ type: EDIT_STREAM, payload: response });
    history.push('/DreamStream')
}