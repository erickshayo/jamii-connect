import { useState, useEffect } from "react";
import {
  Row,
  Col,
  Breadcrumb,
  Badge,
  Dropdown,
  Button,
  Input,
  Drawer,
  Typography,
  Switch,
  Modal,
  Space,
  MenuProps,
  Avatar,
} from "antd";

import { AddressesUrls, usersInfo } from '../../utils/apis';
import { useDataFetch } from '../../hooks/DataHook';
import { selectUserCurretRole } from "../../App/AuthSlice";
import { useSelector } from "react-redux";


import {
  SearchOutlined,
  StarOutlined,
  LogoutOutlined,
  ExclamationCircleOutlined,
  UserOutlined
} from "@ant-design/icons";

import { NavLink } from "react-router-dom";
import modal from 'antd/es/modal';


const toggler = [
  <svg
    width="20"
    height="20"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    key={0}
  >
    <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
  </svg>,
];

const setting = [
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    key={0}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.4892 3.17094C11.1102 1.60969 8.8898 1.60969 8.51078 3.17094C8.26594 4.17949 7.11045 4.65811 6.22416 4.11809C4.85218 3.28212 3.28212 4.85218 4.11809 6.22416C4.65811 7.11045 4.17949 8.26593 3.17094 8.51078C1.60969 8.8898 1.60969 11.1102 3.17094 11.4892C4.17949 11.7341 4.65811 12.8896 4.11809 13.7758C3.28212 15.1478 4.85218 16.7179 6.22417 15.8819C7.11045 15.3419 8.26594 15.8205 8.51078 16.8291C8.8898 18.3903 11.1102 18.3903 11.4892 16.8291C11.7341 15.8205 12.8896 15.3419 13.7758 15.8819C15.1478 16.7179 16.7179 15.1478 15.8819 13.7758C15.3419 12.8896 15.8205 11.7341 16.8291 11.4892C18.3903 11.1102 18.3903 8.8898 16.8291 8.51078C15.8205 8.26593 15.3419 7.11045 15.8819 6.22416C16.7179 4.85218 15.1478 3.28212 13.7758 4.11809C12.8896 4.65811 11.7341 4.17949 11.4892 3.17094ZM10 13C11.6569 13 13 11.6569 13 10C13 8.34315 11.6569 7 10 7C8.34315 7 7 8.34315 7 10C7 11.6569 8.34315 13 10 13Z"
      fill="#111827"
    ></path>
  </svg>,
];

function Header({
  placement,
  name,
  subName,
  onPress,
  handleSidenavColor,
  handleSidenavType,
  handleFixedNavbar,
}) {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => setVisible(true);
  const hideDrawer = () => setVisible(false);
  const [isLoading, setisLoading] = useState(false);
  const [address, setaddress] = useState(null);
  const fetcher = useDataFetch();
  const [userInfo, setuserInfo] = useState();
  const role = useSelector(selectUserCurretRole);

  useEffect(() => window.scrollTo(0, 0), []);

  const loadData = async () => {
    const userId = localStorage.getItem("crusr_id");
    try {
      setisLoading(true);
      const userResponse = await fetcher.fetch({ url: `${usersInfo.usersInfo}?queryType=single&&user_id=${userId}` });
      setuserInfo(userResponse);
      const addressResponse = await fetcher.fetch({ url: `${AddressesUrls.addrss}?queryType=single&&userId=${userResponse?.id}` });

      if (userResponse) {
        setuserInfo(userResponse);
      }

      if (addressResponse) {
        setaddress(addressResponse);
      }

      setisLoading(false);
    } catch (error) {
      setisLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const items = [
    {
      key: "1",
      label: (
        <a target="_blank" rel="noopener noreferrer" href="#">
          {userInfo?.username}
        </a>
      ),
    },
    {
      key: "2",
      label: (
        role !== "ctzn" && 
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          Admin
        </a>
      ),
      icon: <StarOutlined />,
      disabled: true,
    },
    {
      key: "4",
      danger: true,
      icon: <LogoutOutlined />,
      label: "Log out",
      onClick: () => {
        modal.confirm({
          title: 'Confirm',
          icon: <ExclamationCircleOutlined />,
          content: 'Log out from Jamii connect',
          okText: 'OK',
          okType: "danger",
          cancelText: 'cancel',
          onOk: () => {
            localStorage.clear();
            window.location.reload();
          }
        });
      }
    },
  ];

  return (
    <>
      <div className="setting-drawer" onClick={showDrawer}>
        {setting}
      </div>
      <Row gutter={[24, 0]}>
        <Col span={24} md={6}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <NavLink to="/">Pages</NavLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item style={{ textTransform: "capitalize" }}>
              {name.replace("/", "")}
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="ant-page-header-heading">
            <span
              className="ant-page-header-heading-title"
              style={{ textTransform: "capitalize" }}
            >
              {subName.replace("/", "")}
            </span>
          </div>
        </Col>
        <Col span={24} md={18} className="header-control">
          <Button
            type="link"
            className="sidebar-toggler"
            onClick={() => onPress()}
          >
            {toggler}
          </Button>
          <span className="flex flex-col text-white">
            <p className='text-xs font-semibold'>{userInfo?.email}</p>
            { role == "Adm" ?  <p className='text-xs'>System admin</p>: role == "ldr" ?  <p className='text-xs'>Address leader</p>: <p className='text-xs'>Citizen</p> }
          </span>
          <Dropdown menu={{ items }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Avatar style={{ backgroundColor: '#87d068', cursor: 'pointer' }} icon={<UserOutlined />} size={40} />
              </Space>
            </a>
          </Dropdown>
          <Input
            className="header-search"
            placeholder="Type here..."
            prefix={<SearchOutlined />}
          />
        </Col>
      </Row>
    </>
  );
}

export default Header;
