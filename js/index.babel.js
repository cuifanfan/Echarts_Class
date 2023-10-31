"use strict"; function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left) } else { return left instanceof right } } function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread() } function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen) } function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter) } function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr) } function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i]; return arr2 } function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o }, _typeof(o) } function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } } function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor) } } function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor } function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value) } function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } } function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }) } else { obj[key] = value } return obj } function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key) } function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input) } function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) { _classCheckPrivateStaticAccess(receiver, classConstructor); _classCheckPrivateStaticFieldDescriptor(descriptor, "get"); return _classApplyDescriptorGet(receiver, descriptor) } function _classCheckPrivateStaticFieldDescriptor(descriptor, action) { if (descriptor === undefined) { throw new TypeError("attempted to " + action + " private static field before its declaration"); } } function _classCheckPrivateStaticAccess(receiver, classConstructor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } } function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor) } function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver) } return descriptor.value } function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value } function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver) } function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value) } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value } } var _options = new WeakMap(); var _limitCount = new WeakMap(); var _chart = new WeakMap(); var Chart = function () { function Chart(_ref) { var colors = _ref.colors, options = _ref.options, id = _ref.id, renderer = _ref.renderer, data = _ref.data, chartType = _ref.type, _ref$limitCount = _ref.limitCount, limitCount = _ref$limitCount === void 0 ? 20 : _ref$limitCount; _classCallCheck(this, Chart); _defineProperty(this, "id", ''); _defineProperty(this, "renderer", 'svg'); _classPrivateFieldInitSpec(this, _options, { writable: true, value: {} }); _classPrivateFieldInitSpec(this, _limitCount, { writable: true, value: 20 }); _classPrivateFieldInitSpec(this, _chart, { writable: true, value: null }); this.id = id; this.renderer = renderer || 'svg'; _classPrivateFieldSet(this, _options, Chart.initOptions({ options: options, data: data, chartType: chartType, colors: colors })); _classPrivateFieldSet(this, _limitCount, Math.max(12, limitCount)); _classPrivateFieldSet(this, _chart, this.complexChart(data)) } _createClass(Chart, [{ key: "complexChart", value: function complexChart(data) { var _this = this; var chart = this.renderer !== 'svg' ? echarts.init(this.id) : echarts.init(this.id, null, { renderer: 'svg' }); chart.on('datazoom', function (event) { return _this.dataZoom(event, data) }); chart.setOption(_classPrivateFieldGet(this, _options)); window.onresize = Chart.resize.bind(Chart); _classStaticPrivateFieldSpecGet(Chart, Chart, _charts).push(chart); return chart } }, { key: "dataZoom", value: function dataZoom(event, data) { var dataLength = _classPrivateFieldGet(this, _options).xAxis[0].data.length; var _event$batch$ = event.batch[0], start = _event$batch$.start, end = _event$batch$.end; var rate = dataLength / 100; var startIndex = Math.ceil(start * rate); var endIndex = Math.ceil(end * rate); var count = endIndex - startIndex + 2; this.toggleAxisText(count); this.toggleBarWidth(count); Object.assign(_classPrivateFieldGet(this, _options).dataZoom[0], { start: start, end: end }); _classPrivateFieldGet(this, _chart).setOption(_classPrivateFieldGet(this, _options)) } }, { key: "toggleAxisText", value: function toggleAxisText(count) { _classPrivateFieldGet(this, _options).xAxis[0].axisLabel.show = count <= _classPrivateFieldGet(this, _limitCount) } }, { key: "toggleBarWidth", value: function toggleBarWidth(count) { if (count < 12) return; var barWidth = '30%'; if (count < 18) barWidth = '35%'; else if (count < 23) barWidth = '40%'; else if (count < 30) barWidth = '45%'; else if (count < 40) barWidth = '50%'; else if (count < 55) barWidth = '55%'; else if (count < 75) barWidth = '60%'; else if (count < 100) barWidth = '65%'; else if (count < 130) barWidth = '70%'; else if (count < 170) barWidth = '75%'; else if (count < 225) barWidth = '80%'; else if (count < 300) barWidth = '85%'; else if (count < 400) barWidth = '90%'; else if (count < 550) barWidth = '95%'; else barWidth = '100%'; _classPrivateFieldGet(this, _options).series[1].barWidth = barWidth; _classPrivateFieldGet(this, _options).series[2].barWidth = barWidth } }], [{ key: "resize", value: function resize() { _classStaticPrivateFieldSpecGet(this, Chart, _charts).forEach(function (chart) { return chart.resize() }) } }, { key: "initOptions", value: function initOptions(_ref2) { var _this2 = this; var chartType = _ref2.chartType, options = _ref2.options, data = _ref2.data, colors = _ref2.colors; colors = colors || _classStaticPrivateFieldSpecGet(this, Chart, _colors); var pieOptions = { color: colors, tooltip: { trigger: 'item' }, legend: { orient: 'vertical', bottom: '15%', right: '0%', itemWidth: 10, itemHeight: 10, icon: 'rect', data: data.map(function (_ref3, index) { var name = _ref3.name; return { name: name, textStyle: { color: _classStaticPrivateFieldSpecGet(_this2, Chart, _colors)[index], fontWeight: 700 } } }), formatter: function formatter(name) { return name.slice(0, 2) } }, series: [{ type: 'pie', radius: '50%', data: data.map(function (_ref4, index) { var value = _ref4.value, name = _ref4.name; return { value: value, name: name, label: { color: _classStaticPrivateFieldSpecGet(_this2, Chart, _colors)[index], lineHeight: 9 } } }) }] }; var directOptions = { color: colors, tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } }, legend: { top: '5%', left: '2%', itemWidth: 10, itemHeight: 10, itemGap: 12, icon: 'rect', data: data.map(function (_ref5, index) { var name = _ref5.name; return { name: name, textStyle: { color: _classStaticPrivateFieldSpecGet(_this2, Chart, _colors)[index - 1], fontWeight: 700 } } }) }, grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true }, dataZoom: [{ type: 'slider', show: false, startValue: 0, endValue: 12 }, { type: 'inside', zoomOnMouseWheel: true, moveOnMouseMove: true, moveOnMouseWheel: true }], xAxis: [{ type: 'category', axisTick: { show: false }, axisLabel: { hideOverlap: true, padding: 1 }, data: data[0].value }], yAxis: [{ type: 'value', axisTick: { show: false }, axisLabel: {} }], series: data.map(function (_ref6) { var name = _ref6.name, value = _ref6.value; if (name === 'xAxisTips') return; return { name: name, type: 'bar', stack: 'Ad', barWidth: '30%', emphasis: { focus: 'series' }, data: value } }) }; var modeOptions = { Pie: pieOptions, Direct: directOptions }; return Object.assign(modeOptions[chartType], options) } }, { key: "mixins", value: function (_mixins) { function mixins(_x, _x2) { return _mixins.apply(this, arguments) } mixins.toString = function () { return _mixins.toString() }; return mixins }(function (target, object) { if (_typeof(object) !== 'object' || !object) return; Object.keys(object).forEach(function (key) { if (_typeof(target[key]) !== 'object') { target[key] = object[key]; return } if (Array.isArray(target[key])) { var _target$key; var pushItem = Array.isArray(object[key]) ? object[key] : [object[key]]; (_target$key = target[key]).push.apply(_target$key, _toConsumableArray(pushItem)); return } if (_typeof(object[key]) === 'object') { mixins(target[key], object[key]); return } }) }) }, { key: "defineReactive", value: function defineReactive(target, rate) { var _this3 = this; Object.keys(target).forEach(function (key) { if (typeof target[key] === 'number') { target[key] *= rate; return } if (_typeof(target[key]) === 'object') { _this3.defineReactive(target[key], rate); return } }) } }]); return Chart }(); var _colors = { writable: true, value: ['#43c07a', '#fa5e5e'] }; var _charts = { writable: true, value: [] }; function getPercent(num, total) { var fixedRate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2; return (num * 100 / total).toFixed(fixedRate) } function receiveEchartsData(echartData) { initCharts(echartData) } function initCharts(data) { var partPieID = document.getElementById('PartQualificationRatePieChart'); var partDirectID = document.getElementById('PartQualificationRateDirectChart'); var partTotalNumElement = document.getElementById('PartQualificationRate_4'); var partPassElement = document.getElementById('PartQualificationRate_5'); var partNoPassElement = document.getElementById('PartQualificationRate_6'); var weldPieID = document.getElementById('WeldLineQualificationRatePieChart'); var weldDirectID = document.getElementById('WeldLineQualificationRateDirectChart'); var weldTotalNumElement = document.getElementById('WeldLineQualificationRate_4'); var weldPassElement = document.getElementById('WeldLineQualificationRate_5'); var weldNoPassElement = document.getElementById('WeldLineQualificationRate_6'); var defectPieID = document.getElementById('DefectStatisticPieChart'); var defectDirectID = document.getElementById('DefectStatisticDirectChart'); var _data$partPassrate = data.partPassrate, partTotalNum = _data$partPassrate.totalNum, partPass = _data$partPassrate.pass, partNoPass = _data$partPassrate.noPass, partTempDirectData = _data$partPassrate.measureResult, _data$weldPassrate = data.weldPassrate, weldTotalNum = _data$weldPassrate.totalNum, weldPass = _data$weldPassrate.pass, weldNoPass = _data$weldPassrate.noPass, weldTempDirectData = _data$weldPassrate.weldResult, defectTempChartData = data.defectStatistics; var partTempPieData = [{ type: 'OK', pass: partPass, noPass: partPass }, { type: 'NG', pass: partNoPass, noPass: partNoPass }]; var weldTempPieData = [{ type: 'OK', pass: weldPass, noPass: weldPass }, { type: 'NG', pass: weldNoPass, noPass: weldNoPass }]; var generatePieData = function generatePieData(data, hanlder) { var _hanlder; hanlder = (_hanlder = hanlder) !== null && _hanlder !== void 0 ? _hanlder : function (pass, noPass) { return pass + noPass }; var totalSum = data.reduce(function (prev, curr) { return prev + curr.pass + curr.noPass }, 0); return data.map(function (_ref7) { var type = _ref7.type, pass = _ref7.pass, noPass = _ref7.noPass; return { value: hanlder && hanlder(pass, noPass), name: "".concat(type, "\n\n").concat(getPercent(pass + noPass, totalSum), "%") } }) }; var generateDirectData = function generateDirectData(data, hanlder) { hanlder = Object.assign({ 'xAxisTips': function xAxisTips(_ref8) { var type = _ref8.type; return type }, 'OK': function OK(_ref9) { var pass = _ref9.pass; return pass }, 'NG': function NG(_ref10) { var noPass = _ref10.noPass; return noPass } }, hanlder); return Object.keys(hanlder).map(function (name) { return { name: name, value: data.map(hanlder[name]) } }) }; var partPieData = generatePieData(partTempPieData, function (pass, noPass) { return (pass + noPass) / 2 }); var weldPieData = generatePieData(weldTempPieData, function (pass, noPass) { return (pass + noPass) / 2 }); var defectPieData = generatePieData(defectTempChartData); var partDirectData = generateDirectData(partTempDirectData, { 'xAxisTips': function xAxisTips(_ref11) { var bodyNum = _ref11.bodyNum; var bodyNumStr = String(bodyNum); return "".concat(bodyNumStr.slice(0, 4), " ").concat(bodyNumStr.slice(4, 8), " ").concat(bodyNumStr.slice(8)) } }); var weldDirectData = generateDirectData(weldTempDirectData, { 'xAxisTips': function xAxisTips(_ref12) { var weldName = _ref12.weldName; return weldName } }); var defectDirectData = generateDirectData(defectTempChartData); partTotalNumElement.innerText = "\u5171\u68C0\u6D4B\uFF08\u4EF6\uFF09\uFF1A".concat(partTotalNum); partPassElement.innerText = "\u5171\u5408\u683C\uFF1A".concat(partPass); partNoPassElement.innerText = "\u7F3A\u9677\u4EF6\uFF1A".concat(partNoPass); weldTotalNumElement.innerText = "\u5171\u68C0\u6D4B\uFF08\u6761\uFF09\uFF1A".concat(weldTotalNum); weldPassElement.innerText = "\u5171\u5408\u683C\uFF1A".concat(weldPass); weldNoPassElement.innerText = "\u7F3A\u9677\u4EF6\uFF1A".concat(weldNoPass); var partPieChart = new Chart({ type: 'Pie', id: partPieID, data: partPieData }); var partChart = new Chart({ type: 'Direct', id: partDirectID, data: partDirectData }); var weldPieChart = new Chart({ type: 'Pie', id: weldPieID, data: weldPieData }); var weldDirectChart = new Chart({ type: 'Direct', id: weldDirectID, data: weldDirectData }); var defectPieTips = ['焊偏', '焊长', '烧穿', '焊高', '咬边', '焊宽']; var defectColors = defectTempChartData.map(function (_ref13) { var color = _ref13.color; return color }); var defectPieChart = new Chart({ type: 'Pie', id: defectPieID, colors: defectColors, data: defectPieData, options: { legend: { type: defectPieData.length > 10 || window.innerWidth < 800 ? 'scroll' : 'plain', orient: 'vertical', bottom: '0%', right: '0%', height: defectPieData.length > 10 ? 125 : 110, itemWidth: 10, itemHeight: 10, itemGap: 10, icon: 'rect', pageIconSize: 10, formatter: function formatter(name) { return name.slice(0, 2) } }, series: [{ type: 'pie', radius: '67%', data: defectPieData.map(function (_ref14, index) { var value = _ref14.value, name = _ref14.name; return { value: value, name: name, label: { color: 'gray', lineHeight: 9, show: defectPieTips.includes(name.slice(0, 2)) ? true : false } } }) }] } }); var defectDirectChart = new Chart({ type: 'Direct', id: defectDirectID, data: defectDirectData, limitCount: 18 }) }