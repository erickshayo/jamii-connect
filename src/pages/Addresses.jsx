import React, {useState, useEffect} from 'react';
import { useDataFetch } from '../hooks/DataHook';
import { AddressesUrls,usersInfo } from '../utils/apis';
import { useNavigate } from 'react-router-dom';
import Column from "antd/es/table/Column";
import modal from "antd/es/modal";
import { Avatar, Button, Card, Radio, Table, Badge, Menu, Dropdown,Modal,Form, message, Input, Select } from "antd";
import { UserOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { useFormPost } from '../hooks/FormDataHoook';

export const renderDateTime = (dateString) => {
    const dateTime = new Date(dateString);
    return dateTime.toLocaleDateString();
  };

const Addresses = () => {
const fetcher = useDataFetch();
  const [isLoading, setisLoading] = useState(false);
  const [addressessAdm, setaddressessAdm] = useState([]);
  const [leaders, setLeaders] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const formPost = useFormPost();
  const [newAddress, setNewAddress] = useState({ name: '', postalCode: '', admin: '' });
  const addressessAdmSNo = addressessAdm.map((item, index) => ({
    ...item,
    sNo: index + 1,
  }));
  
  const navigate = useNavigate();


  const loadLeaders = async () => {
    try {
      const response = await fetcher.fetch({
        url: usersInfo.usersInfo + `?queryType=all&role=2`, // Assuming role 2 is for leaders
      });
      if (response) {
        setLeaders(response);
      }
    } catch (error) {
      console.error('Failed to load leaders:', error);
    }
  };

    const loadData = async () => {
        try {
          setisLoading(true);
          const response = await fetcher.fetch({
            url: AddressesUrls.addrss + `?queryType=all`,
          });
          console.log(response);

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
        loadLeaders();
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
    
      const ActionDropdown = ({ id}) => {
        const handleItemClick = (action) => {
          switch (action) {
            case 'view':
              handleView(id);
              break;
            case 'delete':
              handleDelete(id);
              break;
            default:
              break;
          }
        };
    
        const menu = (
          <Menu>
            <Menu.Item key="view" onClick={() => handleItemClick('view')}>
            View
            </Menu.Item>
            <Menu.Item key="dny" onClick={() => handleItemClick('delete')}>
            Delete
            </Menu.Item>
          </Menu>
        );
    
        return (
          <Dropdown overlay={menu} placement="bottomLeft">
            <Button>Action</Button>
          </Dropdown>
        );
    
      }

      const showModal = () => {
        setIsModalVisible(true);
      };
    
      const handleOk = async () => {
        try {
    
          const response = formPost.post({url:AddressesUrls.addrss, data:newAddress})
          if (response.save) {
            message.success('address added successfully');
            // setAddresses([...addresses, response]);
            setIsModalVisible(false);
          }else{
            message.error('Failed to add address, address with this admin exists');
          }
        } catch (error) {
          message.error('Failed to add address');
          console.error('Failed to add address:', error);
        }
      };

      const handleCancel = () => {
        setIsModalVisible(false);
      };

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAddress({ ...newAddress, [name]: value });
      };
    
      const handleAdminChange = (value) => {
        setNewAddress({ ...newAddress, admin: value });
      };
    
  return (
    <div>
         <Card
        bordered={true}
        className=" w-full overflow-hidden"
        title="Addresses"
        extra={
          <Button type="primary" onClick={showModal}>Add an Address</Button>
        }
      >
        <div>
          <Table
            dataSource={addressessAdmSNo}
            className="table-responsive w-full "
            loading={isLoading}
          >
            <Column
              title="S/No"
              dataIndex="sNo"
              sorter={(a, b) => a.sNo - b.sNo}
            />
            <Column
              title="Name"
              dataIndex="name"
              key="name"
            />
            <Column title="Postal Code" key="postalCode"
         dataIndex="postalCode"

            />
            <Column
              title="Admin Name"
              dataIndex="admin"
              key="admin"
              render={(data) => (
                <div>
                <Badge color="green">{data.fname} {data.lname}</Badge>
                </div>
              )}
            />
            <Column
              title="Admin Phone"
              dataIndex="admin"
              key="admin"
              render={(data) => (
                <div>
                <Badge color="green">{data.phone_number}</Badge>
                </div>
              )}
            />
            <Column
              title="Created at"
              dataIndex="createdAt"
              key="createdAt"
              render={(date) => <div>{renderDateTime(date)}</div>}
            />
            <Column
              title="Is active"
              dataIndex="isActive"
              key="isActive"
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
        title="Add Address"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item label="Name">
            <Input name="name" value={newAddress.name} onChange={handleInputChange} />
          </Form.Item>
          <Form.Item label="Postal Code">
            <Input name="postalCode" value={newAddress.postalCode} onChange={handleInputChange} />
          </Form.Item>
          <Form.Item label="Admin">
            <Select
              value={newAddress.admin}
              onChange={handleAdminChange}
              placeholder="Select an admin"
            >
              {leaders?.map((leader) => (
                <Select.Option key={leader.id} value={leader.id}>
                  {leader.fname} {leader.lname} - {leader.phone_number}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Addresses