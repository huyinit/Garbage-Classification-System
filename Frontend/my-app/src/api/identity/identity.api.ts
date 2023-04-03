/* eslint-disable */
import { IUser, LoginRequest, NewResponseLogin, RegisterRequest, ResponseDeparment, ResponseLogin } from '../../common/define-identity';
// import { Observable } from 'rxjs/internal/Observable';
// import { catchError, map } from "rxjs/operators";
// import HttpClient from "../http-client";
import JSEncrypt from 'jsencrypt';
import { error } from 'console';
// import { IDataResponse } from '../../common/define-meetings';
import axios from 'axios';
export default class IdentityApi {
    static host = 'http://127.0.0.1:5000';
    static encryptData(text: string, key: string) {
        const jsEncrypt = new JSEncrypt();
        jsEncrypt.setPublicKey(key)
        const encypt = jsEncrypt.encrypt(text);
        return encypt || '';
    }
   

    static login(body: LoginRequest): any{
        console.log(body)
        var data = `account=${body.account}&password=${body.password}`
        console.log(data);
        var config = {
            method: 'post',
            url: `${IdentityApi.host}/login`,
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded',
                // 'Cookie': 'session=eyJfZmxhc2hlcyI6W3siIHQiOlsic3VjY2VzcyIsIkxvZ2dlZCBpbiBzdWNjZXNzISJdfV0sImlkIjozfQ.Y3JIbA.zn8hsrwiZ5ub0LpRS1LzVDH8qiz'
            },
            data : data
        };

        return axios(config)

    }

    // static register(body: RegisterRequest):any{
    //     var data = JSON.stringify({
    //         "user_name": body.username,
    //         "password": body.password,
    //         "description": "bla bla...."
    //     });

    //     var config = {
    //         method: 'post',
    //         url: `${IdentityApi.host}/user`,
    //         headers: { 
    //             'Content-Type': 'application/json'
    //         },
    //         data : data
    //     };

    //     return axios(config)
        
    // }

    static getCurrentUser(): any{
        console.log((localStorage.getItem('token')))
        var config = {
            method: 'get',
            url: `${IdentityApi.host}/user/me`,
            headers: { 
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            },
            
        };

        return axios(config)
    }

//     static deparmentId(token : any): Observable<ResponseDeparment | null>{
//         const api = `${IdentityApi.host}/${SYSTEM_CONSTANTS.API.LISTHOTEL.DEPARTMENT}`;
//         return HttpClient.get(api,{ headers: { Authorization : `Bearer ${token}` } }).pipe(
//             map((res) => res as ResponseDeparment || null)
//         )
//     }

}