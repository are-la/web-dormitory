function getUserData(currentPage, pageSize, opr, userId) {

    var userName =  document.searchForm.userName.value
    var userSex = document.searchForm.userSex.value
    var userDeptId = 0

    if(opr == 'del'){
        if(!confirm('确定要删除吗？')){
            return false
        }
    }else if(opr == 'submitUpdate'){
        userName = document.userForm.userName.value
        userSex = document.userForm.userSex.value
        userId = document.userForm.userId.value
        userDeptId = document.userForm.userDeptId.value
        currentPage = document.userForm.currentPage.value
        pageSize = document.userForm.pageSize.value
    }

    $.ajax({
        type: 'post',                            // 传数据的方式
        url: '/ajaxuserinfo.do',
        dataType: 'json',                        // xml、json、script、html
        data:JSON.stringify({
            'userName': userName,     //  $('#userName') == document.getElementById('userName')
            'userSex' : userSex,
            'userId': userId,
            'userDeptId': userDeptId,
            'pageSize': pageSize,
            'currentPage': currentPage,
            'opr': opr  // 重用一个ajax请求实现增加删除修改查询 CRUD
        }),
        error: function(xhr, err){
            alert('请求失败，请检查，' + err + '!')
        },
        success: function(data, textStatus){    // success对应的回调函数的第一个参数，是服务器返回的数据
            // data = JSON.parse(data)
            if(data.code == 1 && opr != 'update'){
                var htmlText = ""
                for(var i =0;i <data.userData.length;i++){
                    htmlText += '<tr>' +
                        '            <td align="center"><input type="checkbox" name="userId" value="'+  data.userData[i][0] +'" /></td>\n' +
                        '            <td>' + data.userData[i][0] + '</td>\n' +
                        '            <td>' + data.userData[i][1] + '</td>\n' +
                        '            <td>' + (data.userData[i][4] == 1 ? '男':'女') + '</td>\n' +
                           '         <td>' + data.userData[i][14] + '</td>\n' +
                        '            <td style="width: 160px;">\n' +
                        ' <button type="button" class="btn btn-danger" onclick="getUserData('+ data.currentPage +',' + data.pageSize + ','+ '\'del\''+',' + data.userData[i][0] +')">删除</button>' +
                        ' <button type="button" class="btn btn-info" onclick="getUserData('+ data.currentPage +',' + data.pageSize + ','+ '\'update\''+',' + data.userData[i][0] +')">修改</button>'+
                        '            </td>\n' +
                        '        </tr>\n'
                }
                pageText = '<tr style="text-align: right;"><td colspan="6">'+ '当前第' + data.currentPage + '页&nbsp;&nbsp;总共有' + data.totalPage + '页&nbsp;&nbsp;';
                if(data.currentPage <= 1) {
                    pageText += '首页 &nbsp;&nbsp;上一页&nbsp;&nbsp;';
                }else{
                     pageText += '<a href="javascript:getUserData(1,10,\'search\', 0);">首页</a> &nbsp;&nbsp;' +
                        '<a href="javascript:getUserData(' + (data.currentPage - 1) + ', 10, \'search\', 0);">上一页</a>&nbsp;&nbsp;';
                }

                if(data.currentPage >= data.totalPage){
                     pageText += '下一页&nbsp;&nbsp;尾页&nbsp;&nbsp;';
                }else {
                    pageText += '<a href="javascript:getUserData(' + (data.currentPage + 1) + ', 10, \'search\', 0);">下一页</a>&nbsp;&nbsp;' +
                    '<a href="javascript:getUserData(' + data.totalPage + ', 10, \'search\', 0);">尾页</a>&nbsp;&nbsp;';
                }
                pageText +='总共有'+ data.counts + '条&nbsp;&nbsp;</td></tr>'
                $('#dataBody').empty()
                $('#dataBody').append(htmlText)
                $('#dataBody').append(pageText)

                document.searchForm.currentPage.value = data.currentPage
                document.searchForm.pageSize.value=data.pageSize

                 if( opr != 'search' && data.updateResult > 0 ) {
                     alert("操作成功")
                     $('#modal-default').modal('hide')

                 }else if(opr != 'search' && data.updateResult <= 0){
                     alert("操作失败")
                 }

            }else if(data.code == 1 && opr == 'update'){
                document.userForm.userName.value = data.userData.userName
                if(data.userData.userSex == 1){
                    document.getElementById('male').checked = 'checked'
                }else if(data.userData.userSex == 2){
                    document.getElementById('female').checked = 'checked'
                }
                document.userForm.userId.value = data.userData.userId
                $('#userDept').html(data.userData.userDeptName)
                document.userForm.userDeptId.value =  data.userData.userDeptId
                document.userForm.currentPage.value = data.currentPage
                document.userForm.pageSize.value = data.pageSize
                $('#modal-default').modal()
                getDeptList(0, null, 1)
            }
        }
    });
}
function getDeptList(parentId, obj, grade){
    if(parentId == -1){
        parentId = obj.value
        document.userForm.userDeptId.value = obj.value
    }else if(parentId == -99 || grade == 4){
        return false
    }
     $.ajax({
         type: 'get',                            // 传数据的方式
         url: '/getdeptlist.do',
         data:{
             'parentId': parentId,     //  $('#userName') == document.getElementById('userName')
         },
         error: function (xhr, err) {
             alert('请求失败，请检查，' + err + '!')
         },
         success: function (data, textStatus) {    // success对应的回调函数的第一个参数，是服务器返回的数据
             data = JSON.parse(data)
            if(parentId == 0){
                 if(data.code == 1){
                     htmlText = '<option value="-99">选择部门</option>'
                     for(var i=0;i<data.data.length;i++){
                         htmlText += '<option value="' + data.data[i][0] +'">' + data.data[i][1] + '</option>'
                     }
                     $('#parentDept').html(htmlText)
                 }
            }else{
                if(data.code == 1 && grade == 2){
                     if(document.getElementById('gradeTwoDept')){
                        $('#gradeTwoDept').remove()
                     }
                     if(document.getElementById('gradeTreeDept')){
                         $('#gradeTreeDept').remove()
                     }
                     htmlText = '<select id="gradeTwoDept" onchange="getDeptList(-1, this,3)" >'
                     htmlText += '<option value="-99">选择子部门</option>'
                     for(var i=0;i<data.data.length;i++){
                         htmlText += '<option value="' + data.data[i][0] +'">' + data.data[i][1] + '</option>'
                     }
                     htmlText += "</select>"
                     $('#deptContainer').append(htmlText)
                 }else if(data.code == 1 && grade == 3){
                       if(document.getElementById('gradeTreeDept')){
                         $('#gradeTreeDept').remove()
                     }
                     htmlText = '<select id="gradeTreeDept" onchange="getDeptList(-1, this, 4)" >'
                     htmlText += '<option value="-99">选择子部门</option>'
                     for(var i=0;i<data.data.length;i++){
                         htmlText += '<option value="' + data.data[i][0] +'">' + data.data[i][1] + '</option>'
                     }
                     htmlText += "</select>"
                     $('#deptContainer').append(htmlText)
                }
            }
         }
     })
}
$(document).ready(
    function(){
        getUserData(1, 10, 'search', 0)
    }
)