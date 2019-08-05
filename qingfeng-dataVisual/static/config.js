//两组数据之间 自动生成填充多沙组数据
var genDataCount=80

//设置绘制间隔 尽量不要修改
var timeOut=70

//生成多少各柱状  例如：需要排名前10的数据  则设置为10
var barCount=10

//保留数据的精度，保留小数点后几位数字，
//根据你的数据设置合适的精度
var decimal=0

//柱状图的颜色映射  colorMap.set('中国'，'color')
var colorMap = new Map()