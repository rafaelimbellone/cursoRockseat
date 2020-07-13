


import { createStackNavigator } from 'react-navigation';
import Main from './pages/main';
import Product from './pages/product';

export default createStackNavigator({
    Main,
    Product
},{
    // define cor da barra que o react navigation cria a baixo da status bar
    navigationOptions: {
        headerStyle:{
            backgroundColor:"#DA552F"
        },
        headerTintColor: "#FFF"
    }
});