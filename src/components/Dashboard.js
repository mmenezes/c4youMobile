import '../stylesheets/Dashboard.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as DashboardActions from '../actions/DashboardActions';
import * as config from '../config';
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input } from 'reactstrap';
import cookies from 'cookies-js';
import 'normalize.css/normalize.css';
import './third-party/chatbot/stylesheets/index.css';
import ChatBotContainer from './third-party/chatbot/components/ChatContainer';
import {
  PieChart, Pie, Sector, Cell,
} from 'recharts';
import moment from 'moment';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      value: '',
      remarks: '',
      LogEntryModal: false
    }
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  toggleLogEntryModal = () => {
    this.setState(prevState => ({
      LogEntryModal: !prevState.LogEntryModal
    }));
  }

  onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  logEntry = (e) => {
    e.preventDefault();
    // Call some action;
    this.props.actions.addLogReadings(cookies.get('name'), this.state.type, this.state.value, this.state.remarks);
    this.toggleLogEntryModal();
    this.setState({
      type: '',
      value: '',
      remarks: ''
    });
  }

  render() {
    return (
      <div>
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
            <Col className="alignCenter latestCheck">
              Latest check at {moment().subtract('1 hours').subtract('30 seconds').format('MMMM Do YYYY, h:mm:ss a')}
            </Col>
          </Row>
          <Row>
            <Col className="alignCenter">
              <PieChart width={350} height={350}>
                <Pie
                  data={data}
                  cx={200}
                  cy={200}
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {
                    data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                  }
                </Pie>
              </PieChart>
            </Col>
          </Row>
          <Row className="topBorder bottomBorder" style={{ marginBottom: '35px', marginTop: '-35px' }}>
            <Col className="alignCenter">
              <span>Yoga pose of the day:</span>
              <br />
              <img src={require('../images/yoga-' + cookies.get('randomHealthTipIndex') + '.png')} width="128" />
              <br />
              <span className="poseOfTheDay">{cookies.get('randomHealthTip')}</span>
            </Col>
          </Row>
          <Row>
            <Col className="alignCenter">
              <Button color="success" onClick={this.toggleLogEntryModal}>Log Entry</Button>
              <Modal isOpen={this.state.LogEntryModal} toggle={this.toggleLogEntryModal}>
                <ModalHeader toggle={this.toggleLogEntryModal}>Log Entry</ModalHeader>
                <ModalBody>
                  <Container>
                    <Row>
                      <Col>
                        <Label for="type">Type</Label>
                        <Input type="select" name="type" onChange={this.onChange} value={this.state.type}>
                          <option>FBSL - Fasting Blood Sugar</option>
                          <option>PPSL - Post Prandial Blood Sugar</option>
                          <option>Systolic Blood pressure</option>
                          <option>Diastolic Blood pressure</option>
                        </Input>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                      <Label for="value">Value</Label>
                      <Input type="text" placeholder="Value" name="value" onChange={this.onChange} value={this.state.value} />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Label for="remarks">Remarks</Label>
                        <Input type="textarea" placeholder="Remarks" name="remarks" onChange={this.onChange} value={this.state.remarks} />
                      </Col>
                    </Row>
                  </Container>
                </ModalBody>
                <ModalFooter>
                  <Container>
                    <Row>
                      <Col className="alignCenter">
                        <Button color="success" onClick={this.logEntry}>Log</Button>
                      </Col>
                      <Col className="alignCenter">
                        <Button color="secondary" onClick={this.toggleLogEntryModal}>Cancel</Button>
                      </Col>
                    </Row>
                  </Container>
                </ModalFooter>
              </Modal>
            </Col>
            <Col className="alignCenter">
              <Button color="success">Logbook</Button>
            </Col>
          </Row>
          <Row>
            <Col className="alignCenter">
              <Container>
                <Row>
                  <Col className="alignLeft">
                    Daily Readings
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <table width="100%" border="0" className="dailyReadings">
                      <tbody>
                        <tr>
                          <td align="left" valign="top">Carbs</td>
                          <td align="left" valign="top">50 gms</td>
                          <td align="left" valign="top">{moment().subtract('2 hours').format('MMMM Do YYYY, h:mm:ss a')}</td>
                        </tr>
                        <tr>
                          <td align="left" valign="top">Calories</td>
                          <td align="left" valign="top">350 kcal</td>
                          <td align="left" valign="top">{moment().subtract('2 hours').format('MMMM Do YYYY, h:mm:ss a')}</td>
                        </tr>
                        <tr>
                          <td align="left" valign="top">Cholesterol</td>
                          <td align="left" valign="top">201 mg/dL</td>
                          <td align="left" valign="top">{moment().subtract('2 hours').format('MMMM Do YYYY, h:mm:ss a')}</td>
                        </tr>
                        <tr>
                          <td align="left" valign="top">Blood Pressure</td>
                          <td align="left" valign="top">114/76/65</td>
                          <td align="left" valign="top">{moment().subtract('2 hours').format('MMMM Do YYYY, h:mm:ss a')}</td>
                        </tr>
                      </tbody>
                    </table>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
        <ChatBotContainer />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(DashboardActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
