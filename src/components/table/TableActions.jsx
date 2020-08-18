import axios from 'axios'
const BASE_URL = `${window.REACT_APP_URL}`

export function getListImport(){

    
    const response = axios.get(`${BASE_URL}/importacao`)
    return {    
        type: 'LIST_IMPORTS_FETCHED',
        payload: response
    }
     
}
