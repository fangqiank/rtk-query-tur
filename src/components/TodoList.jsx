import React, {useState} from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import {todosApi ,getTodos, addTodo, updateTodo, deleteTodo} from '../api/todosApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faUpload } from '@fortawesome/free-solid-svg-icons'

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

	const updateTodoMutation = useMutation(updateTodo, {
		onSuccess: () => {
			queryClient.invalidateQueries('todos')
		}
	})

	const deleteTodoMutation = useMutation(deleteTodo, {
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
				<article key={todo.id}>
					<div className='todo'>
						<input type="checkbox"
							checked={todo.completed}
							id={todo.id}
							onChange={() => {
								return updateTodoMutation.mutate({
									...todo,
									completed: !todo.completed
								})
							}}
						/>
						<label htmlFor={todo.id}>{todo.title}</label>
					</div>	

					<button 
						className='trash'
						onClick={() => {
							return deleteTodoMutation.mutate({id: todo.id})
						}}
					>
						<FontAwesomeIcon icon={faTrash} />
					</button> 
				</article>
			))}	
		</main>
	)			
}
	
