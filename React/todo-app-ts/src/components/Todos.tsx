import { type TodoId, type ListOfTodos, type FilterValue } from '../types'
import { Todo } from './Todo'
import { Footer } from './Footer'

interface Props {
  todos: ListOfTodos
  onRemoveTodo: ({ id }: TodoId) => void
  onCompleteTodo: ({ id }: TodoId) => void
  onFilterChange: (filterSelected: FilterValue) => void
  onClearComplete: () => void
  filterSelected: FilterValue
  activeCount: number
}

export const Todos: React.FC<Props> = ({ activeCount, todos, filterSelected, onClearComplete, onRemoveTodo, onCompleteTodo, onFilterChange }) => {
  return (
    <div>
        <ul className='todo-list'>
            {todos.map((todo) =>
            <li key={todo.id}
                className={`${todo.completed ? 'completed' : ''}`}>
                <Todo key={todo.id}
                onRemoveTodo={() => { const id = todo.id; onRemoveTodo({ id }) }}
                onCompleteTodo={() => { const id = todo.id; onCompleteTodo({ id }) }}
                id={todo.id} title={todo.title} completed={todo.completed}></Todo>
            </li>
            )}
        </ul>
        <Footer activeCount={activeCount} activeFilter={filterSelected} onFilterChange={onFilterChange} onClearComplete={onClearComplete}></Footer>
    </div>
  )
}
