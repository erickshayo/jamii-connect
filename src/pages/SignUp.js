
import {

  UserOutlined,
  WeiboOutlined,
  GoogleOutlined,
  LockOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import {
    Button,
    Divider,
    Form,
    Input,
    Space,
    App,
    Layout, Checkbox,
} from "antd";
import React, {useEffect} from 'react';
import { useState } from "react";
import { Colors } from "../constants/Colors";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useFormPost } from "../hooks/FormDataHoook";
import { authUrls } from "../utils/apis";


const { Content, Sider } = Layout;




const onFinish = (values) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};


export default function SignUp() {
  const [loginType, setLoginType] = useState("phone");
  const [isloading, setisloading] = useState(false);
  const [nidaInfo, setnidaInfo] = useState();
  // const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState();
  const [sovereignty, setsovereignty] = useState("warning");
  const history = useHistory();

  const formPost = useFormPost();

  const fetchNidaInfo = async (values) => {
    console.log(values)
    try {
      const response = await axios.get(`http://localhost:8000/auth/nin_info?nida=${values.nida}`);
      console.log(response);
      if (response?.status === 200) {
      setnidaInfo(response?.data?.user_info);
      }
      else{
        setErrorMsg("Failed to fetch Nida Info Check Your Network and try Again")
        throw new Error('Failed to fetch user information');
      }
     
    } catch (error) {
      setErrorMsg("Failed to fetch Nida Info Check Your Network and try Again")
      console.error(error);
    }
  };


    useEffect(() => {

        const handleResize = () => {
            const screenWidth = window.innerWidth;
            const leftSide = document.querySelector('.left-side');

            if (screenWidth < 768) {
                leftSide.style.display = 'none';
            } else {
                leftSide.style.display = 'block';
            }
        };



        handleResize();
        window.addEventListener('resize', handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


  const onFinish = async (values) => {
      localStorage.clear()
    setisloading(true);
    try {
      // const response = await userLogin({
      //   variables: {
      //     username: values.username,
      //     password: values.password,
      //   },
      // });
      //  console.log(response);

      // const { error, user, token } = response.data?.login;

    } catch (error) {
      setsovereignty("error");
      setErrorMsg(error.message);
    }
    setisloading(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleSubmit = async (values) => {
    const body = {
      username: nidaInfo.Firstname + nidaInfo.Lastname,
      fname:nidaInfo.Firstname,
      lname:nidaInfo.Lastname,
      email: values.email,
      gender: nidaInfo.Gender,
      phone_number: values.phone_number,
      role: 3,
      nin_number: nidaInfo.nida,
      username: values.username,
      password: values.password
    };
    setisloading(true)
    try {

      const response = await formPost.post({
        url: authUrls.userLogin,
        data: body,
        login:true
      });



      if (response) {
      } else {
      }


    } catch (error) {
        
      if (!error?.respose) {
        setErrorMsg("No server respose or invalid login credentials try again!");
      } else if (error.respose?.status === 400) {
        setErrorMsg("incorrect password or email ");
      } else {
        setErrorMsg("login failed try again later");
      }
    }
    setisloading(false)
  };


  return (

      <Layout style={{ minHeight: '100vh' }}>
          <Sider
              width={500}
              style={{
                  background: "darkgray",
                  color: '#fff',
                  padding: '20px',
                  textAlign: 'center',
                  borderTopRightRadius: '20px',
                  borderBottomRightRadius: '20px',
              }}
              className="left-side"
          >
            <div className="ml-24">
            {/* <Lottie
                 animationData={lott}
                  height={500}
                  width={500}
                 loop={true}
              /> */}
            </div>
              {/* Add aligned content about the digital scale */}
              <div style={{ marginTop: '2px' }}>
                  <h1>e-Mzani</h1>
                  <h3>A bluetooth enabled digital scale</h3>
                  <p>Measure everything with precision.</p>
              </div>
          </Sider>
          <Content
              style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderTopLeftRadius: '20px',
                  borderBottomLeftRadius: '20px',
              }}
          >
          <div className="w-2/3">
              <div className="fl">
                  <h1 className="text-xl font-bold text-center">e-Mzani</h1>
                  <Divider plain>
                  <span
                      style={{
                          color: "#CCC",
                          fontWeight: "normal",
                          fontSize: 14,
                      }}
                  >
                    Create a new Account
                  </span>
                  </Divider>
              </div>
              {nidaInfo && (
        <div>
          <h2>User Detail</h2>
          <p>Name: {nidaInfo?.Firstname}</p>
          <p>Email: {nidaInfo?.Firstname}</p>
          {/* Add more fields as needed */}
        </div>
      )}
              {
                nidaInfo? <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                className="row-col"
            >
                <div className="">
                    {errorMsg && (
                        <h3 className="text-lg text-red-800 text-center whitespace-pre-wrap">
                            {errorMsg}!!
                        </h3>
                    )}
                </div>
                <Form.Item
                    className="username"
                    label="Email"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Please input your email!",
                        },
                    ]}
                >
                    <Input placeholder="Email" type="email" className="" />
                </Form.Item>
                <Form.Item
                    className="username"
                    label="Phone No"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Please input your email!",
                        },
                    ]}
                >
                    <Input placeholder="Phone No" type="tel" className="" />
                </Form.Item>

                <Form.Item
                    className="username h-10"
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}
                >
                    <Input type="password" className="" addonAfter={<LockOutlined/>}/>
                </Form.Item>

                <Form.Item
                    name="remember"
                    className="aligin-center mt-10"
                    valuePropName="checked"
                >
                    <Checkbox
                        defaultChecked
                        // style={{ backgroundColor: Colors.primary }}
                    />
                    Remember me
                </Form.Item>

                <Form.Item>
                    {isloading ? (
                        <Button
                            style={{ width: "100%", backgroundColor:Colors.primary }}
                            type="primary"
                            htmlType="submit"
                            loading
                        >
                            Signing in...
                        </Button>
                    ) : (
                        <Button
                            style={{ width: "100%", backgroundColor:Colors.primary  }}
                            type="primary"
                            htmlType="submit"
                        >
                            SIGN UP
                        </Button>
                    )}
                </Form.Item>
                <p className="font-semibold text-muted">
                    Have an account?{" "}
                    <a href="/sign-up" className="text-dark font-bold">
                        Sign In
                    </a>
                </p>
            </Form>:
            <Form
            onFinish={fetchNidaInfo}
            onFinishFailed={onFinishFailed}
            layout="vertical"
            className="row-col"
        >
            <div className="">
                {errorMsg && (
                    <h3 className="text-lg text-red-800 text-center whitespace-pre-wrap">
                        {errorMsg}!!
                    </h3>
                )}
            </div>

            <Form.Item
                className="username"
                label="Nida No."
                name="nida"
                rules={[
                    {
                        required: true,
                        message: "Please input your nida no!",
                    },
                ]}
            >
                <Input type="number" className="" addonAfter={<CreditCardOutlined/>}/>
            </Form.Item>


            <Form.Item>
                {isloading ? (
                    <Button
                        style={{ width: "100%", backgroundColor:Colors.primary }}
                        type="primary"
                        htmlType="submit"
                        loading
                    >
                        Fetching...
                    </Button>
                ) : (
                    <Button
                        style={{ width: "100%", backgroundColor:Colors.primary  }}
                        type="primary"
                        htmlType="submit"
                    >
                        Fetch Nida Info
                    </Button>
                )}
            </Form.Item>
       
        </Form>
              }
              
              <div
                  style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                  }}
              >
                  <Divider plain>
                  <span
                      style={{
                          color: "#CCC",
                          fontWeight: "normal",
                          fontSize: 14,
                      }}
                  >
                    Sign in with
                  </span>
                  </Divider>
                  <Space align="center" size={24}>
                      <div
                          style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              flexDirection: "column",
                              height: 40,
                              width: 40,
                              border: "1px solid #D4D8DD",
                              borderRadius: "50%",
                          }}
                      >
                          <GoogleOutlined
                              style={{ color: "#1677FF" }}
                          />
                      </div>
                      <div
                          style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              flexDirection: "column",
                              height: 40,
                              width: 40,
                              border: "1px solid #D4D8DD",
                              borderRadius: "50%",
                          }}
                      >
                          <UserOutlined style={{ color: "#FF6A10" }} />
                      </div>
                      <div
                          style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              flexDirection: "column",
                              height: 40,
                              width: 40,
                              border: "1px solid #D4D8DD",
                              borderRadius: "50%",
                          }}
                      >
                          <WeiboOutlined
                              style={{  color: "#333333" }}
                          />
                      </div>
                  </Space>
              </div>
          </div>
          </Content>
      </Layout>
  );
}
