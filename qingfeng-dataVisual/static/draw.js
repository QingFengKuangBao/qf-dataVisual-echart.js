// 初始化各个柱状图的颜色
// var colorMap = new Map()
// var timeOut=80
// var barCount=15

function initColorMap(category) {
    var colorSet = new Set()
    while (true) {
        var c = 'rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')'
        // console.log(c)
        colorSet.add(c)
        if (colorSet.size >= category.length) {
            break
        }
    }
    var i = 0;
    var values = colorSet.values()
    while (true) {
        // console.log(c)
        colorMap.set(category[i], values.next().value)
        i++
        if (i >= category.length) {
            break
        }
    }
    // console.log(colorMap)
}

// 基于准备好的dom，初始化echarts实例
var myChart

var option = {
    title: {
        text: '',
        left: 'center',
        // top:'middle',
        textStyle: {
            color: "black",
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: 30,
            lineHeight: 40,
            // width:200,
            // textAlign:'right',
            left: 'center',
        },
    },
    tooltip: {
        show: true,
        trigger: 'axis',
        textAlign: 'center',
    },

    xAxis: {
        position: 'top',
        type: 'value',
        // name: '人口增长率\n       %',
        // axisLabel: {
        //     formatter: '{value}'
        // },
        axisTick: {
            show: false,
        },
        axisLine: {
            show: false,
        },
        axisLabel: {
            show: false,
        },
        nameTextStyle: {
            color: "black",
            fontStyle: 'normal',
            fontWeight: 'bold',
            // fontSize: 18,
            // lineHeight: 40,
            // width:200,
            // textAlign:'right',
            // left: 'center',
        }
    },
    yAxis: {
        type: 'category',
        axisTick: {
            show: false,
        },
        axisLine: {
            show: false,
        },

        data: [],
        axisLabel: {
            width: 150,
            show: true,
            //fontSize: 15,
            // fontWeight: 'bold',
            // rotate: -10,

            color: function (params) {
                // console.log(params)
                return colorMap.get(params)
            },
            margin: 8,
            ailgn: 'center',
            backgroundColor: 'auto',
            padding: 5,

            // borderColor :'gray',
            // borderWidth :2,
            // borderRadius :8,

            textBorderColor: 'black',
            textBorderWidth: 2,
            // textShadowColor: 'gray',
            // textShadowBlur: 5,
            // textShadowOffsetX: 3,
            // textShadowOffsetY: 5,

        },

        // nameTextStyle: {
        //     // color: function (params) {
        //     //     return colorMap.get(params.name)
        //     // },
        //     backgroundColor :'red',

        // },
    },
    series: [{
            // barWidth: 50,
            data: [],
            type: 'bar',
            itemStyle: {
                color: function (params) {
                    return colorMap.get(params.name)
                },
                borderWidth: 2,
                borderColor: 'black',
                barBorderRadius: 10,
                //shadowColor: 'rgba(0, 0, 0, 0.5)',
                //shadowBlur: 10,
                //shadowOffsetX: 7,
                //shadowOffsetY: 7,
                opacity: 0.8,
            },
            emphasis: {

            },
            label: {
                // rotate :-10,
                offset: [10, 0],
                show: true,
                position: 'right',
                //fontSize: 15,
                // color: function (params) {
                //     return colorMap.get(params.name)
                // },
                color: 'black',

                borderColor: 'auto',
                borderWidth: '2px',
                padding: 3,
                borderRadius: 5,
                //shadowColor: 'auto',
                shadowBlur: 50,
                // fontWeight:'bold',
                // formatter: '{c',
                // lineHeight:25,
                // backgroundColor:'gray',
                textBorderColor: 'black',
                textBorderWidth: 2,

            },
            barCategoryGap: '50%',
        },

    ],
}


function initChart(chart_data, title) {
    option.title.text = title
    option.yAxis.data = chart_data.get('y_label')
    // console.log(chart_data['y_label'])
    // console.log(chart_data['x_data'])
    option.series[0]['data'] = chart_data.get('x_data')
    myChart.setOption(option);
}



function draw(all_data) {
    myChart = echarts.init(document.getElementById('mychart'));
    var mesg = all_data.get('mesg')
    var i = 0
    var category = all_data.get('category')
    var year_data = all_data.get('data')
    if (barCount > category.length) {
        barCount = category.length
    }
    // console.log(year_data)
    var arr = Array.from(year_data)
    // console.log(arr)
    initColorMap(category)
    var i = 0
    var ei = 0
    // console.log(arr[0][1])
    data_len = arr[0][1][0]['x_data'].length
    var c = window.setInterval(function () {
        data = arr[i]
        if (typeof data == 'undefined') {
            console.log(i + '    end...')
            window.clearInterval(c)
            return
        }

        chart_data = new Map()
        var title = data[0] + mesg
        e_data = data[1]
        

        x_data = []
        y_label = []
        for (var datai = data_len - barCount; datai < data_len; datai = datai + 1) {
            x_data.push(e_data[ei]['x_data'][datai])
            y_label.push(e_data[ei]['y_label'][datai])
        }
        chart_data.set('x_data', x_data)
        chart_data.set('y_label', y_label)

        initChart(chart_data, title)
        ei++
        if (ei >= data[1].length) {
            ei = 0
            i++
        }


    }, timeOut)

}
