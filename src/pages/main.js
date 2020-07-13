
import React, { Component } from 'react';
import {View, Text, 
        StyleSheet, 
        FlatList, 
        TouchableOpacity
       } from 'react-native';
import api from '../services/api';


export default class Main extends Component{
    
    static navigationOptions = {
        title: "JsHun"
    };

    // estado dos documentos
    state = {
        productInfo:{},
        docs: [],
        page:1,
    }

    // metodo é disparado imediatamente em tela. esse metodo nao acessa o this
    // por causa do (){}
    componentDidMount(){
        this.CarregandoProduto();
    }
    // esse heroFunction tem acesso ao this
    // busca os produtos da apiRest
    CarregandoProduto = async ( page = 1) => {
      const resposta = await api.get(`/products?page=${page}`);
      //desestruturacao os docs dos dados vindo da apiRest
      const{ docs, ...productInfo } = resposta.data;

      // docs: [...this.state.docs, ...docs] = concatena os dados anterios com os novos.
      this.setState({docs: [...this.state.docs, ...docs], 
                     productInfo,
                      page
                    });
    }
 
    londMore = () =>{
       const {page, productInfo} = this.state;
       // se a pagina for igual ao total de paginas no banco faz o retorn
       if(page === productInfo.pages) return;
       
       //senao acrescenta a pagina + 1, 
       const pageNumber = page + 1;

       //chama a funcao passando o numero de paginas
       this.CarregandoProduto(pageNumber);
    }

    //  função para renderizar os itens
    renderItens = ({ item }) => (
        <View style={styles.containerProduct}>
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productDescription}>{item.description}>{} </Text> 
            <TouchableOpacity style={styles.productButton} 
                              onPress= {()=> {
                               this.props.navigation.navigate("Product", {product: item})
                              }}>
                <Text style={styles.productButtonText}>Acessar</Text>
            </TouchableOpacity>                      
        </View>
    )

    render(){
        return (
            <View style={styles.container}>
                <FlatList //usado para lista
                   contentContainerStyle= {styles.list}
                   data= {this.state.docs}     
                   keyExtractor= {item => item._id}   
                   renderItem= {this.renderItens}  
                   onEndReached= {this.londMore} // quando chegar no fim da lista
                   onEndReachedThreshold= {0.2}     //percentual de quando chegar no fim pra carregar
                />    
            </View>

        );
    }
}

// onde os estilos são feitos
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5F5DC', //color do fundo da tela
      //alignItems: 'center', // alignItens alinha topo, centro, direita, esquerda, baixo
      //justifyContent: 'center', // justifyContent alinha topo, centro, direita, esquerda, baixo
    },
    list: {
      padding: 20,
    },
    // cria layout 
    containerProduct:{
       backgroundColor:'#FFF',
       borderWidth:1,
       borderColor:'#DDD',
       borderRadius:5,
       padding:20,
       marginBottom: 20
    },
    productTitle:{
      fontSize:18,
      fontWeight:"bold",
      color:"#333",
    },
    productDescription:{
      fontSize: 16,
      color:'#999',
      marginTop: 5,
      lineHeight: 24,
    },
    productButton:{
      height: 42,
      borderRadius:5,
      borderWidth:2,
      borderColor:'#DEB887',
      backgroundColor: 'transparent',
      justifyContent:'center',
      alignItems:'center',
      marginTop: 10,
    },
    productButtonText:{
        fontSize:16,
        color:"#DA552F",
        fontWeight:'bold',
    },


})