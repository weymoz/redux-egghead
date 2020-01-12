import expect from 'expect'
import todos from './reducer'

const testTogleTodos = () => {

    const before = [
        {
            id: 0,
            text: 'Learn React',
            completed: false
        },
        {
            id: 1,
            text: 'Go Shopping',
            completed: false
        },
    ]

    const action = {
        type: 'TOGGLE_TODO',
        id: 1
    }

    const after = [
        {
            id: 0,
            text: 'Learn React',
            completed: false
        },
        {
            id: 1,
            text: 'Go Shopping',
            completed: true
        },
    ]

    expect(todos(before, action)).toEqual(after)

}

testTogleTodos()