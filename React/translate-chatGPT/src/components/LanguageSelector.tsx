
import { Form } from 'react-bootstrap'

import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants'
import { SectionType, type FromLanguage, type Language } from '../types.d'

type Props =
  | { type: SectionType.From, value: FromLanguage, onChange: (language: FromLanguage) => void }
  | { type: SectionType.To, value: Language, onChange: (language: Language) => void }

export const LanguageSelector = ({ onChange, type, value }: Props) => {
  const selectedLaguage = value

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Language)
  }
  return (
        <Form.Select onChange={handleChange} value={selectedLaguage}>
            {type === SectionType.From && <option value={AUTO_LANGUAGE}>Detectar idioma</option>}

                {Object.entries(SUPPORTED_LANGUAGES).map(([key, value]) => (
                  <option key={key} value={key.toString()} >{value}</option>
                ))}
            </Form.Select>
  )
}
