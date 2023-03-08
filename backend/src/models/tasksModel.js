const connection = require('./connection');

//getAll -> retorna todas as tasks do banco de dados
const getAll = async () => {
    const [tasks] = await connection.execute('SELECT * FROM tasks');
    return tasks;
};

//cadastra uma nova tarefa no DB
const createTask = async (tasks) => {
    const { title } = tasks;
    const dateUTC = new Date(Date.now()).toUTCString();

    const query = 'INSERT INTO tasks(title, status, created_ad) VALUES (?, ?, ?)';

    const [createdTask] = await connection.execute(query, [title, 'pendente', dateUTC]);
    return {insertId: createdTask.insertId};
};

const deleteTask = async (id) => {
const [removedTask] = await connection.execute('DELETE FROM tasks WHERE id = ?', [id]);
return removedTask;
};

const updateTask = async (id, task) => {
    const { title, status } = task;

    const query = 'UPDATE tasks SET title = ?, status = ? WHERE id = ?';

    const [updatedTask] = await connection.execute(query, [title, status, id]);
    return updatedTask;
    };

module.exports = {
    getAll,
    createTask,
    deleteTask,
    updateTask,
};