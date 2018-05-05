import React from 'react'
import {
  Animated,
  TextInput,
  View,
  TouchableHighlight
} from 'react-native'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

export default class TextField extends React.Component {
  state = {
  }


  render() {
    return (
      <TextInput value={this.props.value}/>
    )
  }
}

TextField.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string
}

const Container = styled.View`
  flex: 1
  width: 100%
  background-color: #fff
  align-items: center
  justify-content: center
`
