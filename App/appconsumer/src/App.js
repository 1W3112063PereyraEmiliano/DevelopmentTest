import './App.css';
import { useState } from 'react';
import { Badge, Col, Container, Row, Button, Form, Stack, Alert } from 'react-bootstrap'
import { FiSend } from 'react-icons/fi'
import { GiConfirmed, GiCancel } from 'react-icons/gi'
import axios from 'axios';

function App() {

  const [text, setText] = useState('');
  const [dataFromResult, setDataFromResult] = useState()
  const [show, setShow] = useState(false)

  const handleChange = event => {
    setText(event.target.value);
  };

  const writeInFile = async () => {

    const textToWrite = {
      'text': text
    }

    const result = {}

    const res = await axios.post('writeline', textToWrite).then((response) => {
      result.message = response.data.response
      result.status = response.status
    }).catch((error) => {
      if (error.response) {
        result.message = error.response.data.response
        result.status = error.response.status
      }
    })

    setDataFromResult(result)
    setShow(true)

    return new Promise((resolve) => {
      setTimeout(() => {
        setShow(false)
        resolve();
      }, 2000)
    });

  }

  return (
    <div className="App">
      <header className="App-header">
        <h3>
          App Consumer <Button variant="dark">
            Connected <Badge bg="success"> <GiConfirmed></GiConfirmed> </Badge>
            <span className="visually-hidden">unread messages</span>
          </Button>
        </h3>

        <Container>
          <Row>
            <Col md="12">
              <Stack gap={2} className="col-md-5 mx-auto">
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Type text to write in .txt</Form.Label>
                  <Form.Control maxLength={256} value={text} onChange={handleChange} as="textarea" rows={4} />
                </Form.Group>
                <Button onClick={writeInFile} variant="secondary"> <FiSend></FiSend> Submit</Button>
              </Stack>
            </Col>
          </Row>
          {
            dataFromResult && (
              <>
                {
                  dataFromResult.status === 200 && (
                    <>
                      <Row>
                        <Col md="12">
                          <Stack gap={2} className="col-md-5 mx-auto mt-1">
                            <Alert show={show} key={'success'} variant={'success'}>
                              <h6>
                                {dataFromResult.message}
                              </h6>
                            </Alert>
                          </Stack>
                        </Col>
                      </Row>
                    </>
                  )
                }
                {
                  dataFromResult.status === 500 && (
                    <>
                      <Row>
                        <Col md="12">
                          <Stack gap={2} className="col-md-5 mx-auto mt-1">
                            <Alert show={show} key={'danger'} variant={'danger'}>
                              <h6>
                                {dataFromResult.message}
                              </h6>
                            </Alert>
                          </Stack>
                        </Col>
                      </Row>
                    </>
                  )
                }
              </>
            )
          }
        </Container>

      </header>
    </div >
  );
}

export default App;
