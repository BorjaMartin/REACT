import { type Todo as TodoType } from '../types'

interface Props extends TodoType {
  onRemoveTodo: () => void
  onCompleteTodo: () => void
}

export const Todo: React.FC<Props> = ({ id, title, completed, onRemoveTodo, onCompleteTodo }) => {
  return (
        <div className="view">
            <input className="toggle"
            checked={completed}
            type="checkbox"
            onChange={onCompleteTodo} />
            <label>{title}</label>
            <button className='destroy'
            onClick={onRemoveTodo}></button>
        </div>
  )
}
