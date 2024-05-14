import React, {useState, useEffect} from 'react';
import { useDataFetch } from '../hooks/DataHook';
import { AddressesUrls } from '../utils/apis';
import { useNavigate } from 'react-router-dom';
import Column from "antd/es/table/Column";
import modal from "antd/es/modal";
import { Avatar, Button, Card, Radio, Table, Badge, Menu, Dropdown } from "antd";
import { UserOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

export const renderDateTime = (dateString) => {
    const dateTime = new Date(dateString);
    return dateTime.toLocaleDateString();
  };

const Addresses = () => {
const fetcher = useDataFetch();
  const [isLoading, setisLoading] = useState(false);
  const [addressessAdm, setaddressessAdm] = useState([]);
  const addressessAdmSNo = addressessAdm.map((item, index) => ({
    ...item,
    sNo: index + 1,
  }));
  
  const navigate = useNavigate();

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
    
  return (
    <div>
         <Card
        bordered={true}
        className=" w-full overflow-hidden"
        title="Corporate Identity share"
        extra={
          <>
            <Radio.Group defaultValue="a">
              <Radio.Button value="a">Add an Address</Radio.Button>
            </Radio.Group>
          </>
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
    
    </div>
  )
}

export default Addresses