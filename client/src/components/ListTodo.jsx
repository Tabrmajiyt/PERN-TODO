import React, { Fragment, useEffect, useState } from 'react'

import EditTodo from './EditTodo'


const ListTodo = () => {
    const [todos, setTodos] = useState([]);

    // Get Todo From The Database -perntodo-
    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:5550/todos")
            const JsonData = await response.json()
            setTodos(JsonData)
        } catch (err) {
            console.error(err.message)
        }
    }
    useEffect(() => {
        getTodos();
    }, [])
    console.log(todos)

    // Delete a Todo From The Database -perntodo-
    const DeleteTodo = async (id) => {
        try {
            const deleteTodo = await fetch(
                `http://localhost:5550/todos/${id}`, {
                method: "DELETE"}
            )
            setTodos(todos.filter(todo => todo.todo_id !== id))
        } catch (err) {
            console.error(err.message)
        }
    }
    return (
        <Fragment>
            <h1 className='text-center mt-4'>List Todos 📄</h1>
            <table className="table text-center mt-4">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                        <tr key={todo.todo_id}>
                            <td>
                                {todo.description}
                            </td>
                            <td>
                                <EditTodo todo={todo}/>
                            </td>
                            <td>
                                <button
                                    className='btn btn-danger'
                                    onClick={() => DeleteTodo(todo.todo_id)}
                                >Delete
                                </button>
                            </td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </Fragment>
    )
}
export default ListTodo