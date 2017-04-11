import React from 'react'
import { View, TextInput, Text } from 'react-native'
import styles from './Styles/CodeInputStyle'
import moment from 'moment'

export default class CodeInput extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            code: '',
            error: false,
            success: false,
        }
    }

    onChanged(text) {
        let newText = '';
        let numbers = '0123456789';

        if(text.length){
            for (var i = 0; i < text.length; i++) {
                if (numbers.indexOf(text[i]) > -1) {
                    newText = newText + text[i];
                } else {
                    // your call back function
                    // alert("please enter numbers only");
                }
            }
        }

        this.setState({
            code: newText,
            success: false,
            error: false,
        })

        if(this.props.code.generatedCode === parseInt(newText)){
            this.props.enterCode(newText);
            this.setState({
                success: true,
                error: false,
                code: ''
            });
        }else if(newText.length === 6){
            this.setState({
                error: true,
                success: false,
                code: ''
            });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput value={this.state.code} maxLength={6} style={styles.textInput} autoFocus={true} keyboardType="numeric" onChangeText = {(text) => this.onChanged(text)} />
                {(() => {
                    if(this.state.success){
                        return (
                            <Text style={{color: 'green', textAlign: 'center'}}>Code Recorded at {moment().format('hh:mm a')}</Text>
                        )
                    }                   
                })()}
                {(() => {
                    if(this.state.error){
                        return (<Text style={{color: 'red', textAlign: 'center'}}>Code Error</Text>)
                    }                   
                })()}
              </View>
        )
    }
}

// // Prop type warnings
// CodeInput.propTypes = {
//   someProperty: React.PropTypes.object,
//   someSetting: React.PropTypes.bool.isRequired
// }
//
// // Defaults for props
// CodeInput.defaultProps = {
//   someSetting: false
// }
