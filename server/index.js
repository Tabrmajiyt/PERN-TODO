const express = require("express");
const app = express();
const core = require('cors');
const pool = require('./db')

// middlware 
app.use(core());
app.use(express.json());// req.body

// ROUTES //
// create a todo
app.post("/todos", async(req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES ($1) RETURNING *",
            [description]
        );
        res.json(newTodo.rows[0])
        // console.error(req.body)
    } catch (err) {
        console.error(err.message)
    }
})

// get all todos
app.get('/todos', async (req, res) => {
    try {
        const AllTodo = await pool.query("SELECT * FROM todo");
        res.json(AllTodo.rows)
    } catch (err) {
        console.error(err.message)
    }
})

// get a todo
app.get('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1",
            [id]
        )
        res.json(todo.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//update a todo
app.put('/todos/:id', async (req, res) => {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2",
        [description, id]
    )
    res.json('Todo was Update !!')
    try {

    } catch (err) {
        console.error(err.message)
    }
})

// delete a todo
app.delete('/todos/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const DeleteTodo = await pool.query('DELETE FROM todo WHERE todo_id = $1',
            [id]
        )
    res.json("Todo was Deleted !!")
    } catch (err) {
        console.error(err.message)
    }
})

app.listen(5550, () => {
    console.log("Server has started on port 5550 !")
})