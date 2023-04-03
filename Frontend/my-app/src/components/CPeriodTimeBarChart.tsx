import "antd/dist/antd.css";
import "../App.scss";
import React, { useEffect, useRef, useState } from 'react'
import Chart from "chart.js";
import DatePicker from "./CDatePicker";
import StatisticApi from '../api/statistic/statistic.api';
import { notification } from 'antd';
import { start } from 'repl';
import { BarChartData } from '../common/define-type';




interface MyProps{
    chartType: string
    binId?: string
}

const CPeriodTimeBarChart = (props: MyProps) => {
    const [startTime, setStartTime] = useState<Date>(new Date());
    const [endTime,setEndTime] = useState<Date>(new Date(startTime.getTime()+2));
    const [barChartData,setBarChartData] = useState<BarChartData[]>();
    const {chartType} = props;
    // use a ref to store the chart instance since it it mutable
    const chartRef = useRef<Chart | null>(null);

    // callback creates the chart on the canvas element
    const canvasCallback = (canvas: HTMLCanvasElement | null) => {
        if (!canvas || !barChartData) return;
        console.log(barChartData)
        // barChartData.map(item=>console.log(item))
           
        var myChart = new Chart(canvas, {
            type: 'bar',
            data: {
                labels: barChartData.map(item => item.Ngay),
                // labels: ['2022','2023','2024','2025'],
                datasets: [{
                    label: 'box_cardboard_paper',
                    stack: 'Stack 1',
                    data: barChartData?.map(item=>item.Rac[0].KhoiLuong),
                    // data: [130,34,25,78],
                    backgroundColor: 'blue',                          
                },
                {
                    label: 'glass_metal_plastic',
                    stack: 'Stack 1',
                    data: barChartData?.map(item=>item.Rac[1].KhoiLuong),
                    // data: [13,134,251,54],

                    backgroundColor: 'orange',                          
                },
                {
                    label: 'organic',
                    data: barChartData?.map(item=>item.Rac[2].KhoiLuong),
                    // data: [30,54,29,38],

                    stack: 'Stack 1',
                    backgroundColor: 'yellow',                          
                },
                {
                    label: 'other',
                    data: barChartData?.map(item=>item.Rac[3].KhoiLuong),
                    // data: [35,51,25,140],

                    stack: 'Stack 1',
                    backgroundColor: 'green',                          
                }]
                // datasets: barChartData?.map(item=>({
                //     label: item.Ngay,
                //     stack: 'Stack 1',
                //     data: [240, 270, 1320],
                //     backgroundColor: 'blue',  
                // }))
            },
            options: {
                scales: {
                    xAxes: [{
                        stacked: true,
                    }],
                    yAxes: [{
                        stacked: true
                    }]
                }
            }
        });
        
    };

    
    
    // effect to update the chart when props are updated
    useEffect(() => {
        // must verify that the chart exists
        if (chartRef.current) {
        //   chartRef.current.data = formatData(chartData);
        chartRef.current.update();
        }
    
        // cleanup function - I had to remove this as it was causing errors
        /*return () => {
        chartRef.current?.destroy();
        };*/
    }, [chartType]);

    useEffect(()=>{
        setBarChartData(undefined) // Dung de xoa du lieu bieu do cua vi tri da chon truoc do
    },[props.binId])

    useEffect(()=>{
        if(props.binId && endTime>startTime) {
            setBarChartData(undefined) // Xoa du lieu cu khi chon lai ngay
            const formatStartTime = startTime.toISOString().slice(0, 10);
            const formatEndTime = endTime.toISOString().slice(0, 10);
            console.log(props.binId,'_',formatStartTime,'_',formatEndTime)

            StatisticApi.getPeriodTimeBarChartData(props.binId, formatStartTime, formatEndTime).then((res: any)=>{
                setBarChartData(res.data.data);
                console.log(res);
            })
        }
        else{
            console.log('chon lai nha')
            notification.open({
                message: 'Alert!!',
                description:
                  'Vui long chon thung rac va thoi gian hop le',
                onClick: () => {
                  console.log('Notification Clicked!');
                },
            });
            // setStartTime(new Date());
            // setEndTime(new Date());
        }
    },[startTime,endTime,props.binId])

    const onChangeStartTime = (e: any) => {
        setStartTime(e);
        console.log(e)
    }

    const onChangeEndTime = (e: any) => {
        setEndTime(e);
        console.log(e)

    }
    
    return (
        <div className="self-center ">
            <div className='date-picker'>
                <DatePicker
                    allowClear={false}
                    bordered={false}
                    onChange={onChangeStartTime}
                    defaultValue={startTime}
                    value={startTime}
                    style={{ marginLeft: 15 }}
                />
                <DatePicker
                    allowClear={false}
                    bordered={false}
                    onChange={onChangeEndTime}
                    defaultValue={endTime}
                    value={endTime}
                    style={{ marginLeft: 15 }}
                />
            </div>
            
            {
                barChartData ?
                <div className="overflow-hidden">
                    <canvas ref={canvasCallback}></canvas>
                </div>:
                <div className='unselected-data-notification'>Lua chon vi tri thung rac va ngay de xem bieu do</div>
            }
            {/* <div className="overflow-hidden">
                <canvas ref={canvasCallback}></canvas>
            </div> */}
        </div>
    );
}

export default CPeriodTimeBarChart