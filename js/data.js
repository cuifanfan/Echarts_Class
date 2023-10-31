/**
 * @description 获取QT数据模块
 * @author cuifan 2023/09/06
 * */

let data = {
    partPassrate: {
        totalNum: 3,
        pass: 0,
        noPass: 3,
        measureResult: [
            {bodyNum: 202201011123, pass: 54, noPass: 46},
            {
                bodyNum: 202201011123,
                pass: 34,
                noPass: 66
            },
            {bodyNum: 202201011123, pass: 78, noPass: 22},
            {
                bodyNum: 202201011123,
                pass: 85,
                noPass: 15
            },
            {bodyNum: 202201011123, pass: 27, noPass: 73},
            {bodyNum: 202201011123, pass: 57, noPass: 43},
            {bodyNum: 202201011123, pass: 57, noPass: 43},
            {bodyNum: 202201011123, pass: 57, noPass: 43},
            {bodyNum: 202201011123, pass: 57, noPass: 43},
            {bodyNum: 202201011123, pass: 57, noPass: 43},
            {bodyNum: 202201011123, pass: 57, noPass: 43},
            {bodyNum: 202201011123, pass: 57, noPass: 43},
            {bodyNum: 202201011123, pass: 57, noPass: 43},
            {bodyNum: 202201011123, pass: 57, noPass: 43},
            {bodyNum: 202201011123, pass: 57, noPass: 43},
            {bodyNum: 202201011123, pass: 57, noPass: 43},
            {bodyNum: 202201011123, pass: 57, noPass: 43},
            {bodyNum: 202201011123, pass: 57, noPass: 43},
            {bodyNum: 202201011123, pass: 57, noPass: 43},
        ]
    },
    weldPassrate: {
        totalNum: 45,
        pass: 29,
        noPass: 16,
        weldResult: [
            {weldName: 'W1', pass: 35, noPass: 55},
            {
                weldName: 'W2',
                pass: 12,
                noPass: 65
            },
            {weldName: 'W3', pass: 43, noPass: 45},
            {weldName: 'W4', pass: 34, noPass: 29},
            {
                weldName: 'W5',
                pass: 15,
                noPass: 65
            },
            {weldName: 'W6', pass: 65, noPass: 35},
            {weldName: 'W7', pass: 80, noPass: 25},
            {
                weldName: 'W8',
                pass: 85,
                noPass: 15
            },
            {weldName: 'W9', pass: 92, noPass: 23},
            {weldName: 'W10', pass: 44, noPass: 35},
            {
                weldName: 'W11',
                pass: 78,
                noPass: 45
            },
            {weldName: 'W12', pass: 85, noPass: 15},
            {weldName: 'W12', pass: 85, noPass: 15},
            {weldName: 'W12', pass: 85, noPass: 15},
            {weldName: 'W12', pass: 85, noPass: 15},
            {weldName: 'W12', pass: 85, noPass: 15},
            {weldName: 'W12', pass: 85, noPass: 15},
            {weldName: 'W12', pass: 85, noPass: 15},
            {weldName: 'W12', pass: 85, noPass: 15},
            {weldName: 'W12', pass: 85, noPass: 15},
            {weldName: 'W12', pass: 85, noPass: 15},
            {weldName: 'W12', pass: 85, noPass: 15},
            {weldName: 'W12', pass: 85, noPass: 15},
            {weldName: 'W12', pass: 85, noPass: 15},
        ]
    },
    defectStatistics: [
        {type: '焊长', color: '#74a0f9', pass: 25, noPass: 35},

        {
            type: '焊宽',
            color: '#73ddb3',
            pass: 65,
            noPass: 5
        },
        {type: '焊高', color: '#7585a2', pass: 63, noPass: 7},
        {
            type: 'A值',
            color: '#f7c739',
            pass: 39,
            noPass: 11
        },
        {
            type: '凹陷',
            color: '#83d0ee',
            pass: 83,
            noPass: 11
        },
        {type: '凸起', color: '#ed907a', pass: 26, noPass: 15},
        {
            type: '咬边',
            color: '#a285d2',
            pass: 37,
            noPass: 9
        },


        {type: '烧穿', color: '#ffab68', pass: 57, noPass: 16},
        {
            type: '焊偏',
            color: '#47a9a8',
            pass: 78,
            noPass: 18
        },
        {type: '气孔', color: '#ffa8cc', pass: 33, noPass: 34},
    ]
};
// for (let i = 0; i < 1000; i++) {
//     data.defectStatistics.push({
//         type: '气孔' + (i + 1),
//         color: `#${Math.ceil(Math.random()*10)}${Math.ceil(Math.random()*10)}${Math.ceil(Math.random()*10)}${Math.ceil(Math.random()*10)}${Math.ceil(Math.random()*10)}${i%10}`,
//         pass: Math.random() * 1000,
//         noPass: Math.random() * 1000
//     });
// }

