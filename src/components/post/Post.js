import React from 'react';
import { Form, Button, Row, Tabs, Tab } from 'react-bootstrap';
import './Post.css';

class Post extends React.Component {
  render() {
    return (
      <Form>
        <h1>Create Post</h1>

        <Tabs defaultActiveKey="home" transition={false} id="noanim-tab-example">
          <Tab eventKey="driver" title="Driver">
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Address</Form.Label>
              <Form.Control type="address" placeholder="UC San Diego" />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlInput2">
              <Form.Label>Date</Form.Label>
              <Form.Control type="address" placeholder="6/13/19" />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlInput3">
              <Form.Label>Price</Form.Label>
              <Form.Control type="address" placeholder="$14" />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows="5" placeholder="This is a line of description." />
            </Form.Group>
          </Tab>
          <Tab eventKey="passenger" title="Passenger">
          </Tab>
        </Tabs>
        

        <Row>
          <Button variant="primary" type="submit">
            Request
          </Button>

          <Button variant="primary" type="submit">
            Email
          </Button>
        </Row>
      </Form>
    );
  }
}

export default Post;