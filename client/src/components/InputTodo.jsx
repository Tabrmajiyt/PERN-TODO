import React, { Fragment, useState } from 'react'
const InputTodo = () => {

    const [description, setDescription] = useState("")
    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { description };
            const response = await fetch(
                "http://localhost:5550/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            }
            )
            window.location = '/'
        } catch (err) {
            console.error(err.message)
        }
    }
    return (
        <Fragment>
            <h1 className='text-center mt-4'>Pern Todo List 📋</h1>
            <form
                className='d-flex mt-4'
                onSubmit={onSubmitForm}
            >
                <input
                    type="text"
                    className='form-control'
                    placeholder='Add a Task !!'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button className='btn btn-success'>Add</button>
            </form>
        </Fragment>
    )
}

export default InputTodo