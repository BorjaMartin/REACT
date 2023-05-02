import 'bootstrap/dist/css/bootstrap.min.css'

import { Container, Row, Col, Button } from 'react-bootstrap'
import './App.css'

import { useStore } from './hooks/useStore'
import { AUTO_LANGUAGE } from './constants'
import { ArrowsIcon } from './components/icons'
import { LanguageSelector } from './components/LanguageSelector'
import { SectionType, type FromLanguage } from './types.d'

function App () {
  const { fromLanguage, toLanguage, interChageLanguges, setFromLanguage } = useStore()
  const onChange = (value: FromLanguage) => {
    setFromLanguage(value)
  }
  return (
      <Container fluid>
        <h1>Google Translate</h1>

        <Row>
          <Col>
            <h2>From</h2>
            <LanguageSelector value={fromLanguage} onChange={onChange} type={SectionType.From}/>
          </Col>
          <Col>
            <Button variant='link' disabled={fromLanguage === AUTO_LANGUAGE} onClick={() => {
              interChageLanguges()
            }}>
              <ArrowsIcon />
            </Button>
          </Col>
          <Col>
            <h2>To</h2>
            {toLanguage}
          </Col>
        </Row>
      </Container>
  )
}
export default App
