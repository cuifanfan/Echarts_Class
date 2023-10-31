/**
 * @description 图表类（当亲包含：饼状图 | 直方图）
 * @param colors {Array} 颜色配置项
 * @param options {Object} 覆盖图表默认配置
 * @param id {String} Ecarts实例挂载到指定元素
 * @param renderer {String} 渲染模式（'svg' | 'canvas'）
 * @param mode {String} 图表类型（'Pie'饼图 | 'Direct'直方图）
 * */
class Chart {
    static #colors = ['#43c07a', '#fa5e5e'];                                    // 默认颜色选项
    static #charts = [];                                                        // 已经创建的图表实例

    id = '';                                                                    // echarts实例挂载的DOM
    renderer = 'svg';                                                           // echarts渲染模式(svg|canvas)
    #options = {};                                                              // echrts图表原生配置信息
    #limitCount = 20;                                                           // 限制显示文字数据数量
    #chart = null;                                                              // echarts实例
    constructor({ colors, options, id, renderer, data, type: chartType, limitCount = 20 }) {
        this.id = id;
        this.renderer = renderer || 'svg';
        this.#options = Chart.initOptions({ options, data, chartType, colors });
        this.#limitCount = Math.max(12, limitCount);
        this.#chart = this.complexChart(data);
    }
    /**
     * @description 公共方法：合成 Echarts 图表模块
     */
    complexChart(data) {
        // 基于给定 id 的 dom 初始化 echarts 实例
        const chart = this.renderer !== 'svg'
            ? echarts.init(this.id)
            : echarts.init(this.id, null, { renderer: 'svg' });

        // 监听dataZoom组件（滚动或缩放直方图）
        chart.on('datazoom', (event) => this.dataZoom(event, data));
        // 使用指定的配置项和数据显示图表。
        chart.setOption(this.#options);
        // 监听页面缩放，响应式缩放图表
        window.onresize = Chart.resize.bind(Chart);
        // 保存实例到类的静态私有属性
        Chart.#charts.push(chart);
        return chart;
    }
    // 监听dataZoom组件（滚动或缩放直方图）
    dataZoom(event, data) {
        // 所有数据的数量
        const dataLength = this.#options.xAxis[0].data.length;
        // 视野内元素的数量（索引）
        const { start, end } = event.batch[0];
        const rate = dataLength / 100;
        const startIndex = Math.ceil(start * rate);
        const endIndex = Math.ceil(end * rate);
        const count = endIndex - startIndex + 2;
        // 根据限制数量隐藏或显示文字
        this.toggleAxisText(count);
        // 根据数量改变数据项大小比例
        this.toggleBarWidth(count);
        // 保持原本的缩放比例
        Object.assign(this.#options.dataZoom[0], { start, end });
        // 重新渲染
        this.#chart.setOption(this.#options);
    }
    // 根据限制数量隐藏或显示文字
    toggleAxisText(count) {
        this.#options.xAxis[0].axisLabel.show = count <= this.#limitCount;
    }
    // 根据数据量动态改变数据项宽度
    toggleBarWidth(count) {
        if (count < 12) return;
        let barWidth = '30%';
        if (count < 18) barWidth = '35%';
        else if (count < 23) barWidth = '40%';
        else if (count < 30) barWidth = '45%';
        else if (count < 40) barWidth = '50%';
        else if (count < 55) barWidth = '55%';
        else if (count < 75) barWidth = '60%';
        else if (count < 100) barWidth = '65%';
        else if (count < 130) barWidth = '70%';
        else if (count < 170) barWidth = '75%';
        else if (count < 225) barWidth = '80%';
        else if (count < 300) barWidth = '85%';
        else if (count < 400) barWidth = '90%';
        else if (count < 550) barWidth = '95%';
        else barWidth = '100%';
        this.#options.series[1].barWidth = barWidth
        this.#options.series[2].barWidth = barWidth
    }
    // 页面缩放响应式更新图表大小
    static resize() {
        this.#charts.forEach(chart => chart.resize());
    }
    /**
     * @description Echarts 图表信息
     * @author cuifan 2023/8/31
     * @param chartType {String} 图表类型（'Pie' | 'Direct'）
     * @param options {Object} 自定义用来覆盖默认配置的参数信息
     * @param data {Object} 图表数据：[{value:xxx,name:xxx}]
     * @param colors {Array} 自定义图表颜色选项
     */
    static initOptions({ chartType, options, data, colors }) {
        colors = colors || this.#colors;
        const pieOptions = {
            color: colors,                                                      // 指定饼状图的配置项和数据
            tooltip: {
                trigger: 'item'                                                 // 鼠标悬停提示
            },
            legend: {                                                           // 图例组件
                orient: 'vertical',                                             // 换行
                bottom: '15%',                                                  // 相对位置
                right: '0%',
                itemWidth: 10,                                                  // 图标大小
                itemHeight: 10,
                icon: 'rect',
                data: data.map(({ name }, index) => ({                            // 图例文字配置信息
                    name,
                    textStyle: {
                        color: this.#colors[index],
                        fontWeight: 700
                    }
                })),
                formatter: name => name.slice(0, 2)                             // 自定义图例文字内容
            },
            series: [                                                           // 图表数据
                {
                    type: 'pie',                                                // 图表类型
                    radius: '50%',
                    data: data.map(({ value, name }, index) => ({
                        value,
                        name,
                        label: {                                                // 图表上label文字的配置（样式）
                            color: this.#colors[index],
                            lineHeight: 9
                        }
                    }))
                }
            ]
        };
        const directOptions = {                                                 // 直方图配置信息
            color: colors,
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'                                              // 鼠标悬浮阴影效果
                }
            },
            legend: {
                top: '5%',
                left: '2%',
                itemWidth: 10,
                itemHeight: 10,
                itemGap: 12,
                icon: 'rect',
                data: data.map(({ name }, index) => ({
                    name,
                    textStyle: {
                        color: this.#colors[index - 1],
                        fontWeight: 700
                    }
                }))
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            dataZoom: [                                                         // 拖动图表组件
                {
                    type: 'slider',                                             //隐藏或显示（true）组件
                    show: false,
                    startValue: 0,
                    endValue: 12,
                },
                {
                    type: 'inside',
                    zoomOnMouseWheel: true,                                     //滚轮是否触发缩放
                    moveOnMouseMove: true,                                      //鼠标滚轮触发滚动
                    moveOnMouseWheel: true,
                },
            ],

            xAxis: [
                {
                    type: 'category',
                    axisTick: {
                        show: false                                             // 取消坐标轴复刻线
                    },
                    axisLabel: {
                        hideOverlap: true,
                        padding: 1
                    },
                    data: data[0].value                                          // X轴提示信息
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisTick: {
                        show: false                                             // 取消坐标轴复刻线
                    },
                    axisLabel: {
                        // show: false, //隐藏刻度值
                    },
                }
            ],


            series: data.map(({ name, value }) => {                               // 图表数据
                if (name === 'xAxisTips') return;
                return {
                    name: name,
                    type: 'bar',
                    stack: 'Ad',
                    barWidth: '30%',
                    emphasis: {
                        focus: 'series'
                    },
                    data: value,
                };
            })
        };
        const modeOptions = {
            Pie: pieOptions,
            Direct: directOptions
        };
        return Object.assign(modeOptions[chartType], options);
    }
    static mixins(target, object) {
        if (typeof object !== 'object' || !object) return;
        Object.keys(object).forEach(key => {
            if (typeof target[key] !== 'object') {
                target[key] = object[key];
                return;
            }

            if (Array.isArray(target[key])) {
                const pushItem = Array.isArray(object[key])
                    ? object[key]
                    : [object[key]];
                target[key].push(...pushItem);
                return;
            }

            if (typeof object[key] === 'object') {
                mixins(target[key], object[key]);
                return;
            }
        });
    }
    static defineReactive(target, rate) {
        Object.keys(target).forEach(key => {
            if (typeof target[key] === 'number') {
                target[key] *= rate;
                return;
            }
            if (typeof target[key] === 'object') {
                this.defineReactive(target[key], rate);
                return;
            }
        });
    }
}
/**
* @description 计算百分比
* @param num {Number} 除数
* @param total {Number} 被除数
* @param fixedRate {Number} 保留位数
* */
function getPercent(num, total, fixedRate = 2) {
    return ((num * 100) / total).toFixed(fixedRate);
}
/**
* @description 接收传过来的数据
* */
function receiveEchartsData(echartData) {
    initCharts(echartData);
}
/**
* @description 页面逻辑模块
* @author cuifan 2023/09/01
* */
function initCharts(data) {
    // 获取页面元素
    // 零件合格率模块
    const partPieID = document.getElementById('PartQualificationRatePieChart');
    const partDirectID = document.getElementById('PartQualificationRateDirectChart');
    const partTotalNumElement = document.getElementById('PartQualificationRate_4');
    const partPassElement = document.getElementById('PartQualificationRate_5');
    const partNoPassElement = document.getElementById('PartQualificationRate_6');
    // 焊缝合格率模块
    const weldPieID = document.getElementById('WeldLineQualificationRatePieChart');
    const weldDirectID = document.getElementById('WeldLineQualificationRateDirectChart');
    const weldTotalNumElement = document.getElementById('WeldLineQualificationRate_4');
    const weldPassElement = document.getElementById('WeldLineQualificationRate_5');
    const weldNoPassElement = document.getElementById('WeldLineQualificationRate_6');
    // 缺陷统计模块
    const defectPieID = document.getElementById('DefectStatisticPieChart');
    const defectDirectID = document.getElementById('DefectStatisticDirectChart');

    // 接收数据（临时存储，未被处理）
    const {
        // 零件合格率模块
        partPassrate: {
            totalNum: partTotalNum,
            pass: partPass,
            noPass: partNoPass,
            measureResult: partTempDirectData
        },
        // 焊缝合格率模块
        weldPassrate: {
            totalNum: weldTotalNum,
            pass: weldPass,
            noPass: weldNoPass,
            weldResult: weldTempDirectData
        },
        // 缺陷统计模块
        defectStatistics: defectTempChartData
    } = data;
    const partTempPieData = [
        {
            type: 'OK',
            pass: partPass,
            noPass: partPass,
        },
        {
            type: 'NG',
            pass: partNoPass,
            noPass: partNoPass,
        }];
    const weldTempPieData = [
        {
            type: 'OK',
            pass: weldPass,
            noPass: weldPass
        },
        {
            type: 'NG',
            pass: weldNoPass,
            noPass: weldNoPass
        },
    ];

    // 把接收来的数据格式转换为echarts格式: [{value:xxx,name:xxx}]
    const generatePieData = (data, hanlder) => {
        hanlder = hanlder ?? ((pass, noPass) => pass + noPass);
        const totalSum = data.reduce((prev, curr) => prev + curr.pass + curr.noPass, 0);
        return data.map(({ type, pass, noPass }) => ({
            value: hanlder && hanlder(pass, noPass),
            name: `${type}\n\n${getPercent(pass + noPass, totalSum)}%`
        }));
    };
    const generateDirectData = (data, hanlder) => {
        hanlder = Object.assign({
            'xAxisTips': ({ type }) => type,
            'OK': ({ pass }) => pass,
            'NG': ({ noPass }) => noPass
        }, hanlder);
        return Object.keys(hanlder).map(name => ({
            name,
            value: data.map(hanlder[name])
        }));
    };

    // echarts图表数据
    const partPieData = generatePieData(partTempPieData, (pass, noPass) => (pass + noPass) / 2);
    const weldPieData = generatePieData(weldTempPieData, (pass, noPass) => (pass + noPass) / 2);
    const defectPieData = generatePieData(defectTempChartData,);
    const partDirectData = generateDirectData(partTempDirectData, {
        'xAxisTips': ({ bodyNum }) => {
            const bodyNumStr = String(bodyNum);
            return `${bodyNumStr.slice(0, 4)} ${bodyNumStr.slice(4, 8)} ${bodyNumStr.slice(8)}`;
        }
    });
    const weldDirectData = generateDirectData(weldTempDirectData, { 'xAxisTips': ({ weldName }) => weldName });
    const defectDirectData = generateDirectData(defectTempChartData);

    // 更新数据到视图
    partTotalNumElement.innerText = `共检测（件）：${partTotalNum}`;
    partPassElement.innerText = `共合格：${partPass}`;
    partNoPassElement.innerText = `缺陷件：${partNoPass}`;
    weldTotalNumElement.innerText = `共检测（条）：${weldTotalNum}`;
    weldPassElement.innerText = `共合格：${weldPass}`;
    weldNoPassElement.innerText = `缺陷件：${weldNoPass}`;

    const partPieChart = new Chart({
        type: 'Pie',
        id: partPieID,
        data: partPieData,
    });
    const partChart = new Chart({
        type: 'Direct',
        id: partDirectID,
        data: partDirectData
    });
    const weldPieChart = new Chart({
        type: 'Pie',
        id: weldPieID,
        data: weldPieData
    });
    const weldDirectChart = new Chart({
        type: 'Direct',
        id: weldDirectID,
        data: weldDirectData,
    });
    // 饼图显示的tooltip
    const defectPieTips = ['焊偏', '焊长', '烧穿', '焊高', '咬边', '焊宽'];
    // 颜色选项
    const defectColors = defectTempChartData.map(({ color }) => color);
    const defectPieChart = new Chart({
        type: 'Pie',
        id: defectPieID,
        colors: defectColors,
        data: defectPieData,
        // 自定义图表配置（手写的mixin混入会影响echarts内部结构，只能采用覆盖的形式：Object.assign）
        options: {
            legend: {
                type: (defectPieData.length > 10 || window.innerWidth < 800) ? 'scroll' : 'plain',
                orient: 'vertical',
                bottom: '0%',
                right: '0%',
                height: defectPieData.length > 10 ? 125 : 110,
                itemWidth: 10,
                itemHeight: 10,
                itemGap: 10,
                icon: 'rect',
                pageIconSize: 10,
                formatter: name => name.slice(0, 2)
            },
            series: [
                {
                    type: 'pie',
                    radius: '67%',
                    data: defectPieData.map(({ value, name }, index) => ({
                        value,
                        name,
                        label: {
                            color: 'gray',
                            lineHeight: 9,
                            show: defectPieTips.includes(name.slice(0, 2)) ? true : false
                        }
                    }))
                }
            ]
        }
    });
    const defectDirectChart = new Chart({
        type: 'Direct',
        id: defectDirectID,
        data: defectDirectData,
        limitCount: 18
    });
}