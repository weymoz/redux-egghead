import { v4 } from 'node-uuid'
import * as api from '../api'

export const addTodo = text => {
    return {
        type: 'ADD_TODO',
        id: v4(),
        text
    }
}

export const toggleTodo = id => {
    return {
        type: 'TOGGLE_TODO',
        id
    }
}

const receiveTodos = (response, filter) => {
    return {
        type: 'RECEIVE_TODOS',
        filter,
        response
    }
}

export const fetchTodos = filter => {
    return api.fetchTodos(filter)
        .then(response => receiveTodos(response, filter))
}