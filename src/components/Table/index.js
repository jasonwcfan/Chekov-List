import React from 'react'
import {
  Animated,
  Button,
  KeyboardAvoidingView,
  Text,
  View,
  TouchableHighlight
} from 'react-native'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

import TableRow from './TableRow'

export default class Table extends React.Component {
  state = {
  }

  renderIssues = () => {
    const issues = this.props.issues.map((issue, idx) => {
      if (issue.status === 'New') {
        return (
          <TableRow
            issue={issue}
            orientation={this.props.orientation}
            markIssueAsComplete={this.props.markIssueAsComplete}
            index={idx}
            key={idx}>
          </TableRow>
        )
      }
    })
    return issues
  }

  renderInsertButton = () => {
    return (
      <Button onPress={this.props.addNewIssue} title='Add New Issue' />
    )
  }

  renderTableHeader = () => {
    return (
      <TableHeader>
        <TableHeaderSection>
          Doctor
        </TableHeaderSection>
        <TableHeaderSection>
          Room
        </TableHeaderSection>
        <TableHeaderSection>
          Patient Name
        </TableHeaderSection>
        <TableHeaderSection>
          Issue Description
        </TableHeaderSection>
      </TableHeader>
    )
  }

  render() {
    return (
      <Container>
        {this.renderTableHeader()}
        {this.renderIssues()}
        {this.renderInsertButton()}
      </Container>
    )
  }
}

Table.propTypes = {
  issues: PropTypes.arrayOf(PropTypes.object).isRequired,
  addNewIssue: PropTypes.func.isRequired,
  markIssueAsComplete: PropTypes.func.isRequired,
  orientation: PropTypes.string.isRequired
}

const Container = styled.View`
  width: 75%
  margin: 50px auto 50px auto
  background-color: #fff
  align-items: center
  justify-content: center
`

const TableHeader = styled.View`
  width: 100%
  height: 40px
  margin: 10px 0 10px 0
  background-color: pink
  flex-direction: row
  justify-content: space-around
  align-items: center
`

const TableHeaderSection = styled.Text`
  flex: 1
  padding: 0 10px 0 10px
  font-weight: bold
  font-size: 16
  text-align: center
`
