import React, {useState} from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import {getTodos, addTodo} from '../api/todosApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import TodoItem  from './TodoItem'

export const TodoList = () => {
	const [newTodo, setNewTodo] = useState('')
	const queryClient = useQueryClient()
	const  {
		isLoading,
		isError,
		error, 
		data: todos
	} = useQuery('todos', getTodos, {
		select: data => data.sort((a, b) => b.id - a.id)
	})

	const addTodoMutation = useMutation(addTodo, {
		onSuccess: () => {
			queryClient.invalidateQueries('todos')
		}
	})

	const handleSubmit = e => {
		e.preventDefault()

		addTodoMutation.mutate({
			userId: 1,
			title: newTodo,
			completed: false
		})
		setNewTodo('')
	}


	return (
		<main>
			<h1>Todo List</h1>
			
			<form onSubmit={handleSubmit}>
				<label htmlFor="new-todo">Enter a new todo item: </label>
				<div className='new-todo'>
				<input 
					type='text'
					name='new-todo'
					value={newTodo}
					placeholder='Enter new todo ...'
					onChange={e => setNewTodo(e.target.value)} 
				/>
				</div>
				<button className='submit'>
					<FontAwesomeIcon icon={faUpload} />
				</button>
			</form>
			
			{ isLoading && <p>Loading...</p>}
			{ isError && <p>Error: {error.message}</p>}
			{!isLoading && !isError && todos.map(todo => (
				<TodoItem todo={todo} key={todo.id}/>
			))}	
		</main>
	)			
}
	
