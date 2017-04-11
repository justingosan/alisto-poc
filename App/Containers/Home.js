import React from 'react'
import { ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import CodeComponent from '../Components/CodeComponent'
import RoundedButton from '../Components/RoundedButton'
import CodeInput from '../Components/CodeInput'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import CodeActions from '../Redux/CodeRedux'
import moment from 'moment'

// Styles
import styles from './Styles/HomeStyle'

class Home extends React.Component {

    // constructor (props) {
    //   super(props)
    //   this.state = {}
    // }
    // 
    // 
    componentDidMount() {
        this._interval = setInterval(() => {
            if (parseInt(moment().format('mm')) % 1 === 0) {
                this.props.generateCode();
            } else {

            }
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this._interval);
    }

    render() {
        return (
            <ScrollView style={styles.container}>
              <CodeComponent code={this.props.code}/>
              <CodeInput code={this.props.code} enterCode={this.props.enterCode}/>
              <RoundedButton
                text='Sync to Server'
                onPress={this.props.sendCode}
              />
            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        code: state.code
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        generateCode: () => dispatch(CodeActions.generateCode()),
        enterCode: () => dispatch(CodeActions.enterCode()),
        sendCode: () => dispatch(CodeActions.sendCode())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
