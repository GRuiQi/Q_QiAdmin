$(function(){
    $(document).on('click','#login',function(){
        let username = $('#username')
        let password = $('#password')
        if(!username.val()){
            layer.open({
                title: '提示'
                ,content: '请输入用户名'
                ,time: 5000
              });     
                
            return;
        }
        if(!password.val()){
            layer.open({
                title: '提示'
                ,content: '请输入密码'
                ,time: 5000
              });     
            return;
        }

        var params = {
            url: '/app/token',
            typ: 'post',
            data:{
                ac:username.val(),
                se:password.val()
            },
            sCallback: function(res){
                if(res){
                    window.base.setLocalStorage('token',restoken);
                    window.location.href = 'index.html'
                }
            },
            eCallback:function(e){
                layer.open({
                    title: '提示'
                    ,content: '账号或密码错误'
                    ,time: 5000
                  });     
            }
        }

        window.base.getData(params);
    });

   

    //触发事件
    $(document).on('keydown','input',function(e){
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if(e && e.keyCode==13){
            //激活id为login的click点击事件
            $('#login').trigger('click');
        }
    });
  
})