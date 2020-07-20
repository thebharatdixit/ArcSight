import { withNavigationFocus } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import {
    ActivityIndicator,
    StatusBar,
    View,
    Image,
    Text
} from 'react-native';
class TabLabel extends React.Component {

    componentDidUpdate(prevProps) {
        if (prevProps.isFocused !== this.props.isFocused) {
            //Call any action to update you view
            //fetch data when the component is focused
            //To prevent extra component re-renders, you may need to write some logic in shouldComponentUpdate
        }
    }

    render() {
        return <Text style={{color:'white'}}>{this.props.badge}</Text>;
    }
}

// withNavigationFocus returns a component that wraps TabLabel and passes
// in the navigation prop
//export default withNavigationFocus(TabLabel);
function mapStateToProps(state) {
    return {
        count: state.navigation.count,
        badge: state.navigation.badge
    }
}

function mapDispatchToProps(dispatch) {

    return {
        dispatch,
        ...bindActionCreators({

        },
            dispatch
        ),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(TabLabel);