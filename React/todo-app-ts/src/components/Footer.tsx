import { type FilterValue } from '../types'
import { Filters } from './Filters'

interface Props {
  activeCount: number
  activeFilter: FilterValue
  onFilterChange: (filterSelected: FilterValue) => void
  onClearComplete: () => void
}

export const Footer: React.FC<Props> = ({ activeCount, activeFilter, onFilterChange, onClearComplete }) => {
  return (
    <>
        <footer className="footer">
            <span className="todo-count">
                <strong>{activeCount}</strong> item left
            </span>
            <Filters
            filterSelected={activeFilter}
            onFilterChange={onFilterChange}/>
            <a className={ `clear-completed ${activeCount > 0 ? 'active' : ''} `}
            onClick={onClearComplete}>
                <label> Hide completed </label>
            </a>
        </footer>
    </>
  )
}
