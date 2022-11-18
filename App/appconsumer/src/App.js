import './App.css';
import { useState } from 'react';
import { Badge, Col, Container, Row, Button, Form, Alert, Card, Table } from 'react-bootstrap'
import { FiSend } from 'react-icons/fi'
import { GiConfirmed, GiCancel } from 'react-icons/gi'
import axios from 'axios';

function App() {

  const [text, setText] = useState('');
  const [dataFromResult, setDataFromResult] = useState()
  const [dataFromReadResult, setDataFromReadResult] = useState()
  const [dataFromOrdersByState, setDataOrdersByState] = useState()
  const [dataFromOrdersInRoutes, setDataOrdersInRoutes] = useState()
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

      if (result.status === 200) {

        setDataFromResult(result)
        setShow(true)

        return new Promise((resolve) => {
          setTimeout(() => {
            setShow(false)
            resolve();
          }, 2000)
        });

      } else {

        setIsConnected(false)
        setShowAlertForServiceError(true)

        return new Promise((resolve) => {
          setTimeout(() => {
            setShowAlertForServiceError(false)
            resolve();
          }, 4000)
        });

      }

    } else {

      setShowAlertForServiceError(false)
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

      if (result.status === 200) {

        setDataFromReadResult(result)

      } else {

        setIsConnected(false)
        setShowAlertForServiceError(true)

        return new Promise((resolve) => {
          setTimeout(() => {
            setShowAlertForServiceError(false)
            resolve();
          }, 4000)
        });

      }


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

  const getOrdersByState = async () => {

    if (isConnected) {

      const result = {}

      const res = await axios.get('orders/managment/status').then((response) => {
        result.data = response.data.response
        result.status = response.status
      }).catch((error) => {
        if (error.response) {
          result.message = error.response.data.response
          result.status = error.response.status
        }
      })

      if (result.status === 200) {

        setDataOrdersByState(result)

      } else {

        setIsConnected(false)
        setShowAlertForServiceError(true)

        return new Promise((resolve) => {
          setTimeout(() => {
            setShowAlertForServiceError(false)
            resolve();
          }, 4000)
        });

      }

    } else {

      setShowAlertForServiceError(false)
      setShowAlertForDisconnected(true)

      return new Promise((resolve) => {
        setTimeout(() => {
          setShowAlertForDisconnected(false)
          resolve();
        }, 2000)
      });

    }

  }

  const getOrdersInRoutes = async () => {

    if (isConnected) {

      const result = {}

      const res = await axios.get('orders/managment/routes').then((response) => {
        result.data = response.data.response
        result.status = response.status
      }).catch((error) => {
        if (error.response) {
          result.message = error.response.data.response
          result.status = error.response.status
        }
      })

      if (result.status === 200) {

        setDataOrdersInRoutes(result)

      } else {

        setIsConnected(false)
        setShowAlertForServiceError(true)

        return new Promise((resolve) => {
          setTimeout(() => {
            setShowAlertForServiceError(false)
            resolve();
          }, 4000)
        });

      }

    } else {

      setShowAlertForServiceError(false)
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

        setShowAlertForDisconnected(false)
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

    } else if (result.status === 500) {

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
    <div>
      <header className="App-header">
        <Container fluid>
          <Row>
            <Col lg="8">
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
            </Col>
            <Col lg="4">
              <Row>
                <Col md="12">
                  <Alert show={showAlertForDisconnected} key={'warning'} variant={'warning'}>
                    <h6>You're not online!</h6>
                  </Alert>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <Alert show={showAlertForServiceError} key={'danger'} variant={'danger'}>
                    <h6>
                      Could not establish connection with the Service, are you sure that it is turned on?
                    </h6>
                  </Alert>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </header>
      <div className="bg-grey">
        <Container fluid>
          <Row>
            <Col lg="4">
              <Container fluid>
                <Row>
                  <Col className="mb-2 mt-2" lg="12">
                    <Form.Group className="mb-3">
                      <Form.Label className="text-light">Type text to write in .txt</Form.Label>
                      <Form.Check
                        type={'checkbox'}
                        id={`default`}
                        label={`Add server date and time`}
                        className="font-size-checkbox text-info"
                        onChange={() => { setAddDate(!addDate) }}
                        checked={addDate}
                      />
                      <Form.Control maxLength={256} value={text} onChange={handleChange} as="textarea" rows={3} />
                    </Form.Group>
                    <div className="d-grid gap-2">
                      <Button onClick={writeInFile} variant="secondary"> <FiSend></FiSend> Submit</Button>
                    </div>
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
                                <Alert show={show} key={'success'} variant={'success'}>
                                  <h6>
                                    {dataFromResult.message}
                                  </h6>
                                </Alert>
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
                                <Alert show={show} key={'danger'} variant={'danger'}>
                                  <h6>
                                    {dataFromResult.message}
                                  </h6>
                                </Alert>
                              </Col>
                            </Row>
                          </>
                        )
                      }
                    </>
                  )
                }
              </Container>

              <Container fluid className="mt-1">
                <Row>
                  <Col md="12">
                    <Form.Group className="mb-3">
                      <Form.Label className="text-light">Read text from .txt</Form.Label>
                      {
                        dataFromReadResult && (
                          <>
                            {
                              dataFromReadResult.status === 200 && (
                                <>
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
                                </>
                              )
                            }
                            {
                              dataFromReadResult.status === 500 && (
                                <>
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
                                </>
                              )
                            }
                          </>
                        )
                      }
                    </Form.Group>
                    <div className="d-grid gap-2">
                      <Button onClick={readInFile} variant="secondary">Generate text</Button>
                    </div>
                  </Col>
                </Row>
              </Container>
            </Col>

            <Col lg="8">
              <Container fluid>
                <Row>
                  <Col className="mb-2 mt-2" lg="12">
                    <Form.Group>
                      <Form.Label className="text-light">Order Management</Form.Label>
                    </Form.Group>
                    <Card
                      bg="dark"
                      key={"dark"}
                      text={'white'}
                    >
                      <Card.Header>
                        Number of orders by state
                      </Card.Header>
                      <Card.Body>
                        {
                          dataFromOrdersByState && (
                            <>
                              <Container fluid>
                                {
                                  dataFromOrdersByState.data.map((item) => {
                                    return (
                                      <div key={item.status}>
                                        <Row>
                                          <Col lg="11" md="11">
                                            Estado {item.status}
                                          </Col>
                                          <Col className="text-info" lg="1" md="1">
                                            {item.count}
                                          </Col>
                                        </Row>
                                      </div>
                                    )
                                  })
                                }
                                <Row>
                                  <Col className="text-center" lg="12">
                                    <Button className="btn-sm" onClick={getOrdersByState} variant="secondary">Refresh data</Button>
                                  </Col>
                                </Row>
                              </Container>
                            </>
                          )
                        }
                        {
                          !dataFromOrdersByState && (
                            <>
                              <Container>
                                <Row>
                                  <Col className="text-center" lg="12">
                                    <Button className="btn-sm" onClick={getOrdersByState} variant="secondary">View data</Button>
                                  </Col>
                                </Row>
                              </Container>
                            </>
                          )
                        }
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                <Row>
                  <Col className="mb-2 mt-2" lg="12">
                    <Card
                      bg="dark"
                      key={"dark"}
                      text={'white'}
                    >
                      <Card.Header>
                        Orders in routes
                      </Card.Header>
                      <Card.Body>
                        <Table variant="dark" striped bordered hover size="sm">
                          <thead>
                            <tr>
                              <th>SO Number</th>
                              <th>Route Itin</th>
                              <th>Route</th>
                              <th>Address</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              dataFromOrdersInRoutes && dataFromOrdersInRoutes.data && (
                                <>
                                  {
                                    dataFromOrdersInRoutes.data.map((item) => {
                                      return (
                                        <tr>
                                          <td>{item.so_number}</td>
                                          <td>{item.route_itinerary}</td>
                                          <td>{item.route}</td>
                                          <td>{item.address}</td>
                                          <td>{item.status}</td>
                                        </tr>
                                      )
                                    })
                                  }
                                </>
                              )
                            }
                            {
                              !dataFromOrdersInRoutes && (
                                <>
                                  {
                                    <tr className="text-center">
                                      <td colSpan={5}>No data found</td>
                                    </tr>
                                  }
                                </>
                              )
                            }
                            {
                              dataFromOrdersInRoutes && dataFromOrdersInRoutes.data.length <= 0 && (
                                <>
                                  {
                                    <tr className="text-center">
                                      <td colSpan={5}>No data found</td>
                                    </tr>
                                  }
                                </>
                              )
                            }
                          </tbody>
                        </Table>
                        {
                          !dataFromOrdersInRoutes && (
                            <>
                              <Container>
                                <Row>
                                  <Col className="text-center" lg="12">
                                    <Button className="btn-sm" onClick={getOrdersInRoutes} variant="secondary">View data</Button>
                                  </Col>
                                </Row>
                              </Container>
                            </>
                          )
                        }
                        {
                          dataFromOrdersInRoutes && dataFromOrdersInRoutes.data && (
                            <>
                              <Container>
                                <Row>
                                  <Col className="text-center" lg="12">
                                    <Button className="btn-sm" onClick={getOrdersInRoutes} variant="secondary">Refresh data</Button>
                                  </Col>
                                </Row>
                              </Container>
                            </>
                          )
                        }
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default App;
