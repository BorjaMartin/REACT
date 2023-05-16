import 'bootstrap/dist/css/bootstrap.min.css'

import { Container, Row, Col, Button } from 'react-bootstrap'
import './App.css'

import { useStore } from './hooks/useStore'
import { AUTO_LANGUAGE } from './constants'
import { ArrowsIcon } from './components/icons'
import { LanguageSelector } from './components/LanguageSelector'
import { TextArea } from './components/TextArea'
import { SectionType } from './types.d'
import { useEffect } from 'react'
import { translate } from './service/translate'

function App() {
  const {
    fromLanguage,
    toLanguage,
    loading,
    result,
    fromText,
    interChageLanguges,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
  } = useStore()

  useEffect(() => {
    console.log(fromText)
    if (fromText === ' ') return
    translate({ fromLanguage, toLanguage, text: fromText })
      .then((result) => {
        if (result == null) return
        setResult(result)
      })
      .catch((e) => {
        console.log(e)
        setResult('Error')
      })
  }, [fromText])

  return (
    <Container fluid>
      <h1>Google Translate</h1>

      <Row>
        <Col>
          <h2>From</h2>
          <LanguageSelector
            value={fromLanguage}
            onChange={setFromLanguage}
            type={SectionType.From}
          />
          <TextArea
            type={SectionType.From}
            loading={loading}
            value={fromText}
            onChange={setFromText}
          />
        </Col>
        <Col>
          <Button
            variant="link"
            disabled={fromLanguage === AUTO_LANGUAGE}
            onClick={interChageLanguges}
          >
            <ArrowsIcon />
          </Button>
        </Col>
        <Col>
          <h2>To</h2>
          <LanguageSelector value={toLanguage} onChange={setToLanguage} type={SectionType.To} />
          <TextArea type={SectionType.To} loading={loading} value={result} onChange={setResult} />
        </Col>
      </Row>
    </Container>
  )
}
export default App
