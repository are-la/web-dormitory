function  checkLoginForm(){
    userName = $("input[name='userName']").val()
    userPwd = $("input[name='userPwd']").val()

    if(userName == "" || userPwd == ""){
        alert("用户名和密码不能为空")
        return false
    }
    return true
}

function  checkRegistForm(){
    userName = $("input[name='userName']").val()
    userPwd = $("input[name='userPwd']").val()
    reUserPwd = $("input[name='reUserPwd']").val()

    pattern = /^[a-zA-Z_]\w{5,17}$/
    if(!pattern.test(userName)){
        $('#userName').html('用户必须是6到18位，必须使用字符或下划线开头')
        return false
    }
    if(userPwd == "" || userPwd != reUserPwd){
         $('#reUserPwd').html('用户必须是6到18位，必须使用字符或下划线开头')
        return false
    }

    if(document.regForm.result.value == 'true'){
        return false
    }

    return true
}

function submitRemoveUser(userId){
    if(confirm("确认要删除吗？")){
        window.location.href = "/removeruser.do?userId=" + userId
    }
}

function submitModifyUser(){
    if(confirm("确认修改吗？")){
        // document.forms[0].userName.value
        // userName = document.userForm.userName.value
        // document.forms[0].submit()
        document.userForm.action = "/gomodifysubmit.do"
        document.userForm.method = "post"
        document.userForm.submit() // 使用js代码来提交表单：1、获得form对象 2、调用form对象的submit()
    }
}

function checkUserName() {
    // XMLHttpRequest类似urllib
    $.ajax({
        type: 'post',                            // 传数据的方式
        url: '/checkusername.do',
        dataType: 'json',                        // xml、json、script、html
        data:JSON.stringify({
            'userName': $("input[name='userName']").val(),     //  $('#userName') == document.getElementById('userName')
        }),
        error: function(xhr, err){
            alert('请求失败，请检查，' + err + '!')
        },
        success: function(data, textStatus){    // success对应的回调函数的第一个参数，是服务器返回的数据
            if(data.code == 1){
                $('#userName').html('用户名已经存在，用户名不可用!')
                document.regForm.result.value = 'true'
            }else{
                $('#userName').html('用户名可以放心使用!')
                document.regForm.result.value = 'false'
            }
        }
    });
}