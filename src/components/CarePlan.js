import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CarePlanActions from '../actions/CarePlanActions';
import * as config from '../config';
import { Container, Row, Col, Button } from 'reactstrap';
import Loader from 'react-loader-spinner';
import cookies from 'cookies-js';

export class CarePlan extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {
    // this.props.actions.getHealthTips(cookies.get('conditionType'));
    this.props.actions.getHealthTips('type2W');
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    const tipsDiet = this.props.tipsDiet;
    const tipsLifestyle = this.props.tipsLifestyle;
    const tipsYoga = this.props.tipsYoga;
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
                    <Container>
                      <Row>
                        <Col><img src={require('../images/diet.png')} width="32" /></Col>
                        <Col className="alignLeft healthTipsHeader">Diet</Col>
                      </Row>
                      <Row>
                        <Col className="alignLeft">
                          {tipsDiet && tipsDiet.split(',').map((tip) => {
                            return (
                              <li key={Math.random()}>{tip}</li>
                            );
                          })}
                        </Col>
                      </Row>
                      <Row>
                        <Col><img src={require('../images/diet.png')} width="32" /></Col>
                        <Col className="alignLeft healthTipsHeader">Lifestyle</Col>
                      </Row>
                      <Row>
                        <Col className="alignLeft">
                          {tipsLifestyle && tipsLifestyle.split(',').map((tip) => {
                            return (
                              <li key={Math.random()}>{tip}</li>
                            );
                          })}
                        </Col>
                      </Row>
                      <Row>
                        <Col><img src={require('../images/yoga.png')} width="32" /></Col>
                        <Col className="alignLeft healthTipsHeader">Yoga</Col>
                      </Row>
                      <Row>
                        <Col className="alignLeft">
                          {tipsYoga && tipsYoga.split(',').map((tip) => {
                            return (
                              <li key={Math.random()}>{tip}</li>
                            );
                          })}
                        </Col>
                      </Row>
                    </Container>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Link to={config.DOCUMENT_ROOT + 'dashboard'}>
                      <Button color="success">Ok, got it!</Button>
                    </Link>
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
    isLoading: state.CarePlanReducer.get('isLoading'),
    tipsDiet: state.CarePlanReducer.get('tipsDiet'),
    tipsLifestyle: state.CarePlanReducer.get('tipsLifestyle'),
    tipsYoga: state.CarePlanReducer.get('tipsYoga')
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(CarePlanActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CarePlan);
