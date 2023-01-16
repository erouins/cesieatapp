import axios from 'axios'
import jwt_decode from "jwt-decode";
// import { accountService } from '@/_services'
// import router from '@/router'
// import store from '@/store'


const accesToken = localStorage.getItem("token")
const currentRefreshToken = localStorage.getItem("refreshToken")

const Axios = axios.create({
    baseURL: 'http://localhost:3001'
})

if ( localStorage.getItem("token") != null){


const url = "http://localhost:3001/auth/refresh-tokens"

var decoded = jwt_decode(accesToken);
const now = Date.now();

console.log(decoded.exp);
console.log(Date.now());

const difference = (decoded.exp * 1000) - now

console.log(decoded.exp);
console.log(now/1000);

console.log("diff :" +difference/1000);
const minutes = new Date(-difference).getMinutes()
console.log("minutes restantes: " + minutes)




/**
 * Interceptor pour injection token
 */
Axios.interceptors.request.use(request => {

    
    
    // Si connecté on ajoute le token dans l'entête
    if(accesToken != null){
        request.headers.Authorization = 'Bearer '+ accesToken
    }
  
    return request
})

/**
 * Interceptor des réponses de l'API
 */
Axios.interceptors.response.use(response => {

   
    
    return response
}, error => {


    

    if(!error.response){
        // Erreur rzo
        return Promise.reject(error)
    }else{
        if(error.response.status == 401){
          
            if (minutes < 10){
                console.log('inferieur a dix minutes')
                axios.post(url, {refreshToken: currentRefreshToken}).then((response) => {
                    localStorage.setItem("token", response.data.access.token);
                    localStorage.setItem("refreshToken", response.data.refresh.token);
        });
            }else {
                console.log('superieur a dix minutes')
            }
        }else{
            // Erreur de l'API
           
            return Promise.reject(error)
        }
    }
})
}

export default Axios