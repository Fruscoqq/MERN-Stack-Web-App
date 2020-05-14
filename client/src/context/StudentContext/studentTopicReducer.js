import {
  STUDENT_ADD_TOPIC,
  STUDENT_ERROR,
  STUDENT_GET_TOPICS
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case STUDENT_ADD_TOPIC:
      return {
        ...state,
        studentTopics: [...state.studentTopics, action.payload]
      }
    case STUDENT_GET_TOPICS:
      return {
        ...state,
        studentTopics: action.payload
      }
    case STUDENT_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
}