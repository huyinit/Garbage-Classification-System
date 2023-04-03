import { Button, Popover, Select } from "antd";
import Chart from "chart.js";
import { useRef, useEffect, useState } from "react";
import DatePicker from "./CDatePicker";

import "antd/dist/antd.css";
import "../App.scss";
import StatisticApi from "../api/statistic/statistic.api";
import CCurrentPieChart from "./CCurrentPieChart";
import CCurrentBarChart from "./CCurrentBarChart";
import CPeriodTimeBarChart from "./CPeriodTimeBarChart";
import { BinData } from "../common/define-type";
import { BarChartOutlined, FundOutlined, PieChartOutlined } from "@ant-design/icons";


interface MyProps{
    binId?: string
    binData?: BinData
    setBinData: React.Dispatch<React.SetStateAction<BinData | undefined>>
}


// want to see some changes in the props on order to test MyChart
export default (props: MyProps) => {
    const [chartType,setChartType] = useState('');
    const [showCurrentPieChart,setShowCurrentPieChart] = useState(true);
    const [showCurrentBarChart,setShowCurrentBarChart] = useState(false);
    const [showPeriodTimeBarChart,setShowPeriodTimeBarChart] = useState(false);
    const [data, setData] = useState([0, 1, 2, 3, 4, 5, 6, 7]);
    const [start,setStart] = useState<Date>(new Date());
  
    return (
        <div>
            <div className="chart-selector">
                
                {/* <DatePicker
                    allowClear={false}
                    bordered={false}
                    onChange={onDatePickerChange}
                    defaultValue={start}
                    style={{ marginLeft: 15 }}
                /> */}
            </div>
            <div className="chart">
        
                <div className="chart-button">
                    <Popover content={
                            <div>
                                Xem lượng tỷ lệ lượng rác các loại hiện tại
                            </div>
                        } 
                        title="Loại biểu đồ"
                        placement="right"
                    >
                        <PieChartOutlined 
                            className="icon-styled" onClick={()=>{
                                setChartType('current_pie')
                                setShowCurrentPieChart(true);
                                setShowCurrentBarChart(false);
                                setShowPeriodTimeBarChart(false);
                            }}
                        />
                    </Popover>
                    
                    <Popover content={
                            <div>
                                Xem lượng rác các loại hiện tại
                            </div>
                        } 
                        title="Loại biểu đồ"
                        placement="right"
                    >
                        <BarChartOutlined 
                            className="icon-styled" onClick={()=>{
                                setChartType('current_bar');
                                setShowCurrentPieChart(false);
                                setShowCurrentBarChart(true);
                                setShowPeriodTimeBarChart(false);
                            }}
                        />
                    </Popover>
                    
                    <Popover content={
                            <div>
                                Xem lượng rác các loại theo thời gian
                            </div>
                        } 
                        title="Loại biểu đồ"
                        placement="right"
                    >
                        <FundOutlined 
                            className="icon-styled" onClick={()=>{
                                setChartType('period_time_bar');
                                setShowCurrentPieChart(false);
                                setShowCurrentBarChart(false);
                                setShowPeriodTimeBarChart(true);
                            }}
                        />
                    </Popover>
                    
                    {/* <Button type="primary" className="button-styled" onClick={()=>{
                        setChartType('current_pie')
                        setShowCurrentPieChart(true);
                        setShowCurrentBarChart(false);
                        setShowPeriodTimeBarChart(false);
                    }}>Xem ty le cac loai rac hien tai</Button>    
                    <Button type="primary" className="button-styled" onClick={()=>{
                        setChartType('current_bar');
                        setShowCurrentPieChart(false);
                        setShowCurrentBarChart(true);
                        setShowPeriodTimeBarChart(false);
                    }}>Xem luong rac cac loai hien tai</Button>
                    <Button type="primary" className="button-styled" onClick={()=>{
                        setChartType('period_time_bar');
                        setShowCurrentPieChart(false);
                        setShowCurrentBarChart(false);
                        setShowPeriodTimeBarChart(true);
                    }}>Xem luong rac cac loai theo ngay</Button> */}
                </div>
                {/* <MyChart chartType={chartType} /> */}
                {
                    showCurrentPieChart && props.binData && 
                    <CCurrentPieChart
                        chartType="current_pie"
                        binData={props.binData}
                        setBinData={props.setBinData}
                    />
                }
                {
                    showCurrentBarChart && props.binData &&
                    <CCurrentBarChart
                        chartType="current_bar"
                        binData={props.binData}
                        setBinData={props.setBinData}

                    />
                }
                {
                    showPeriodTimeBarChart && 
                    <CPeriodTimeBarChart
                        binId = {props.binId}
                        chartType="period_time_bar"
                    />
                }
            </div>
        </div>
        
    );
};
