import { FILTER_BUTTONS } from '../consts'

import { type FilterValue } from '../types'

interface Props {
  filterSelected: FilterValue
  onFilterChange: (filter: FilterValue) => void
}

export const Filters: React.FC<Props> = ({ filterSelected, onFilterChange }) => {
  return (
    <div className='filters'>
        {Object.entries(FILTER_BUTTONS).map(([key, { literal, href }]) => {
          const isSelected = key === filterSelected
          const className = isSelected ? 'selected' : ''
          return (<li key={key}>
            <a className={className}
                href={href}
                onClick={(event) => {
                  event.preventDefault()
                  onFilterChange(key as FilterValue)
                }}>
                {literal}
            </a>
        </li>)
        })}
    </div>
  )
}
