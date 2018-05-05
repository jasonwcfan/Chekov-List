import React from 'react'
import Expo from 'expo'
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import styled from 'styled-components/native'

import Table from './src/components/Table'

const _ISSUES = [
  {
    patientName: 'John Doe',
    roomNumber: 'D1',
    doctorName: 'Doctor Strange',
    issueDescription: 'something is wrong',
    status: 'New'
  },
  {
    patientName: 'Alex Smith',
    roomNumber: 'D2',
    doctorName: 'Doctor Manhattan',
    issueDescription: 'bad poo poo',
    status: 'New'
  },
  {
    patientName: 'Mary Jane',
    roomNumber: 'D3',
    doctorName: 'Doctor Doom',
    issueDescription: 'everything hurts',
    status: 'New'
  }
]

export default class App extends React.Component {
  state = {
    issues: _ISSUES,
    orientation: this.getOrientation(Dimensions.get('screen'))
  }

  componentWillMount() {
    Dimensions.addEventListener('change', (dims) => {
      this.setState({
        orientation: this.getOrientation(dims.screen)
      })
    })
  }

  getOrientation(dims) {
    return dims.width > dims.height ? 'landscape' : 'portrait'
  }

  addNewIssue = () => {
    this.setState({
      issues: this.state.issues.concat({
        patientName: 'Patient Name',
        roomNumber: 'Room Number',
        doctorName: 'Doctor',
        issueDescription: 'Issue Description',
        status: 'New'
      })
    })
  }

  markIssueAsComplete = (index) => {
    let nextIssues = this.state.issues
    nextIssues[index].status = 'Done'
    this.setState({
      issues: nextIssues
    })
  }

  render() {
    return (
      <Container>
        <Table
          issues={this.state.issues}
          addNewIssue={this.addNewIssue}
          markIssueAsComplete={this.markIssueAsComplete}
          orientation={'landscape'}
        />
      </Container>
    )
  }
}

const Container = styled(ScrollView)`
    flex: 1
    background-color: #fff
`
