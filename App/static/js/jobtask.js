function getJobTaskData(currentPage, pageSize, opr, taskId) {

    var taskTitle =  document.searchForm.taskTitle.value
    var taskURL = document.searchForm.taskURL.value

    if(opr == 'del'){
        if(!confirm('确定要删除吗？')){
            return false
        }
    }else if(opr == 'submitUpdate'){
        taskTitle = document.taskForm.taskTitle.value
        taskURL = document.taskForm.taskURL.value
        taskId = document.taskForm.taskId.value
        currentPage = document.taskForm.currentPage.value
        pageSize = document.taskForm.pageSize.value
        $('#modal-default').modal('hide')
    }

    $.ajax({
        type: 'post',                            // 传数据的方式
        url: '/ajaxjobtaskinfo.do',
        dataType: 'json',                        // xml、json、script、html
        data:JSON.stringify({
            'taskTitle': taskTitle,     //  $('#taskTitle') == document.getElementById('taskTitle')
            'taskURL' : taskURL,
            'taskId': taskId,
            'pageSize': pageSize,
            'currentPage': currentPage,
            'opr': opr
        }),
        error: function(xhr, err){
            alert('请求失败，请检查，' + err + '!')
        },
        success: function(data, textStatus){    // success对应的回调函数的第一个参数，是服务器返回的数据
            // 查询后、删除后、修改后都走这个if
            if(data.code == 1 && opr != 'update'){
                var htmlText = ""
                for(var i =0;i <data.jobTaskData.length;i++){
                    htmlText += '<tr>' +
                        '            <td align="center"><input type="checkbox" name="taskId" value="'+  data.jobTaskData[i][0] +'" /></td>\n' +
                        '            <td>' + data.jobTaskData[i][0] + '</td>\n' +
                        '            <td>' + data.jobTaskData[i][1] + '</td>\n' +
                        '            <td style="width: 500px;word-break: break-all;">' + data.jobTaskData[i][2] + '</td>\n' +
                        '            <td style="width: 160px;">\n' +
                        ' <button type="button" class="btn btn-danger" onclick="getJobTaskData('+ data.currentPage +',' + data.pageSize + ','+ '\'del\''+',' + data.jobTaskData[i][0] +')">删除</button>' +
                        ' <button type="button" class="btn btn-info" onclick="getJobTaskData('+ data.currentPage +',' + data.pageSize + ','+ '\'update\''+',' + data.jobTaskData[i][0] +')">修改</button>'+
                        '            </td>\n' +
                        '        </tr>\n'
                }
                pageText = '<tr style="text-align: right;"><td colspan="5">'+ '当前第' + data.currentPage + '页&nbsp;&nbsp;总共有' + data.totalPage + '页&nbsp;&nbsp;';
                if(data.currentPage <= 1) {
                    pageText += '首页 &nbsp;&nbsp;上一页&nbsp;&nbsp;';
                }else{
                     pageText += '<a href="javascript:getJobTaskData(1,10,\'search\', 0);">首页</a> &nbsp;&nbsp;' +
                        '<a href="javascript:getJobTaskData(' + (data.currentPage - 1) + ', 10, \'search\', 0);">上一页</a>&nbsp;&nbsp;';
                }

                if(data.currentPage >= data.totalPage){
                     pageText += '下一页&nbsp;&nbsp;尾页&nbsp;&nbsp;';
                }else {
                    pageText += '<a href="javascript:getJobTaskData(' + (data.currentPage + 1) + ', 10, \'search\', 0);">下一页</a>&nbsp;&nbsp;' +
                    '<a href="javascript:getJobTaskData(' + data.totalPage + ', 10, \'search\', 0);">尾页</a>&nbsp;&nbsp;';
                }
                pageText +='总共有'+ data.counts + '条&nbsp;&nbsp;</td></tr>'
                $('#dataBody').empty()
                $('#dataBody').append(htmlText)
                $('#dataBody').append(pageText)

                document.searchForm.currentPage.value = data.currentPage
                document.searchForm.pageSize.value=data.pageSize

                 if( opr != 'search' && data.updateResult > 0 ) {
                     alert("操作成功")
                 }else if(opr != 'search' && data.updateResult <= 0){
                     alert("操作失败")
                 }
            }else if(data.code == 1 && opr == 'update'){
                document.taskForm.taskTitle.value = data.jobTaskData.taskTitle
                document.taskForm.taskURL.value = data.jobTaskData.taskURL
                document.taskForm.taskId.value = data.jobTaskData.taskId
                document.taskForm.currentPage.value = data.currentPage
                document.taskForm.pageSize.value = data.pageSize
                $('#modal-default').modal()
            }
        }
    });
}
$(document).ready(
    function(){
        getJobTaskData(1, 10, 'search', 0)
    }
)