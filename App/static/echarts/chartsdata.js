// 使用jQuery判断当前文档是否加载完成，如果加载完成就会触发ready事件，会执行ready
$(document).ready(function(){

    var chart = echarts.init(document.getElementById('java-chart'));
    var itemStyle = {
        normal:{
            borderColor: 'rgba(0, 0, 0, 0.2)'
        },
        emphasis:{
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 20,
            borderWidth: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
    };

    chart.setOption({
        tooltip: {},
        title : {
            text: '热点城市职位分布图',
            subtext: '数据来源与互联网',
            left: 'center'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data:['Java','Python','大数据']
        },
        visualMap: {
            min: 0,
            max: 1500,
            left: 'left',
            top: 'bottom',
            text:['高','低'],           // 文本，默认为数值文本
            calculable : true
        },
        selectedMode: 'single',
        series : [
            {
                name: 'Java',
                type: 'map',
                map: 'china',
                itemStyle: itemStyle,
                showLegendSymbol: true,
                // zoom: 10,
                // center: [115.97, 29.71],
                roam: true,
                markPoint: {
                    data: [{
                        coord: [115.97, 29.71]
                    }]
                },
                label: {
                    normal: {
                        show: true,
                        rotate: 40,
                        formatter: '{b}：{value|{c}}',
                        // position: 'inside',
                        backgroundColor: '#fff',
                        padding: [3, 5],
                        borderRadius: 3,
                        borderWidth: 1,
                        borderColor: 'rgba(0,0,0,0.5)',
                        color: '#777',
                        rich: {
                            value: {
                                color: '#019D2D',
                                fontSize: 14,
                                // fontWeight: 'bold'
                                // textBorderWidth: 2,
                                // textBorderColor: '#000'
                            }
                        }
                    },
                    emphasis: {
                        show: true
                    }
                },
                data:[
                    {name: '北京',value: Math.round(Math.random()*1000)},
                    {name: '天津',value: Math.round(Math.random()*1000)},
                    {name: '上海',value: Math.round(Math.random()*1000)},
                    {name: '重庆',value: Math.round(Math.random()*1000)},
                    {name: '河北',value: Math.round(Math.random()*1000)},
                    {name: '河南',value: Math.round(Math.random()*1000)},
                    {name: '云南',value: Math.round(Math.random()*1000)},
                    {name: '辽宁',value: Math.round(Math.random()*1000)},
                    {name: '黑龙江',value: Math.round(Math.random()*1000)},
                    {name: '湖南',value: Math.round(Math.random()*1000)},
                    {name: '安徽',value: Math.round(Math.random()*1000)},
                    {name: '山东',value: Math.round(Math.random()*1000)},
                    {name: '新疆',value: Math.round(Math.random()*1000)},
                    {name: '江苏',value: Math.round(Math.random()*1000)},
                    {name: '浙江',value: Math.round(Math.random()*1000)},
                    {name: '江西',value: Math.round(Math.random()*1000)},
                    {name: '湖北',value: Math.round(Math.random()*1000)},
                    {name: '广西',value: Math.round(Math.random()*1000)},
                    {name: '甘肃',value: Math.round(Math.random()*1000)},
                    {name: '山西',value: Math.round(Math.random()*1000)},
                    // {name: '内蒙古',value: Math.round(Math.random()*1000)},
                    {name: '陕西',value: Math.round(Math.random()*1000)},
                    {name: '吉林',value: Math.round(Math.random()*1000)},
                    {name: '福建',value: Math.round(Math.random()*1000)},
                    {name: '贵州',value: Math.round(Math.random()*1000)},
                    {name: '广东',value: Math.round(Math.random()*1000)},
                    // {name: '青海',value: Math.round(Math.random()*1000)},
                    {name: '西藏',value: Math.round(Math.random()*1000)},
                    {name: '四川',value: Math.round(Math.random()*1000)},
                    {name: '宁夏',value: Math.round(Math.random()*1000)},
                    {name: '海南',value: Math.round(Math.random()*1000)},
                    {name: '台湾',value: Math.round(Math.random()*1000)},
                    {name: '香港',value: Math.round(Math.random()*1000)},
                    {name: '澳门',value: Math.round(Math.random()*1000)}
                ]
            },
            {
                name: 'Python',
                type: 'map',
                mapType: 'china',
                itemStyle: itemStyle,
                showLegendSymbol: true,
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                },
                data:[
                    {name: '北京',value: Math.round(Math.random()*1000)},
                    {name: '天津',value: Math.round(Math.random()*1000)},
                    {name: '上海',value: Math.round(Math.random()*1000)},
                    {name: '重庆',value: Math.round(Math.random()*1000)},
                    {name: '河北',value: Math.round(Math.random()*1000)},
                    {name: '安徽',value: Math.round(Math.random()*1000)},
                    {name: '新疆',value: Math.round(Math.random()*1000)},
                    {name: '浙江',value: Math.round(Math.random()*1000)},
                    {name: '江西',value: Math.round(Math.random()*1000)},
                    {name: '山西',value: Math.round(Math.random()*1000)},
                    {name: '内蒙古',value: Math.round(Math.random()*1000)},
                    {name: '吉林',value: Math.round(Math.random()*1000)},
                    {name: '福建',value: Math.round(Math.random()*1000)},
                    {name: '广东',value: Math.round(Math.random()*1000)},
                    {name: '西藏',value: Math.round(Math.random()*1000)},
                    {name: '四川',value: Math.round(Math.random()*1000)},
                    {name: '宁夏',value: Math.round(Math.random()*1000)},
                    {name: '香港',value: Math.round(Math.random()*1000)},
                    {name: '澳门',value: Math.round(Math.random()*1000)}
                ]
            },
            {
                name: '大数据',
                type: 'map',
                mapType: 'china',
                itemStyle: itemStyle,
                showLegendSymbol: true,
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                },
                data:[
                    {name: '北京',value: Math.round(Math.random()*1000)},
                    {name: '天津',value: Math.round(Math.random()*1000)},
                    {name: '上海',value: Math.round(Math.random()*1000)},
                    {name: '广东',value: Math.round(Math.random()*1000)},
                    {name: '台湾',value: Math.round(Math.random()*1000)},
                    {name: '香港',value: Math.round(Math.random()*1000)},
                    {name: '澳门',value: Math.round(Math.random()*1000)}
                ]
            }
        ]
    });

    // 饼图
	var myCharts = echarts.init(document.getElementById("jobPie"));

	  // 指定图表的配置项和数据
    var option = {
        title : {
	        text: 'IT技术就业岗位数量分析',
	        subtext: '数据来源于网络',
	        x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        color:['red', 'green','yellow','blue', 'pink'],
        series : [
            {
                name: '开发领域',
                type: 'pie',
                radius: '55%',
                data:[
                    {value:10000, name:'Python'},
                    {value:30000, name:'Java'},
                    {value:20000, name:'前端'},
                    {value:18000, name:'大数据'},
                    {value:19000, name:'人工智能'}
                ],
                roseType: 'angle',
                label: {
                    normal: {
                        textStyle: {
                            color: 'rgba(0, 0, 0, 0.7)'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        lineStyle: {
                            color: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        shadowBlur: 200,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    }
    // 使用刚指定的配置项和数据显示图表
    myCharts.setOption(option);

    var p = []
    var s = []
    // 柱状图
    barChart = echarts.init(document.getElementById("salary-box"))
    $.ajax({
      type: 'post',                            // 传数据的方式
      url: '/ajaxjobsalary.do',
      dataType: 'json',                        // xml、json、script、html
      data: JSON.stringify({
          'salary': '1111',     //  $('#taskTitle') == document.getElementById('taskTitle')
          'opr': '1111'
      }),
      error: function (xhr, err) {
          alert('请求失败，请检查，' + err + '!')
      },
      success: function(data, textStatus) {
            for(var i=0; i < data.salary.length;i++){
                x = data.salary[i][2]
                p[i] = data.salary[i][2]
                s[i] = Number.parseInt(data.salary[i][0])
            }
            option = {
                color: ['#3398DB'],
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        data : p,
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'薪资(元)',
                        type:'bar',
                        barWidth: '60%',
                        data:s
                    }
                ]
            };
        barChart.setOption(option);
      },
    });

});