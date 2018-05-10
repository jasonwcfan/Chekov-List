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

const SERVER_URL = 'http://f1cca312.ngrok.io/graphql'

export default class App extends React.Component {
  state = {
    issues: [],
    orientation: this.getOrientation(Dimensions.get('screen'))
  }

  async componentWillMount() {
    Dimensions.addEventListener('change', (dims) => {
      this.setState({
        orientation: this.getOrientation(dims.screen)
      })
    })
    
    const response = await this.fetchIssueList()
    
    this.setState({
      issues: response.data.issues
    })
  }
  
  fetchIssueList = async () => {
    const response = await fetch(SERVER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'query': '{ issues { patientName roomNumber doctorName issueDescription status }}'
      })
    })
    return await response.json()
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
