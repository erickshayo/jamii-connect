
import {

  UserOutlined,
  WeiboOutlined,
  GoogleOutlined,
  LockOutlined,
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
import { useNavigate } from "react-router-dom";
import { useFormPost } from "../hooks/FormDataHoook";
import { useDispatch } from "react-redux";
import { loginAuth } from "../App/AuthSlice";
import { authUrls } from "../utils/apis";
import signin from "../assets/images/jamii_2.jpg"
const { Content, Sider } = Layout;




const onFinish = (values) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};


export default function LoginPage() {
  const [loginType, setLoginType] = useState("phone");
  const [isloading, setisloading] = useState(false);
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState();
  const [sovereignty, setsovereignty] = useState("warning");
  const navigate = useNavigate();
  const formPost = useFormPost();


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
    const body = {
        phone_number: values.phone,
        password: values.password
      };
    try {
        const response = await formPost.post({
            url: authUrls.login,
            data: body,
            login:true
          });
       console.log(response);

       if (response.success) {
        const localStorageUser = {id:response.user, role:response.user.role}

        const role = response?.user.role  == 1 ? "Adm": response?.user.role  == 2 ? "ldr":"ctzn";
    
        localStorage.setItem("user", JSON.stringify(localStorageUser));
        localStorage.setItem("user", JSON.stringify(localStorageUser));
        localStorage.setItem("crusr_id", response.user.id);
        const userdata = {user:response.user, token:response.token, role: role}
        localStorage.setItem("token", response.token);
        localStorage.setItem('ussrCrrl', role)
        dispatch(loginAuth({ ...userdata }));
 
        navigate("/");
       }else{
        setErrorMsg("incorrect password or phone ");
       }
      // const { error, user, token } = response.data?.login;

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
    }
   


  


  return (

      <Layout style={{ minHeight: '100vh' }}>
          <Sider
              width={500}
              style={{
                  background: "white",
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
              <div style={{ marginTop: '100px' }}>
                  <h1 >Jamii - Connect</h1>
                  {/* <h3>A bluetooth enabled digital scale</h3>
                  <p>Measure everything with precision.</p> */}
                  <div className="d-flex justify-content-center pt-24 pb-3 rounded">
                    <img src={signin} alt="mastercard" />
                    </div>
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
                  <h1 className="text-xl font-bold text-center">Jamii - Connect</h1>
                  <Divider plain>
                  <span
                      style={{
                          color: "#CCC",
                          fontWeight: "normal",
                          fontSize: 14,
                      }}
                  >
                    Sign in to your account
                  </span>
                  </Divider>
              </div>

              <Form
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
                      label="Phone"
                      name="phone"
                      rules={[
                          {
                              required: true,
                              message: "Please input your email!",
                          },
                      ]}
                  >
                      <Input placeholder="Phone" type="tel" className="" />
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
                              SIGN IN
                          </Button>
                      )}
                  </Form.Item>
                  <p className="font-semibold text-muted"> 
                      Don't have an account?{" "}
                      <a href="/sign-up" className="text-dark font-bold">
                          Sign Up
                      </a>
                  </p>
              </Form>
              {/* <div
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
              </div> */}
          </div>
          </Content>
      </Layout>
  );
}
