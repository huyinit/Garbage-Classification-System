import { LeftCircleTwoTone, RightCircleTwoTone } from '@ant-design/icons'
import { Image, notification } from 'antd'

import DatePicker from "./CDatePicker";
import "antd/dist/antd.css";
import "../App.scss";

import React, {useState, useEffect} from 'react'
import { BinData, GetImageResponse } from '../common/define-type'
import plastic_trash from '../images/plastic_trash.jpg'
import StatisticApi from '../api/statistic/statistic.api';

const data = [
    0,1,2,3,4,5,6,7,8
]

const garbageType = [
    'box_cardboard_paper',
    'glass_metal_plastic',
    'organic',
    'other'
]

interface MyProps {
    binData: BinData
}

const CGabargeImages = (props: MyProps) => {
    const [index,setIndex] = useState<number>(0)
    const [listImage, setListImage] = useState(); // luu lai list anh rac tuong ung
    const [startTime, setStartTime] = useState<Date>(new Date());
    const [endTime,setEndTime] = useState<Date>(new Date(startTime.getTime()+2));
    const [imageStore1,setImageStore1] = useState<string[]>();
    const [imageStore2,setImageStore2] = useState<string[]>();

    const [imageStore3,setImageStore3] = useState<string[]>();

    const [imageStore4,setImageStore4] = useState<string[]>();

    const [currentData,setCurrentData] = useState<string[]>();



    // const ImageStore = [
    //     require('../images/')
    // ]

    useEffect(()=>{
        if(props.binData && endTime>startTime) {
            setImageStore1([]) // Xoa du lieu cu khi chon lai ngay
            setImageStore2([])
            setImageStore3([])
            setImageStore4([])
            const formatStartTime = startTime.toISOString().slice(0, 10);
            const formatEndTime = endTime.toISOString().slice(0, 10);
            console.log(props.binData.ID_thungrac,'_',formatStartTime,'_',formatEndTime)

            StatisticApi.getImage(props.binData.ID_thungrac, formatStartTime, formatEndTime).then((res: any)=>{
                // const ImageStore: GetImageResponse = props.binData.Khoangrac[index].AnhRac.map( // Ty co API se chinh lai cho nay
                //     item => {
                //         return require(`../images/${item}`)
                //     }
                // )
                console.log(res.data.data[0])
                if(res.data.data[0].AnhRac!==0){
                    const ImageStore1 = res.data.data[0].AnhRac.map( // Ty co API se chinh lai cho nay
                        (item: string) => {

                            return require(`../images/${item}`)
                        }
                    )
                    setImageStore1(ImageStore1);
                }
                if(res.data.data[1].AnhRac!==0){
                    const ImageStore2 = res.data.data[1].AnhRac.map( // Ty co API se chinh lai cho nay
                        (item: string) => {
                            return require(`../images/${item}`)
                        }
                    )
                    setImageStore2(ImageStore2);
                }

                
                if(res.data.data[2].AnhRac!==0){
                    const ImageStore3 = res.data.data[2].AnhRac.map( // Ty co API se chinh lai cho nay
                        (item: string) => {
                            return require(`../images/${item}`)
                        }
                    )
                    setImageStore3(ImageStore3);
                }
                
                if(res.data.data[3].AnhRac!==0){
                    const ImageStore4 = res.data.data[3].AnhRac.map( // Ty co API se chinh lai cho nay
                        (item: string) => {
                            return require(`../images/${item}`)
                        }
                    )
                    setImageStore4(ImageStore4);
                }
                console.log(res.data.data);
                console.log(imageStore1,'-------',imageStore2,'---------',imageStore3,'-----------',imageStore4);
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
    },[startTime,endTime,props.binData])

    useEffect(()=>{
        if(index===0){
            setCurrentData(imageStore1)
        }
        else if(index===1){
            setCurrentData(imageStore2)
        }
        else if(index===2){
            setCurrentData(imageStore3);
        }else{
            setCurrentData(imageStore4)
        }
    },[index,imageStore1,imageStore2,imageStore3,imageStore4])

    

    const onChangeStartTime = (e: any) => {
        setStartTime(e);
        console.log(e)
    }

    const onChangeEndTime = (e: any) => {
        setEndTime(e);
        console.log(e)

    }

    return (
        <div>
            
            <div style={{width:'100%',justifyContent:'space-around'}} className='center-everything'>
                <div className='garbage-type-selector'>
                    <LeftCircleTwoTone style={{margin:'5px',fontSize:'30px',cursor:'pointer'}} onClick={
                        ()=>{
                            if(index>0) setIndex(index-1);
                            else setIndex(garbageType.length-1)
                        }
                    }/>
                    <div className='type-garbage'><p style={{marginTop: "7px",marginBottom: "0px"}}>{garbageType[index]}</p></div>
                    <RightCircleTwoTone style={{margin:'5px',fontSize:'30px',cursor:'pointer'}}  onClick={
                        ()=>{
                            if(index<garbageType.length-1) setIndex(index+1);
                            else setIndex(0)
                        }
                    }/>
                </div>
            </div>
            <div className='garbage-date-picker'>
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
            <div className='list-garbage-image'>
                {
                    currentData &&
                    currentData.map((item)=>{ // Co API se chinh lai data -> imageStore
                        return(
                            <Image style={{width:'100px', margin: '10px', borderRadius: ' 15px'}} src={item}/>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default CGabargeImages