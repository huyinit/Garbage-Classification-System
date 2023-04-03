/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { Button, Checkbox, Form, Image, Input, notification } from 'antd'
// import Logo from "../../image/logo.png";
import Forgot_Password from "../../images/forgot_password.png"
// import AppleIcon from "../../image/AppleIcon.png"
// import FacebookIcon from "../../image/FacebookIcon.png"
// import GoogleIcon from "../../image/GoogleIcon.png"
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
// import './style.css'
import { LoginRequest } from '../../common/define-identity';
import "antd/dist/antd.css";
import "../../App.scss";
import IdentityApi from '../../api/identity/identity.api';
export default function Login(): JSX.Element {
    const [rememberState,setRememberState] = useState<boolean>(false);
    const history = useHistory();
    // const dispatch = useDispatchRoot();
    // const isSuccess = useSelectorRoot(state => (state.login.statusCode));
    // useEffect( () => {
        
    //     const userToken = localStorage.getItem('token');
    //     console.log(isSuccess)
    //     if(isSuccess === "OK" && userToken !== null && userToken !== undefined){
    //         history.push('/calendar')
    //     }
    //     if(isSuccess !== "OK" && userToken !== null && userToken !== undefined){
    //         dispatch(checkAbleToLogin("OK"));
    //         history.push('/calendar')
    //     }
        
    // },[isSuccess])
    
    const onFinish = async (account: LoginRequest): Promise<any> =>  {
        account.remember=rememberState;
        IdentityApi.login(account).then((res: any) => {
            console.log(res)
        }).catch((err: any)=>{console.log(err)});
        
        history.push('/home')
        
    } 

    function onFinishFailed () {

    }

    return (
        <div>
            <div style={{marginTop: "113.14px", marginLeft: "138px", marginBottom: "45.08px"}}>
            {/* <Image preview={false} className='logo' src={Logo} alt="Logo" /> */}
            </div>
            <div style={{ marginLeft: "138px",marginRight: "118px", display: "flex", justifyContent: "space-between"}}>
            <div>
                <div style={{width: "220px",height: "56px",fontSize: "40px",letterSpacing: "0.5px", marginBottom:"30.6px"}}><b>Đăng nhập</b></div>
                <Form
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout='vertical'
                    size='large'
                >
                <Form.Item
                    label="Account"
                    name="account"
                    rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập tài khoản!',
                    }
                    ]}
                >
                    <Input style={{borderRadius: "9px", width: "458px", height: "56.99px"}}/>
                </Form.Item>

                <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập mật khẩu!',
                    },
                    ]}
                >
                    <Input.Password type='password' style={{borderRadius: "9px",width: "458px", height: "56.99px"}}/>
                </Form.Item>

                <Form.Item
                    name="remember"
                    className='ml-0'
                >
                    <Checkbox onChange={()=> setRememberState(!rememberState)}>Nhớ mật khẩu</Checkbox>
                </Form.Item>


                <Form.Item
                    
                >
                    <Button type="primary" htmlType="submit" style={{borderRadius: "9px",fontSize: "20px", backgroundColor:"#6265FF", width: "458px", height: "56.99px"}}>
                    <b>Đăng nhập</b>
                    </Button>
                </Form.Item>
                </Form>
                {/* <div style={{textAlign: "center",width: "458px", height: "56.99px"}}>
                <a style={{color: "#6265FF"}}>Quên mật khẩu</a>
                </div>
                <div style={{marginTop: "10px", fontSize: "30px"}}>
                <div style={{color: "#CBCBCB"}}><b>Hoặc</b></div>
                <div>
                    <Image preview={false} src={FacebookIcon}/>
                    <Image preview={false} src={GoogleIcon}/>
                    <Image preview={false} src={AppleIcon}/>
                </div> */}
                <div style={{fontSize: "20px"}}>
                    <span>Bạn chưa có tài khoản?  </span>
                    <span><a style={{color: "#6265FF"}}>Đăng ký</a></span>
                </div>
                {/* </div> */}
            </div>
            <div>
                <Image preview={false} src={Forgot_Password}/>
            </div>
            </div>
        </div>
    )
}
