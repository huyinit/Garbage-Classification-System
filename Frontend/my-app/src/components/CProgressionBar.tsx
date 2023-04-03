import React from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar';
import "antd/dist/antd.css";
import "../App.scss";
import { Button, notification } from 'antd';
import { BinData, CompartmentData } from '../common/define-type';
import StatisticApi from '../api/statistic/statistic.api';

interface MyProps{
    BinData: BinData,
    CompartmentData: CompartmentData,
    resetHandle: (binId: string, compartmentId: string) => void,
    ordinal: number
}


const CProgressionBar = (props: MyProps) => {
    const now = 80;


   

    return (
        <div style={{display:'flex'}}>
            {
                props.CompartmentData && 
                <>
                    <div className='progression-bar'>
                        <div>{`Label ${props.CompartmentData.NhanRac}:`}</div>
                        {/* <div>{`${props.CompartmentData.garbageType}:`}</div> */}

                        <ProgressBar animated label={`${props.CompartmentData.KhoiLuong}%`} now={props.CompartmentData.KhoiLuong} max={100}/>
                        {/* <ProgressBar animated label={`${now}%`} now={now} max={100}/> */}

                    </div>
                    <Button onClick={()=>props.resetHandle(props.BinData.ID_thungrac, props.BinData.Khoangrac[props.ordinal].ID_khoangrac)} className='button-styled' type='primary' style={{marginTop: '24px'}}>Reset</Button>
                </>
            }
        </div>
        
         
    )
}

export default CProgressionBar