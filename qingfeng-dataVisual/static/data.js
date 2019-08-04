var all_data = new Map()
// var genDataCount=100
function getDataFile() {
    var file = document.querySelector('#data_file').files[0]
    var d_year = []
    var category = []
    var data = []
    var mesg
    // console.log(file)
    var reader = new FileReader()
    reader.readAsText(file, 'utf-8')
    reader.onload = function (e) {
        // console.log(this)
        document.querySelector('.upload').style.display = 'none'
        lines = this.result.split('\n')
        // console.log(lines)
        for (let i in lines) {
            if (lines[i] == '') {
                break
            }
            if (i == 0) {
                d_year = lines[i].split(',')
                mesg=d_year[0]
                temp_year = []
                temp_year.push('')
                for (let yi = 1; yi < d_year.length-1; yi++) {
                    geni = 0
                    start = d_year[yi+1]
                    while (true) {
                        geni++
                        temp_year.push(start)
                        if (geni > genDataCount) {
                            break
                        }
                    }

                }
                // console.log(temp_year)

            } else {
                l = lines[i].split(',')
                temp = []
                temp.push(l[0])
                for (let li = 1; li < l.length-1; li++) {
                    start = l[li]
                    end = l[li + 1]
                    geni = 0
                    let space = eval(end - start) / genDataCount
                    while (true) {
                        var v=(parseInt(start) + space * geni).toFixed(2)
                        temp.push(v<0?0:v)
                        geni++
                        if (geni > genDataCount) {
                            break
                        }
                    }
                }
                category.push(l[0])
                data.push(temp)
            }
        }


        all_data.set('category', category)
        all_data.set('d_yaer', temp_year)
        all_data.set('data', data)
        all_data.set('mesg', mesg)
        // console.log(all_data)
        dealData()
    }

}

function dealData() {
    var xy_map = new Map()
    var category = all_data.get('category')
    var d_yaer = all_data.get('d_yaer')
    var data = all_data.get('data')
    // console.log(data)
    for (let i = 1; i < d_yaer.length; i++) {
        var y_label = new Set()
        var x_data = []
        var origi_data = []
        var data = all_data.get('data')
        for (let datai in data) {
            x_data.push(data[datai][i])
            origi_data.push(data[datai][i])
        }

        // console.log(x_data)


        x_data.sort(function (a, b) {
            return a - b
        })
        for (let xi in x_data) {
            var indexList=getIndex(origi_data,x_data[xi])
            // console.log(indexList)
            for(let i in indexList){
                y_label.add(category[indexList[i]])
            }
            // y_label.push(category[origi_data.indexOf(x_data[xi])])
        }
        y_label=Array.from(y_label)
        // console.log(y_label)
        if (xy_map.has(d_yaer[i])) {
            xy_map.get(d_yaer[i]).push({
                'x_data': x_data,
                'y_label': y_label
            })
        } else {
            xy_map.set(d_yaer[i], [{
                'x_data': x_data,
                'y_label': y_label
            }])
        }
    }
    // console.log(xy_map)

    // 对数据进行排序
    var arrayObj = Array.from(xy_map);
    // console.log(arrayObj)
    arrayObj.sort(function (a, b) {
        return a[0].localeCompare(b[0])
    })
    console.log(arrayObj)
    xy_map.clear()
    xy_map = new Map(arrayObj.map(i => [i[0], i[1]]))

    console.log(xy_map)
    //生成最终的数据
    final_data = new Map()
    final_data.set('category', category)
    final_data.set('data', xy_map)
    final_data.set('mesg',all_data.get('mesg'))

    // console.log(final_data)
    draw(final_data)
}


function getIndex(arr,ele){
    var indexList=[]
    for(let i=0;i<arr.length;i++){
        if(arr[i]==ele){
            indexList.push(i)
        }
    }
    return indexList
}