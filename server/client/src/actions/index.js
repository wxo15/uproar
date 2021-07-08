import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch({type: FETCH_USER, payload: res.data}); //update user
};

export const handleToken = (token) => async dispatch => {
    const res = await axios.post('/api/stripe', token);
    dispatch({type: FETCH_USER, payload: res.data}); //update user
};

export const submitSurvey = (values, history) => async dispatch => {
    const res = await axios.post('/api/surveys', values);
    //console.log(res);
    history.push('/surveys'); //redirect
    dispatch({type: FETCH_USER, payload: res.data}); //update user
}

export const fetchSurveys = () => async dispatch => {
    const res = await axios.get('/api/surveys');
    //console.log(res);
    dispatch({type: FETCH_SURVEYS, payload: res.data}); //update user
}
