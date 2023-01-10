import React from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Layout from "../../components/layout";
import Input from "../../components/UI/Input"
import {login} from "../../actions"
import { useDispatch } from "react-redux";

function Signin(props) {

  const dispatch = useDispatch();
const userLogin = (e) => {
  e.preventDefault();
  const user = {
    email: "riya28@gmail.com",
    password: "123456"
  }
  dispatch(login(user))
}

  return (
    <div>
      <Layout>
        <Container>
          <Row style= {{marginTop: "100px"}}>
            <Col md={{ span: 6, offset: 3 }}>
              <Form onSubmit={userLogin}>
              <Input
                  label="Email"
                  placeholder="Email"
                  value=""
                  type="email"
                  onChange={() => {}}
                />

                <Input
                  label="Password"
                  placeholder="Password"
                  value=""
                  type="password"
                  onChange={() => {}}
                />
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Layout>
    </div>
  );
}

export default Signin;
