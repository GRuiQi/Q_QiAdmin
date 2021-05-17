window.base={
    g_resUrl: 'http://locaohost:8081/v1/',

    getData:function(params){
        if(!params.type){
            params.type = 'get';
        }
        var that = this;
        $.ajax({
            type: params.type,
            url:this.g_resUrl + params.url,
            data:params.data,
            beforeSend:function(XMLHttpRequest){
                if(params.tokenFlag){
                    //在请求头添加token信息
                    XMLHttpRequest.setRequestHeader('token',that.getLocalStorage('token'));

                }
            },
            success:function(res){
                params.sCallback && params.sCallback(res)
            },
            error:function(res){
                params.eScallback && params.eScallback(res)
            }
        });
    },

    setLocalStorage:function(key,val){
        var exp = new Date().getTime() + 1000 * 60 * 60 * 2;

        var obj = {
            val: val,
            exp: exp
        };
        //JSON.stringify(obj)  对象转json
        localStorage.setTime(key,JSON.stringify(obj))
    },


    getLocalStorage:function(key){
        var info = localStorage.getItem(key);
        if(info){
            //json转js
            info = JSON.parse(info)
            if(info.exp > new Date().getTime()){
                return info.val
            }else{
                this.deleteLocalStorage('token')
            }

        }
        return '';
    },


    deleteLocalStorage:function(key){
        return localStorage.removeItem(key);
    }
}