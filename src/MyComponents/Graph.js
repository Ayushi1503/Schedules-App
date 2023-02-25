import React from 'react'
import { useState } from 'react';
import CanvasJSReact from '../canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export const Graph = () => {
    var data = require('../data.json');
    const [date, setDate] = useState("");
    const [date2, setDate2] = useState("");
    const [newdata, setNewData] = useState([]);
    const [graph, setGraph] = useState(false);
    const [graph2, setGraph2] = useState(false);
    const [dataPoints, setDataPoints] = useState([]);
    const [dataPoints2, setDataPoints2] = useState([]);
    const [graph2_x_label, setLabel2] = useState([]);

    const submit = (e) => {
        e.preventDefault();
        setGraph2(false);
        if (date === "") {
            alert("Please Select a date");
        }
        else {
            let nd = [];
            for (var i = 0; i < data.length; i++) {
                if (date === data[i].item_date) {
                    nd.push(data[i]);
                }
            }
            setNewData(nd);
            if (nd.length === 0) {
                setGraph(false);
                setGraph2(false);
                alert("No data exists for the selected date. Please Select another date");
            }
            else {
                let schedule_date = {};
                for (var j = 0; j < nd.length; j++) {
                    let x = nd[j]['schedule_time'].slice(0, 10);
                    if (x in schedule_date) {
                        schedule_date[x] += 1;
                    }
                    else {
                        schedule_date[x] = 1;
                    }
                }
                let dp = [];
                for (let [key, value] of Object.entries(schedule_date)) {
                    let obj = {};
                    obj['x'] = new Date(key);
                    obj['y'] = value;
                    obj['indexLabel'] = value + '';
                    dp.push(obj);
                }
                setDataPoints(dp);
                setGraph(true);
            }
        }
    }

    let options = {}
    if (graph === true) {
        options = {
            animationEnabled: true,
            exportEnabled: false,
            theme: "light2",
            title: {
                text: "Schedule for date " + new Date(date).toJSON().slice(0, 10)
            },
            axisX: {
                gridThickness: 0,
                tickLength: 0,
                lineThickness: 0,
                title: "Date of Schedules"
            },
            axisY: {
                includeZero: true,
                title: "Number of Schedules"
            },
            dataPointWidth: 50,
            data: [{
                type: "column",
                click: onClick,
                indexLabelFontColor: "#5A5757",
                indexLabelPlacement: "outside",
                dataPoints: dataPoints
            }]
        }
    }
    let options2 = {};
    if (graph === true) {
        console.log(graph2_x_label);
        options2 = {
            animationEnabled: true,
            exportEnabled: false,
            theme: "light2",
            title: {
                text: "Schedule for date " + date2 + " according to time"
            },
            axisX: {
                gridThickness: 0,
                tickLength: 0,
                lineThickness: 0,
                title: "Time of Schedules",
                labelFormatter: function (e) {
                    return graph2_x_label[e.value];
                }
            },
            axisY: {
                includeZero: true,
                title: "Number of Schedules"
            },
            dataPointWidth: 50,
            data: [{
                type: "column",
                indexLabelFontColor: "#5A5757",
                indexLabelPlacement: "outside",
                dataPoints: dataPoints2
            }]
        }
    }

    function onClick(e) {
        let st = { '9am to 12pm': 0, '12pm to 3pm': 0, '3pm to 6pm': 0, '6pm to 9pm': 0, '9pm to 12am': 0, '12am to 3am': 0, '3am to 6am': 0, '6am to 9am': 0 };
        let dn = e.dataPoint.x.toJSON().slice(0, 10);
        setDate2(dn);
        console.log(dn);
        for (var k = 0; k < newdata.length; k++) {
            var x = newdata[k]['schedule_time'].slice(0, 10);
            var t = new Date(newdata[k]['schedule_time']).getHours();
            if (dn === x) {
                if (t >= 0 && t <= 3) {
                    st['12am to 3am'] += 1;
                }
                else if (t >= 3 && t <= 6) {
                    st['3am to 6am'] += 1;
                }
                else if (t >= 6 && t <= 9) {
                    st['6am to 9am'] += 1;
                }
                else if (t >= 9 && t <= 12) {
                    st['9am to 12pm'] += 1;
                }
                else if (t >= 12 && t <= 15) {
                    st['12pm to 3pm'] += 1;
                }
                else if (t >= 15 && t <= 18) {
                    st['3pm to 6pm'] += 1;
                }
                else if (t >= 18 && t <= 21) {
                    st['6pm to 9pm'] += 1;
                }
                else if (t >= 21 && t <= 22) {
                    st['9pm to 12am'] += 1;
                }
            }
        }
        let dp2 = [];
        let l = [];
        var xpt = 0;
        for (let [key, value] of Object.entries(st)) {
            let obj = {};
            obj['x'] = xpt;
            obj['y'] = value;
            obj['indexLabel'] = value+"";
            obj['label'] = key;
            dp2.push(obj);
            xpt += 1;
            l.push(key);
        }
        setDataPoints2(dp2);
        setGraph2(true);
        setLabel2(l);
    }
    return (
        <div className='container my-3'>
            <form onSubmit={submit}>
                <div className="container" style={{ width: 650 }}>
                    <div className="row">
                        <h3 className='col-sm-4 form-group'>Select a Date:</h3>
                        <div className='col-sm-4 form-group'>
                            <input type="date" className=' input-group date text-center' value={date} onChange={(e) => { setDate(e.target.value) }}
                                min="2021-01-01" max="2022-12-31" style={{ width: 200 }} />
                        </div>
                        <div className="col-sm-4 form-group">
                        <button type='submit' className="btn btn-primary">Show Graph</button>
                        </div>
                    </div>
                </div>
            </form><br /><hr /><br />
            <div className='container my-4'>
                {graph && (
                    <div className='container my-3'>
                        <div>
                            <CanvasJSChart options={options} />
                        </div><br /><br /><hr />
                    </div>
                )}
            </div><br />
            <div className='container my-4'>
                {graph2 && (
                    <div className='container my-3'>
                        <div>
                            <CanvasJSChart options={options2} />
                        </div><br /><hr /><br />
                    </div>
                )}
            </div><br />
        </div>
    )
}
