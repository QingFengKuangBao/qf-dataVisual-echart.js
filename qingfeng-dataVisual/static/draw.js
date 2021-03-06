// 初始化各个柱状图的颜色
// let colorMap = new Map()
// let timeOut=80
// let barCount=15

function initColorMap(category) {
    let colorSet = new Set()
    while (true) {
        let c = 'rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')'
        // console.log(c)
        colorSet.add(c)
        if (colorSet.size >= category.length) {
            break
        }
    }
    let i = 0;
    let values = colorSet.values()
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



function initfontSize(){
    // if(barCount<=10){
    //     fontsize=32
    // }else if(barCount<=20){
    //     fontsize=26
    // }else{
    //     fontsize=20
    // }
    if(fontsize!=0){
        return
    }
    fontsize=Math.floor(window.innerHeight/barCount*0.5)
    console.log(fontsize)
}

let option
function drawInit(category){
    initfontSize()
    initColorMap(category)
    option = {
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
                fontSize: fontsize,
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
                // width: 30,
                show: true,
                fontSize: fontsize,
                // fontWeight: 'bold',
                // rotate: -10,
    
                color: function (params) {
                    // console.log(params)
                    return colorMap.get(params)
                },
                margin: 5,
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
                //barWidth: 50,
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
                    offset: [5, 0],
                    show: true,
                    position: 'right',
                    fontSize: fontsize,
                    // color: function (params) {
                    //     return colorMap.get(params.name)
                    // },
                    color: 'black',
    
                    // borderColor: 'auto',
                    // borderWidth: '2px',
                    //padding: 3,
                    //borderRadius: 5,
                    //shadowColor: 'auto',
                    //shadowBlur: 50,
                    // fontWeight:'bold',
                    // formatter: '{c',
                    // lineHeight:25,
                    // backgroundColor:'gray',
                    textBorderColor: 'black',
                    textBorderWidth: '2px',
    
                },
                barCategoryGap: '50%',
            },
    
        ],
    }
}




// 基于准备好的dom，初始化echarts实例
let myChart



function initChart(chart_data, title) {
    option.title.text = title
    option.yAxis.data = chart_data.get('y_label')
    // console.log(chart_data['y_label'])
    // console.log(chart_data['x_data'])
    option.series[0]['data'] = chart_data.get('x_data')
    myChart.setOption(option);
}


let data_tiem=document.querySelector("#data_time")
function draw(all_data) {
    myChart = echarts.init(document.getElementById('mychart'));
    let mesg = all_data.get('mesg')
    let i = 0
    let category = all_data.get('category')
    let year_data = all_data.get('data')
    if (barCount > category.length) {
        barCount = category.length
    }
    // console.log(year_data)
    let arr = Array.from(year_data)
    // console.log(arr)
    drawInit(category)
    // let i = 0
    let ei = 0
    // console.log(arr[0][1])
    data_len = arr[0][1][0]['x_data'].length
    let c = window.setInterval(function () {
        data = arr[i]
        if (typeof data == 'undefined') {
            console.log(i + '    end...')
            window.clearInterval(c)
            return
        }

        chart_data = new Map()
        // let title = data[0] + mesg
        data_tiem.innerHTML=data[0]
        let title=mesg
        e_data = data[1]
        

        x_data = []
        y_label = []
        for (let datai = data_len - barCount; datai < data_len; datai = datai + 1) {
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
