import axios from 'axios'

export const todosApi = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
})

export const getTodos = async () => {
  const res = await todosApi.get('/todos')
  return res.data
}

export const addTodo = async (todo) => {
  return await todosApi.post('/todos', todo)
}

export const updateTodo = async (todo) => {
  return await todosApi.patch(`/todos/${todo.id}`, todo)
}

export const deleteTodo = async ({ id }) => {
  return await todosApi.delete(`/todos/${id}`, id)
}
