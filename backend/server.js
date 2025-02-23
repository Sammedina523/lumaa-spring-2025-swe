const PORT = process.env.PORT ?? 8000;
const express = require("express");
const app = express();
const pool = require("./db");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json());

// Get todos
app.get("/todos/:userEmail", async (req, res) => {
    const { userEmail } = req.params;
    try {
        const todos = await pool.query("SELECT * FROM todos WHERE user_email = $1", [userEmail]);
        res.json(todos.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// Create new todo
app.post("/todos", async (req, res) => {
    const { user_email, title, progress, date } = req.body;
    const id = uuidv4();

    if (!user_email) {
        return res.status(400).json({ error: "User email is required" });
    }

    try {
        const newTodo = await pool.query(
            `INSERT INTO todos(id, user_email, title, progress, date) VALUES($1, $2, $3, $4, $5) RETURNING *`,
            [id, user_email, title, progress, date]
        );
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// Edit a todo
app.put("/todos/:id", async (req, res) => {
    const { id } = req.params;
    const { user_email, title, progress, date } = req.body;
    try {
        const editTodo = await pool.query(
            "UPDATE todos SET user_email = $1, title = $2, progress = $3, date = $4 WHERE id = $5 RETURNING *",
            [user_email, title, progress, date, id]
        );
        res.json(editTodo.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// Signup 
app.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    try {
        await pool.query("INSERT INTO users (email, hashed_password) VALUES($1, $2)", [email, hashedPassword]);

        const token = jwt.sign({ email }, "secret", { expiresIn: "5h" });

        res.json({ email, token });
    } catch (err) {
        console.error(err);
        if (err.code === "23505") {  // 23505 = Unique constraint violation in PostgreSQL
            res.status(400).json({ detail: "This user already exists." });
        } else {
            res.status(500).json({ error: "Server error" });
        }
    }
});

// Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const users = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (users.rows.length === 0) {
            return res.status(401).json({ detail: "User does not exist" });
        }

        const success = await bcrypt.compare(password, users.rows[0].hashed_password);

        if (!success) {
            return res.status(401).json({ detail: "Incorrect password" });
        }

        const token = jwt.sign({ email }, "secret", { expiresIn: "5h" });
        res.json({ email: users.rows[0].email, token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// Delete a todo
app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleteTodo = await pool.query("DELETE FROM todos WHERE id = $1", [id]);
        res.json(deleteTodo);
    } catch (err) {
        console.error(err);
    }
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
