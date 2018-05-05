import React from 'react'
import {
  Animated,
  Button,
  Text,
  View,
  TouchableHighlight
} from 'react-native'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

import TextField from 'components/TextField'

export default class TableRow extends React.Component {
  state = {
    isAnimating: false,
    accordionAnim: new Animated.Value(0)
  }

  toggleAccordion = () => {
    if (this.state.isAnimating) return
    const toValue = this.state.accordionAnim._value == 0 ? 80 : 0
    this.setState({
      isAnimating: true
    })
    Animated.timing(
      this.state.accordionAnim, {
        toValue,
        duration: 1000
      }
    ).start((finished) => {
      if (finished) this.setState({
        isAnimating: false
      })
    })
  }

  deleteIssue = () => {
    this.props.markIssueAsComplete(this.props.index)
  }

  renderPortrait() {
    return (
      <TouchableContainer onPress={this.toggleAccordion}>
        <RowContainer>
          <RowHeader>
            <Text>
              {this.props.issue.name}
            </Text>
          </RowHeader>
          <RowDetails style={{height: this.state.accordionAnim}}>
          </RowDetails>
        </RowContainer>
      </TouchableContainer>
    )
  }

  renderLandscape() {
    return (
      <LandscapeRowContainer>
        <CompleteButton onPress={this.deleteIssue} title='Done'/>
        <DoctorSection>
          <TextField value={this.props.issue.doctorName} />
        </DoctorSection>
        <RoomNumberSection>
          <TextField value={this.props.issue.roomNumber} />
        </RoomNumberSection>
        <PatientNameSection>
          <TextField value={this.props.issue.patientName} />
        </PatientNameSection>
        <IssueSection>
          <TextField value={this.props.issue.issueDescription} />
        </IssueSection>
      </LandscapeRowContainer>
    )
  }

  render() {
    return this.props.orientation === 'portrait' ? this.renderPortrait() : this.renderLandscape()
  }
}

TableRow.propTypes = {
  issue: PropTypes.object.isRequired,
  orientation: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  markIssueAsComplete: PropTypes.func.isRequired
}

const CompleteButton = styled(Button)`

`

const DoctorSection = styled.View`
  flex: 1
  padding: 0 10px 0 10px
`

const RoomNumberSection = styled.View`
  flex: 1
  padding: 0 10px 0 10px
`

const PatientNameSection = styled.View`
  flex: 1
  padding: 0 10px 0 10px
`

const IssueSection = styled.View`
  flex: 1
  padding: 0 10px 0 10px
`

const LandscapeRowContainer = styled.View`
  margin: 10px 0 10px 0
  height: 40px
  background-color: #E8E8E8
  flex-direction: row
  justify-content: space-around
`

const RowContainer = styled.View`

`

const RowHeader = styled.View`
  height: 40px
  background-color: #E8E8E8
  align-items: center
  justify-content: center
`

const RowDetails = styled(Animated.View)`
  background-color: #F0F0F0
`

const TouchableContainer = styled.TouchableHighlight`
  width: 75%
  margin: 10px 0 10px 0
`
