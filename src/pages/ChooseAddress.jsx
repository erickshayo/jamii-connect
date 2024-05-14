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
    Layout,
    Checkbox,
    Select
  } from "antd";
  import React, { useEffect } from "react";
  import { useState } from "react";
  import { Colors } from "../constants/Colors";
  import { useNavigate,useLocation } from "react-router-dom";
  import axios from "axios";
  import { useFormPost } from "../hooks/FormDataHoook";
  import { authUrls } from "../utils/apis";
  import swal from "sweetalert";

  
const { Content, Sider } = Layout;


const ChooseAddress = () => {
    const [loginType, setLoginType] = useState("phone");
    const location = useLocation();
    const [isloading, setisloading] = useState(false);
    const addressDetail = location?.state?.record;
    const [errorMsg, setErrorMsg] = useState();
    const [sovereignty, setsovereignty] = useState("warning");
    const navigate = useNavigate();
  
    const formPost = useFormPost();

    useEffect(() => {
        const handleResize = () => {
          const screenWidth = window.innerWidth;
          const leftSide = document.querySelector(".left-side");
    
          if (screenWidth < 768) {
            leftSide.style.display = "none";
          } else {
            leftSide.style.display = "block";
          }
        };
    
        handleResize();
        window.addEventListener("resize", handleResize);
    
        // Clean up the event listener when the component unmounts
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);

      const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
      };
    
      const handleSubmit = async (values) => {
        console.log(values);
        const body = {
    
        };
        setisloading(true);
        
        try {
          const response = await formPost.post({
            url: authUrls.register,
            data: body,
            login: true,
          });
    
          if (response?.save) {
            swal({
              title: "Success",
              text: "Address added successfully!",
              icon: "success",
              button: "OK",
            });
            navigate("/sign-in");
          } else {
          }
        } catch (error) {
          if (!error?.respose) {
            setErrorMsg(
              "No server respose  try again!"
            );
          } else if (error.respose?.status === 400) {
            setErrorMsg("No server respose try again! ");
          } else {
            setErrorMsg("No server respose try again!");
          }
        }
        setisloading(false);
      };

  return (
    <div>
          <Layout style={{ minHeight: "100vh" }}>
      <Sider
        width={500}
        style={{
          background: "darkgray",
          color: "#fff",
          padding: "20px",
          textAlign: "center",
          borderTopRightRadius: "20px",
          borderBottomRightRadius: "20px",
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
        <div style={{ marginTop: "2px" }}>
          <h1>Jamii - Connect</h1>
          <h3>A bluetooth enabled digital scale</h3>
          <p>Measure everything with precision.</p>
        </div>
      </Sider>
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderTopLeftRadius: "20px",
          borderBottomLeftRadius: "20px",
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
                Create a new Account
              </span>
            </Divider>
          </div>
   
            <Form
              onFinish={handleSubmit}
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
                label=""
                name="nida"
                rules={[
                  {
                    required: true,
                    message: "Please input your nida no!",
                  },
                ]}
              >
                <Select>
                    <Select.Option>
                        
                    </Select.Option>
                </Select>
              </Form.Item>

              <Form.Item>
                {isloading ? (
                  <Button
                    style={{ width: "100%", backgroundColor: Colors.primary }}
                    type="primary"
                    htmlType="submit"
                    loading
                  >
                    Add address...
                  </Button>
                ) : (
                  <Button
                    style={{ width: "100%", backgroundColor: Colors.primary }}
                    type="primary"
                    htmlType="submit"
                  >
                    Add an Address
                  </Button>
                )}
              </Form.Item>
            </Form>


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
                <GoogleOutlined style={{ color: "#1677FF" }} />
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
                <WeiboOutlined style={{ color: "#333333" }} />
              </div>
            </Space>
          </div>
        </div>
      </Content>
    </Layout>
    </div>
  )
}

export default ChooseAddress