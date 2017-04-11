import React from 'react'
import { View, Text } from 'react-native'
import styles from './Styles/CodeComponentStyle'
import TOTP from '../Services/TOTP'

export default class CodeComponent extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.code}>{this.props.code.generatedCode}</Text>
      </View>
    )
  }
}

// // Prop type warnings
// CodeComponent.propTypes = {
//   someProperty: React.PropTypes.object,
//   someSetting: React.PropTypes.bool.isRequired
// }
//
// // Defaults for props
// CodeComponent.defaultProps = {
//   someSetting: false
// }
