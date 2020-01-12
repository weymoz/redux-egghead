import { v4 } from 'node-uuid'
import TodoList from '../components/TodoList'

const db = {
    todos: [
        {
            id: v4(),
            text: "Learn React",
            completed: false
        },
        {
            id: v4(),
            text: "Drink tea",
            completed: true
        },
        {
            id: v4(),
            text: "Go shopping",
            completed: false
        },
    ]
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export const fetchTodos = (filter) => 
    delay(1000).then(() => {
        switch (filter) {
            case 'all':
                return db.todos;
            case 'active':
                return db.todos.filter(t => !t.completed)
            case 'completed':
                return db.todos.filter(t => t.completed)
            default:
                throw new Error(`Unknown filter: ${filter}`)
        }
    })