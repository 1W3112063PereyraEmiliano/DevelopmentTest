import './App.css';
import { useState } from 'react';
import { Badge, Col, Container, Row, Button, Form, Stack } from 'react-bootstrap'
import { FiSend } from 'react-icons/fi'
import { GiConfirmed, GiCancel } from 'react-icons/gi'
import axios from 'axios';

function App() {

  const [text, setText] = useState('');

  const handleChange = event => {
    setText(event.target.value);
  };

  const writeInFile = () => {

    const textToWrite = { 
      'text': text
    }

    axios.post('writeline',textToWrite).then((response) => {
        console.log(response)
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
        }
      })
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
                  <Form.Control value={text} onChange={handleChange} as="textarea" rows={4} />
                </Form.Group>
                <Button onClick={writeInFile} variant="secondary"> <FiSend></FiSend> Submit</Button>
              </Stack>
            </Col>
          </Row>
        </Container>

      </header>
    </div>
  );
}

export default App;
