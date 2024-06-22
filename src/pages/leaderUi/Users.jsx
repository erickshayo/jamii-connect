import React, {useState, useEffect} from 'react';
import { useDataFetch } from '../../hooks/DataHook';
import { AddressesUrls, usersInfo } from '../../utils/apis';
import { useNavigate } from 'react-router-dom';
import Column from "antd/es/table/Column";
import modal from "antd/es/modal";
import { message } from 'antd';
import { Avatar, Button, Card, Radio, Table, Badge, Menu, Dropdown,Input ,Modal,Select} from "antd";
import { UserOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { baseUrl } from '../../utils/BaseUrl';
import { renderDateTime } from '../Addresses';

const Users = () => {
    const [isLoading, setisLoading] = useState(false);
    const [addressessAdm, setaddressessAdm] = useState([]);
    const addressessAdmSNo = addressessAdm.map((item, index) => ({
      ...item,
      sNo: index + 1,
    }));
    const [searchValue, setSearchValue] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedRole, setSelectedRole] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [address, setaddress] = useState(null);
    const fetcher = useDataFetch()
    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchValue(value);
        const filtered = addressessAdmSNo.filter(user =>
          user.lname.toLowerCase().includes(value.toLowerCase()) ||
          user.fname.toLowerCase().includes(value.toLowerCase()) ||
          user.phone_number.includes(value) ||
          user.email.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredData(filtered);
      };

      const loadData = async () => {
        const userId = localStorage.getItem("crusr_id")
        try {
          setisLoading(true);
          const userRespose = await fetcher.fetch({ url: usersInfo.usersInfo + `?queryType=single&&user_id=${userId}` });
          const res = await fetcher.fetch({ url: AddressesUrls.addrss + `?queryType=single&&userId=${userRespose?.id}` })
          console.log(res);
          if (res) {
                      setaddress(res);
          const response = await fetcher.fetch({
            url: AddressesUrls.addressUser + `?queryType=single&&addressId=${res?.id}`,
          });
          console.log(response);
            setaddressessAdm(response)
          }

          setisLoading(false);
        } catch (error) {
          setisLoading(false);
        }
      };

      useEffect(() => {
        loadData();
      }, []);

      const handleView = (id) => {
        // navigate('/address_details/' + `${id}`);
      };
   
      const handleDelete = (id) => {
       
          modal.confirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined />,
            content: 'Delete this Address ',
            okText: 'OK',
            okType:"danger",
            cancelText: 'cancel',
            onOk:() => {
              
            }
          });
        console.log(`Edit action for ID: ${id}`);
      };
    
      const ActionDropdown = ({ id }) => {
        const handleItemClick = (action) => {
          switch (action) {
            case 'edit':
              handleView(id);
              break;
            case 'delete':
              handleDelete(id);
              break;
            case 'changeRole':
            //   handleRoleChange(id);
              break;
            default:
              break;
          }
        };

        const handleRoleChange = (id) => {
            setSelectedUser(id);
            setIsModalVisible(true);
          };

        const menu = (
          <Menu>
           <Menu.Item key="view" onClick={() => handleItemClick('edit')}>Edit</Menu.Item>
        <Menu.Item key="delete" onClick={() => handleItemClick('delete')}>Delete</Menu.Item>
        <Menu.Item key="changeRole" onClick={() => handleItemClick('changeRole')}>Change Role</Menu.Item>
          </Menu>
        );
    
        return (
          <Dropdown overlay={menu} placement="bottomLeft">
            <Button>Action</Button>
          </Dropdown>
        );
    
      }
    
  return (
    <div>
         <Card
        bordered={true}
        className=" w-full overflow-hidden"
        title={`Citizens at ${address?.name}`}
      >
        <div>
        <Input
          placeholder="Search users"
          value={searchValue}
          onChange={handleSearch}
          style={{ marginBottom: '20px', width: '300px' }}
        />
        <Table
          dataSource={addressessAdmSNo}
          className="table-responsive w-full"
          loading={isLoading}
        >
            <Column
              title="S/No"
              dataIndex="sNo"
              sorter={(a, b) => a.sNo - b.sNo}
            />
            <Column
              title="Name"
              dataIndex="userId"
              key="userId"
              render={(data) => <div>{data.fname}</div>}
            />
            
            <Column
              title="First Name"
              dataIndex="userId"
              key="userId"
              render={(data) => <div>{data.lname}</div>}
            />
            <Column title="Phone number" 
            dataIndex="userId"
            key="userId"
            render={(data) => <div>{data.phone_number}</div>}
            />
            <Column
              title="Email"
              dataIndex="userId"
              key="userId"
              render={(data) => <div>{data.email}</div>}
             
            />
             
             <Column
              title="Created at"
              dataIndex="createdAt"
              key="createdAt"
              render={(date) => <div>{renderDateTime(date)}</div>}
            />
            <Column
              title="Nida number"
              dataIndex="userId"
              key="userId"
              render={(data) => <div>{data.nin_number}</div>}
            />
            <Column
              dataIndex="id"
              key="id"
              render={(id) => (
                <div>
                  <ActionDropdown id={id} />
                </div>
              )}
            />
          </Table>
        </div>
      </Card>
    </div>
  )
}

export default Users

