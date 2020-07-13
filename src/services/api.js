

import axios from 'axios';

// busca as informaçoes no backend atras de uma apiRest 
const api = axios.create({

    baseURL: 'https://rocketseat-node.herokuapp.com/api'
});

export default api;