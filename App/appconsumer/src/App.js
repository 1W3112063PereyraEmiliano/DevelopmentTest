import './App.css';
import {Badge, Col, Container, Row, Button, Form, Stack} from 'react-bootstrap'
import {FiSend} from 'react-icons/fi'
import {GiConfirmed, GiCancel} from 'react-icons/gi'

function App() {
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
                  <Form.Control as="textarea" rows={4} />
                </Form.Group>
                <Button variant="secondary"> <FiSend></FiSend> Submit</Button>
              </Stack>
            </Col>
          </Row>
        </Container>

      </header>
    </div>
  );
}

export default App;
