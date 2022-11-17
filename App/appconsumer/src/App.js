import './App.css';
import { useState } from 'react';
import { Badge, Col, Container, Row, Button, Form, Stack, Alert, Card } from 'react-bootstrap'
import { FiSend } from 'react-icons/fi'
import { GiConfirmed, GiCancel } from 'react-icons/gi'
import axios from 'axios';

function App() {

  const [text, setText] = useState('');
  const [dataFromResult, setDataFromResult] = useState()
  const [dataFromReadResult, setDataFromReadResult] = useState()
  const [show, setShow] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [messageConnected, setMessageConnected] = useState('')
  const [showAlertForDisconnected, setShowAlertForDisconnected] = useState(false)
  const [showAlertForServiceError, setShowAlertForServiceError] = useState(false)
  const [addDate, setAddDate] = useState(false)
  let token = ''

  const handleChange = event => {
    setText(event.target.value);
  };

  // --------------- Service calls ---------------

  // Apps

  const writeInFile = async () => {

    if (isConnected) {

      const textToWrite = {
        'text': text,
        'add_date': addDate
      }

      const result = {}

      const res = await axios.post('write/txt', textToWrite).then((response) => {
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

    } else {

      setShowAlertForDisconnected(true)

      return new Promise((resolve) => {
        setTimeout(() => {
          setShowAlertForDisconnected(false)
          resolve();
        }, 2000)
      });

    }

  }

  const readInFile = async () => {

    if (isConnected) {

      const result = {}

      const res = await axios.get('read/txt').then((response) => {
        result.message = response.data.response
        result.status = response.status
      }).catch((error) => {
        if (error.response) {
          result.message = error.response.data.response
          result.status = error.response.status
        }
      })

      setDataFromReadResult(result)

    } else {

      setShowAlertForDisconnected(true)

      return new Promise((resolve) => {
        setTimeout(() => {
          setShowAlertForDisconnected(false)
          resolve();
        }, 2000)
      });

    }

  }

  // Security

  const canConnect = async () => {

    if (!isConnected) {

      const result = {}

      const res = await axios.post('create/token').then((response) => {
        result.message = response.data.response
        result.status = response.status
        result.token = response.data.token
      }).catch((error) => {
        if (error.response) {
          result.message = error.response.data.response
          result.status = error.response.status
        }
      })

      if (result.status === 200) {

        token = result.token
        setMessageConnected('Connected')
        setIsConnected(true)
        setShowAlertForDisconnected(false)

        return new Promise((resolve) => {
          setTimeout(() => {
            verifyToken()
            resolve();
          }, 60000)
        });

      } else if (result.status === 500) {

        setShowAlertForServiceError(true)

        return new Promise((resolve) => {
          setTimeout(() => {
            setShowAlertForServiceError(false)
            resolve();
          }, 4000)
        });

      }

    } else {

      setMessageConnected('You are already connected!')

    }

  }

  const verifyToken = async () => {

    const result = {}

    const res = await axios.get('verify/token', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      result.message = response.data.response
      result.status = response.status
    }).catch((error) => {
      if (error.response) {
        result.message = error.response.data.response
        result.status = error.response.status
      }
    })

    if (result.status === 401) {

      setIsConnected(false)
      token = ''

    }else if (result.status === 500){

      setIsConnected(false)
      token = ''

      setShowAlertForServiceError(true)

      return new Promise((resolve) => {
        setTimeout(() => {
          setShowAlertForServiceError(false)
          resolve();
        }, 4000)
      });      

    }

  }

  return (
    <div className="App">
      <header className="App-header">
        <h3>
          App Consumer <Button variant="dark" onClick={canConnect}>
            {
              isConnected && (
                <>
                  {messageConnected} <Badge bg="success"> <GiConfirmed></GiConfirmed> </Badge>
                </>
              )
            }
            {
              !isConnected && (
                <>
                  Disconnected <Badge bg="danger"> <GiCancel></GiCancel> </Badge>
                </>
              )
            }
          </Button>
        </h3>

        <Container>
          <Row>
            <Col md="12">
              <Stack gap={2} className="col-md-5 mx-auto">
                <Form.Group className="mb-3">
                  <Form.Label>Type text to write in .txt</Form.Label>
                  <Form.Check
                    type={'checkbox'}
                    id={`default`}
                    label={`Add server date and time`}
                    className="card-text-left font-size-checkbox text-info"
                    onChange={() => { setAddDate(!addDate) }}
                    checked={addDate}
                  />
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
          <Row>
            <Col md="12">
              <Stack gap={2} className="col-md-5 mx-auto mt-1">
                <Alert show={showAlertForDisconnected} key={'warning'} variant={'warning'}>
                  <h6>
                    You're not online!
                  </h6>
                </Alert>
              </Stack>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Stack gap={2} className="col-md-5 mx-auto mt-1">
                <Alert show={showAlertForServiceError} key={'danger'} variant={'danger'}>
                  <h6>
                    Could not establish connection with the Service, are you sure that it is turned on?
                  </h6>
                </Alert>
              </Stack>
            </Col>
          </Row>
        </Container>

        <Container>
          <Row>
            <Col md="12">
              <Stack gap={2} className="col-md-5 mx-auto">
                <Form.Group className="mb-3">
                  <Form.Label>Read text from .txt</Form.Label>
                  {
                    dataFromReadResult && (
                      <>
                        {
                          dataFromReadResult.status === 200 && (
                            <>
                              <Row>
                                <Col md="12">
                                  <Card
                                    bg={'dark'}
                                    key={'dark'}
                                    text={'white'}
                                    className="card-text-left"
                                  >
                                    <Card.Body>
                                      <Card.Text>
                                        <h6>
                                          {dataFromReadResult.message}
                                        </h6>
                                      </Card.Text>
                                    </Card.Body>
                                  </Card>
                                </Col>
                              </Row>
                            </>
                          )
                        }
                        {
                          dataFromReadResult.status === 500 && (
                            <>
                              <Row>
                                <Col md="12">
                                  <Card
                                    bg={'danger'}
                                    key={'danger'}
                                    text={'white'}
                                    className="card-text-left"
                                  >
                                    <Card.Body>
                                      <Card.Text>
                                        <h6>
                                          {dataFromReadResult.message}
                                        </h6>
                                      </Card.Text>
                                    </Card.Body>
                                  </Card>
                                </Col>
                              </Row>
                            </>
                          )
                        }
                      </>
                    )
                  }
                </Form.Group>
                <Button onClick={readInFile} variant="secondary">Generate text</Button>
              </Stack>
            </Col>
          </Row>
        </Container>
      </header>
    </div >
  );
}

export default App;
