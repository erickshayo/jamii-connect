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

export const renderDateTime = (dateString) => {
    const dateTime = new Date(dateString);
    return dateTime.toLocaleDateString();
  };

const Users = () => {
const fetcher = useDataFetch();
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
  console.log(addressessAdmSNo[0]?.userId);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    const filtered = addressessAdmSNo.filter(user =>
      user?.lname?.toLowerCase().includes(value.toLowerCase()) ||
      user?.fname?.toLowerCase().includes(value.toLowerCase()) ||
      user?.phone_number.includes(value) ||
      user?.email?.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleModalOk = async () => {
    try {
      const response = await fetch(`${baseUrl}/auth/user/${selectedUser}/change-role/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        //   'X-CSRFToken': getCookie('csrftoken'),  
        },
        body: JSON.stringify({ role: selectedRole }),
      });
      if (response.ok) {
        message.success('User role updated successfully');
        loadData();
      } else {
        message.error('Failed to update user role');
      }
    } catch (error) {
        console.log(error);
      message.error('Failed to update user role');
    }
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };
  
  const navigate = useNavigate();

    const loadData = async () => {
        try {
          setisLoading(true);
          const response = await fetcher.fetch({
            url: usersInfo.usersInfo + `?queryType=all`,
          });


          if (response) {
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
        navigate('/address_details/' + `${id}`);
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
              handleRoleChange(id);
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
        title="System users"
      >
        <div>
        <Input
          placeholder="Search users"
          value={searchValue}
          onChange={handleSearch}
          style={{ marginBottom: '20px', width: '300px' }}
        />
        <Table
          dataSource={searchValue === ''? addressessAdmSNo:filteredData}
          className="table-responsive w-full"
          loading={isLoading}
        >
            <Column
              title="S/No"
              dataIndex="sNo"
              sorter={(a, b) => a.sNo - b.sNo}
            />
            <Column
              title="Last Name"
              dataIndex="lname"
              key="lname"
            />
            
            <Column
              title="First Name"
              dataIndex="fname"
              key="fname"
             
            />
            <Column title="Phone Number" key="phone_number"
         dataIndex="phone_number"

            />
            <Column
              title="Email"
              dataIndex="email"
              key="email"
             
            />
               <Table.Column title="Role" dataIndex="role" key="role" 
               render={(data) => <div>{data == 1? "system admin": data == 2 ? "Leader" : "Citizen"}</div>}
               />
           
            <Column
              title="NIDA Number"
              dataIndex="nin_number"
              key="nin_number"
            //   render={(data) => (
            //     <div>
            //     <Badge color="green">{data}</Badge>
            //     </div>
            //   )}
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
      <Modal
        title="Change User Role"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Select
          value={selectedRole}
          onChange={setSelectedRole}
          style={{ width: '100%' }}
          placeholder="Select new role"
        >
          <Select.Option value={1}>System admin</Select.Option>
          <Select.Option value={2}>Community leader</Select.Option>
          <Select.Option value={3}>Citizen</Select.Option>
        </Select>
      </Modal>

    
    </div>
  )
}

export default Users