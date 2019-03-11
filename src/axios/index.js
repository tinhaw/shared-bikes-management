import JSONP from 'jsonp';
import axios from 'axios';
import { Modal } from 'antd';

export default class Axios  {
    static jsonp(opts){
        return new Promise((resolve,reject)=>{
            JSONP(opts.url,{
                param:"callback"
            },function(err,response){
                //to do
                resolve(response);
            })
        })
    }

    static ajax(opts){
        let loading;
        if (opts.data && opts.data.isShowLoading !== false){
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }
        return new Promise((resolve,reject)=>{
            axios({
                method: 'get',
                url:opts.url,
                baseURL:'https://www.easy-mock.com/mock/5c6b092be1b4221fdd76d3a2/table',
                timeout: 5000,
                params: (opts.data && opts.data.params) || ''
            }).then((response)=>{
                if (opts.data && opts.data.isShowLoading !== false) {
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }
                if(response.status==200){
                    let res=response.data;
                    if(res.code==0){
                        resolve(res);
                    }else{
                        Modal.info({
                            title:"提示",
                            content:res.msg
                        })
                    }
                }else{
                    reject(response.data);
                }
               
            })
        })
    }
}