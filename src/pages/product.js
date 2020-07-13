
import React from 'react';
import { WebView } from 'react-native-webview';

//abre uma pagina web no formato do celular
const Product = ({ navigation }) => (

   <WebView source= {{ uri: navigation.state.params.product.url}} />
);

// difine o nome do titulo da pagina
Product.navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.product.title

});

export default Product;