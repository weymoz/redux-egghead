import expect from 'expect'
import deepFreeze from 'deep-freeze'
import todos from './reducer'

const testAddTodos = () => {
    const before = []

    const action = {
        type: 'ADD_TODO',
        id: 0,
        text: 'Learn Redux',
        completed: false
    }

    const after = [
        {
            id: 0,
            text: 'Learn Redux',
            completed: false
        }
    ]

    deepFreeze(before)

   expect(todos(before, action)).toEqual(after)

   console.log("SUCCESS!")
}

testAddTodos()