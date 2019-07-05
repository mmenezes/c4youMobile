import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CheckInActions from '../actions/CheckInActions';
import * as config from '../config';
import { Container, Row, Col, Button } from 'reactstrap';
import Loader from 'react-loader-spinner';
import cookies from 'cookies-js';
import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import { DateTimePicker } from 'react-widgets';

moment.locale('en');
momentLocalizer();

export class CheckIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderDate: moment().format('YYYY-M-DD')
    }
  }

  componentWillMount() {
    this.props.actions.getCustomerDetails(cookies.get('username'));
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  checkIn = () => {
    this.props.actions.checkIn(cookies.get('name'), this.props.medication, this.state.orderDate);
  }

  render() {
    console.log(this.state.orderDate);
    return (
      <Container>
        <Row className="bottomBorder">
          <Col>
            <img src={require('../images/logo.png')} width="20%" />
            <br />
            Care4U
          </Col>
          <Col className="alignRight">Welcome {cookies.get('name')}</Col>
        </Row>
        <Row>
          <Col className="alignCenter">
            {this.props.isLoading ? (
              <Loader type="Triangle" color="#007bff" height={80} width={80}/>
            ) : (
              <Container>
                <Row>
                  <Col>
                    Name:
                  </Col>
                  <Col>
                    {this.props.name}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    Age:
                  </Col>
                  <Col>
                    {this.props.age}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    Blood Group:
                  </Col>
                  <Col>
                    {this.props.bloodGroup}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    Condition:
                  </Col>
                  <Col>
                    {this.props.condition}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    Doctor:
                  </Col>
                  <Col>
                    {this.props.doctor}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    Medication:
                  </Col>
                  <Col>
                    {this.props.medication}
                  </Col>
                </Row>
                <Row>
                  <Col>
                  <DateTimePicker
                    time={false}
                    defaultValue={new Date()}
                    format='MMMM Do YYYY'
                    onChange={value => this.setState({ orderDate: moment(value).format('YYYY-M-DD') })}
                  />
                  </Col>
                </Row>
                <Row>
                  <Col className="alignCenter">
                    <Button color="success" onClick={this.checkIn}>Check-In</Button>
                  </Col>
                </Row>
              </Container>
            )}
          </Col>
        </Row>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.CheckInReducer.get('isLoading'),
    name: state.CheckInReducer.get('name'),
    age: state.CheckInReducer.get('age'),
    bloodGroup: state.CheckInReducer.get('bloodGroup'),
    condition: state.CheckInReducer.get('condition'),
    doctor: state.CheckInReducer.get('doctor'),
    medication: state.CheckInReducer.get('medication')
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(CheckInActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckIn);
