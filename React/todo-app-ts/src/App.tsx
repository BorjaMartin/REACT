import { useState } from 'react'
import { Todos } from './components/Todos'

import './index.css'
import 'todomvc-app-css/index.css'
import { type TodoTitle, type FilterValue, type TodoId, type Todo } from './types'
import { TODO_FILTERS } from './consts'
import { Header } from './components/Header'

const mocktodos = [
  {
    id: '1',
    title: 'Ver el Twitch de Midu',
    completed: true
  },
  {
    id: '2',
    title: 'Aprender React ocn typeScript ',
    completed: false
  },
  {
    id: '3',
    title: 'Practicar React con Redux',
    completed: false
  }
]

const App = (): JSX.Element => {
  const [todos, setTodos] = useState(mocktodos)
  const [filterSelected, setfilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)

  const handleRemove = ({ id }: TodoId): void => {
    const removeTodos = todos.filter((todo) => todo.id !== id)
    setTodos(removeTodos)
  }

  const handleComplete = ({ id }: TodoId): void => {
    const completeTodo = todos.map((todo) => { if (todo.id === id) todo.completed = !todo.completed; return todo })
    setTodos(completeTodo)
  }

  const handleFilterChanges = (filter: FilterValue): void => {
    setfilterSelected(filter)
  }

  const handleClearComplete = (): void => {
    const clearTodos = todos.filter((todo) => !todo.completed)
    setTodos(clearTodos)
  }

  const handleOnAddTodo = ({ title }: TodoTitle): void => {
    const newTodo: Todo = {
      title,
      id: crypto.randomUUID(),
      completed: false
    }

    const newTodos = [...todos, newTodo]

    setTodos(newTodos)
  }

  const filterTodos = todos.filter((todo) => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    return todo
  })

  const activeCounts = todos.filter((todo) => {
    return !todo.completed
  }).length

  return (
    <div className='todoapp'>
      <Header onAddTodo={handleOnAddTodo}/>
      <Todos
        onRemoveTodo = {handleRemove}
        onCompleteTodo = {handleComplete}
        onFilterChange = {handleFilterChanges}
        onClearComplete = {handleClearComplete}
        todos={filterTodos}
        activeCount={activeCounts}
        filterSelected={filterSelected} />
    </div>
  )
}

export default App
