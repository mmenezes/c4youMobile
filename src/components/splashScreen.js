import React, { Component } from 'react';
import * as config from '../config';
import { Container, Row, Col } from 'reactstrap';

class SplashScreen extends Component {
  componentWillMount() {
  }

  componentDidMount() {
    setTimeout(() => {
      const path = config.DOCUMENT_ROOT + 'login';
      this.props.history.push(path);
    }, 2500);
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <Container>
        <Row>
          <Col className="alignCenter">
            <img src={require('../images/logo.png')} />
          </Col>
        </Row>
        <Row>
          <Col className="alignCenter">
            Care4U
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SplashScreen;
