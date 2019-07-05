import '../stylesheets/Login.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as LoginActions from '../actions/LoginActions';
import * as config from '../config';
import { Container, Row, Col, Form, Button, Input } from 'reactstrap';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'steve_philips',
      password: 'abcd1234'
    }
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  login = (e) => {
    e.preventDefault();
    this.props.actions.login(this.state.username, this.state.password);
  }

  render() {
    return (
      <Form noValidate>
        <Container>
          <Row>
            <Col className="alignCenter">
              <img src={require('../images/logo.png')} />
            </Col>
          </Row>
          <Row>
            <Col className="alignCenter">
              Care4U Login
            </Col>
          </Row>
          <Row>
            <Col>
              <Input type="text" className="" placeholder="Username" name="username" onChange={this.onChange} value={this.state.username} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Input type="password" className="" placeholder="Password" name="password" onChange={this.onChange} value={this.state.password} />
            </Col>
          </Row>
          <Row>
            <Col className="alignCenter">
              <Button color="success" onClick={this.login}>Login</Button>
            </Col>
            <Col className="alignCenter">
              <Button outline color="success" onClick={() => { return false; }}>Register</Button>
            </Col>
          </Row>
        </Container>
      </Form>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(LoginActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
