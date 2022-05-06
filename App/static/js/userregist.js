function  ajaxUploadFile(){
    //创建FormData对象，初始化为form表单中的数据。需要添加其他数据可使用formData.append("property", "value");
    var formData = new FormData($('#regForm')[0]);  // $('#regForm')[0] == document.getElementById('regForm')== document.forms[0] == document.regForm

    //ajax异步上传
    $.ajax({
        url: "/upload.do",
        type: "POST",
        data: formData,  // 1、json对象{}  2、json String 3、formData对象
        xhr: function () { //获取ajaxSettings中的xhr对象，为它的upload属性绑定progress事件的处理函数

            myXhr = $.ajaxSettings.xhr();
            if (myXhr.upload) { //检查upload属性是否存在
                //绑定progress事件的回调函数   给<input type="file" name='upload' />
                myXhr.upload.addEventListener('progress', progressHandlingFunction, false);
            }
            return myXhr; //xhr对象返回给jQuery使用
        },
        success: function (result) {
            result = JSON.parse(result);
            $("#userImg").attr("src", result.url); // 前端显示上传完成的图片
            document.regForm.picPath.value = result.url;
            // $("#result").html(result);
        },
        contentType: false, //必须false才会自动加上正确的Content-Type
        processData: false  //必须false才会避开jQuery对 formdata 的默认处理
    });
}

//上传进度回调函数：
function progressHandlingFunction(e) {
    if (e.lengthComputable) {
        $('#progress').attr({ value: e.loaded, max: e.total }); //更新数据到进度条
        var percent = e.loaded / e.total * 100;
        $('#progress').html(e.loaded + "/" + e.total + " bytes. " + percent.toFixed(2) + "%");
        $('#progress').css('width', percent.toFixed(2) + "%");
    }
}

function submitRegist() {
    // 提交之前先对表单进行验证
    var bootstrapValidator = $("#regForm").data("bootstrapValidator");
    bootstrapValidator.validate();
    if(bootstrapValidator.isValid()) {
        var a = document.regForm.userName.value
        $.ajax({
            type: 'post',                            // 传数据的方式
            url: '/regist.do',
            dataType: 'json',                        // xml、json、script、html
            data: JSON.stringify({
                'userName': document.regForm.userName.value,     //  $('#userName') == document.getElementById('userName')
                'userPwd': document.regForm.userPwd.value,
                'userPic': document.regForm.picPath.value,
                'userBirth': document.regForm.userBirth.value,
                'userSex': document.regForm.userSex.value,
                'userIntro': userEditor.getData()  // 重用一个ajax请求实现增加删除修改查询 CRUD
            }),
            error: function (xhr, err) {
                alert('请求失败，请检查，' + err + '!')
            },
            success: function (data, textStatus) {    // success对应的回调函数的第一个参数，是服务器返回的数据
                if (data.result > 0) {
                    alert("注册成功,请登录")
                    $('#modal-info').modal('hide')
                } else {
                    alert("注册失败")
                }
            }
        });
    }
}

$(document).ready(function() {
    $('#regForm').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            userName: {
                message: '用户名验证失败',
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 18,
                        message: '用户名长度必须在6到18位之间'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z]\w{5,17}$/,
                        message: '用户名必须是字母开头，必须由数字、字母组成'
                    }
                }
            },
            userPwd: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 18,
                        message: '密码长度必须在6到18位之间'
                    },
                    identical: {
                        field: 'reUserPwd',
                        message: '两次密码必须一致'
                    },
                    different: {
                        field: 'userName',
                        message: '密码不能与用户名相同'
                    },
                    regexp: {
                        regexp: /^\w+$/,
                        message: '密码必须由字符组成'
                    }
                }
            },
            reUserPwd: {
                validators: {
                    notEmpty: {
                        message: '确认密码不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 18,
                        message: '密码长度必须在6到18位之间'
                    },
                    identical: {
                        field: 'userPwd',
                        message: '两次密码必须一致'
                    },
                    different: {
                        field: 'userName',
                        message: '密码不能与用户名相同'
                    },
                    regexp: {
                        regexp: /^\w+$/,
                        message: '密码必须由字符组成'
                    }
                }
            },
        }
    });
});