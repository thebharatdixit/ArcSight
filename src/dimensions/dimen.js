import { Dimensions } from 'react-native';


export const getDimen = (value) => {
    return Dimensions.get('window').width * value;
}