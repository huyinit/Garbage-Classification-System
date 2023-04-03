import React, { useEffect, useState } from 'react'
import {
    MenuOutlined,
  UserOutlined
} from '@ant-design/icons';
import "antd/dist/antd.css";
import "../../App.scss";
import { Button, Dropdown, Menu, notification, Select, Switch } from 'antd';
import CChart from '../../components/CChart';
import { useHistory } from 'react-router-dom';
import CProgressionBar from '../../components/CProgressionBar';
import CGabargeImages from '../../components/CGabargeImages';
import StatisticApi from '../../api/statistic/statistic.api';
import { BinData, CompartmentData } from '../../common/define-type';
import { Option } from 'antd/lib/mentions';
import MainBackground from '../../images/mainBackground.webp'

const Home = () => {

    const [visible, setVisible] = useState<boolean>(false);
    // const [isOnModal,setIsOnModal] = useState<boolean>(false);
    const [allBinData,setAllBinData] = useState<BinData[]>([]);//Dữ liệu của tất cả các thùng rác
    const [binData,setBinData] = useState<BinData>(); // Dữ liệu của 1 thung rac vao thoi diem hien tai
    const [binId,setBinId] = useState<string>();
    const [loading,setLoading] = useState(true);
    const [BinDataByDay,setBinDataByDay] = useState();
    const history = useHistory();



    useEffect(()=>{ // Lay tat ca thong tin thung rac khi moi vao trang chu
        getAllBinData()
    },[])


    const getAllBinData = () => {
        setLoading(true);
        StatisticApi.getAllBinData().then((res: any)=>{
            console.log(res);
            console.log(res.data.listkhuvuc);
            console.log('-----------suc2---------')

            setAllBinData(res.data.listkhuvuc);
            setBinData(allBinData[0]);
            setLoading(false);
            console.log(allBinData)
        })
    }

    const handleMenuClick = (e: any) => {
        if (e.key === '1' || e.key === '2') {
            setVisible(false);
        }
    };

    const resetHandle = async (binId: string, compartmentId: string) => {
        await StatisticApi.resetBinById(binId, compartmentId).then((res: any)=>{ // Reset luong rac trong thung co ID nhat dinh
            console.log('-----------suc1---------')
            notification.open({
                    message: 'Reset luong rac trong khoang thanh cong',
                    // description:
                    // 'Vui long kiem tra lai ket noi mang',
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                });
            }
        )

        getAllBinData()
    }   

    // const toggle = () => {
    //     setIsOnModal(!isOnModal);
    // };

    const handleVisibleChange = (flag: boolean) => {
        setVisible(flag);
    };

    const handleChange = (choseBinID: string) => { // Tim ra thung rac co ID giong voi thung rac duoc chon trong o Select
        console.log(`selected ${choseBinID}`);
        setBinData(undefined)
        if(allBinData){
            const choseBin = allBinData.find((item) => item.ID_thungrac===choseBinID)
            setBinData(choseBin)
        }
        // setBinData(allBinData[parseInt(choseBinID)])
        setBinId(choseBinID);
    };

    useEffect(()=>{
        console.log(loading)
        console.log(allBinData)
        console.log(binData)
    },[loading])


    return (
        <div className='body'>
            <div>
                <div className='main-title color-title'>HỆ THỐNG IOT NHẬN DIỆN RÁC THẢI</div>
                <div className='main-title color-title'>From team 15 with love</div>
            </div>
            {
                !loading && 
                <div className='body-content'>
                    <div className='account'>
                        <UserOutlined />
                        <div style={{margin:'10px'}}>
                            Hello, Hieudz
                        </div>
                        <Dropdown 
                            onVisibleChange={handleVisibleChange} 
                            visible={visible}
                            overlay={
                            <Menu
                            onClick={handleMenuClick}
                                items={[
                                {
                                    key: '1',
                                    label: (
                                    <div>
                                        <a target="_blank" rel="noopener noreferrer" >
                                            Cài đặt tài khoản
                                        </a>
                                    </div>
                                    
                                    ),
                                },
                                {
                                    key: '2',
                                    label: (
                                    <div>
                                        <a onClick={()=>{
                                        // setIsOnModal(true);
                                        // history.push("/register")
                                        }}>
                                            Tạo tài khoản mới 
                                        </a>
                                    </div>
                                    ),
                                },
                                {
                                    key: '3',
                                    label: (
                                    <div className='flex-row'>
                                        <p>
                                            Theme
                                        </p>
                                        <Switch checkedChildren="Sáng" unCheckedChildren="Tối" defaultChecked />
                                    </div>
                                    ),
                                },
                                {
                                    type: "divider",
                                },
                                {
                                    key: '4',
                                    label: (
                                    <a  onClick={()=>{
                                        localStorage.removeItem('token');
                                        localStorage.removeItem('user');

                                        
                                        // history.push('/');
                                        // window.location.reload();
                                    }}>
                                        Đăng xuất
                                    </a>
                                    ),
                                },
                                
                                ]}
                            />
                            } 
                            // placement="topCenter" 
                            arrow 
                            trigger={["click"]}

                        >
                            <div style={{marginBottom: '6px'}} onClick={(e) => e.preventDefault()}><MenuOutlined /></div>
                        </Dropdown>
                        <Select
                            placeholder="Lua chon thung rac"
                            style={{ width: 200 }}
                            onChange={handleChange}
                            className='main-selector'
                        >
                            {   
                                allBinData.length>0 && 
                                allBinData?.map((index) => (
                                    <Option value={index.ID_thungrac}>{index.ViTriThungRac}</Option> // Lua chon thung rac
                                ))
                            }
                        </Select>
                    </div>
                    {
                        binId ?
                        <div className='statistic'>
                            <div>
                                
                                <CChart // Bieu do the hien 
                                    setBinData={setBinData}
                                    binData={binData}
                                    binId = {binId}
                                />
                            </div>
                            <div className='progression-bar-group'>
                                <div>Lượng rác hiện tại có trong thùng:</div>
                                {
                                    binData ?
                                    binData.Khoangrac.map((item: CompartmentData,index)=>{
                                        return(
                                            <CProgressionBar
                                                ordinal={index}
                                                BinData={binData}
                                                CompartmentData={item}
                                                resetHandle={resetHandle}
                                            />
                                        )
                                    }) : 
                                    <div className='unselected-data-notification'>Vui long chon khu vuc de xem luong rac hien tai: </div>
                                }
                                
                                
                            </div>
                        </div> : 
                        <div style={{marginLeft:'38%'}}>Vui long chon thung rac de xem luong rac tuong ung</div>
                    }
                        
                </div>
            }
            <div className='body-content'>
                {
                    binData &&
                    <CGabargeImages
                        binData={binData}
                    />
                }

            </div>
        </div>
    )
}

export default Home