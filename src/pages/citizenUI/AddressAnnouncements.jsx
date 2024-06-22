import React, {useState, useEffect} from 'react';
import { useDataFetch } from '../../hooks/DataHook';
import { announcements, AddressesUrls, usersInfo } from '../../utils/apis';
import { selectCurrentUser, selectUserCurretRole} from '../../App/AuthSlice';
import { useSelector } from 'react-redux';
import Column from "antd/es/table/Column";
import modal from "antd/es/modal";
import { Avatar, Button, Card, Radio, Table, Badge, Menu, Dropdown } from "antd";
import { UserOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import { renderDateTime } from '../Addresses';
import swal from "sweetalert";
import AddAnnouncentModal from '../../components/ui/AddAnnouncentModal';

function Announcements() {
  const fetcher = useDataFetch();
  const [isLoading, setisLoading] = useState(false);
  const currentUser = useSelector(selectCurrentUser);
  const [openModal, setopenModal] = useState(false);
  const role = useSelector(selectUserCurretRole);
  const navigate = useNavigate();
  const [user, setuser] = useState(null)
  const [announcementsData, setannouncementsData] = useState([]);
  const [address, setaddress] = useState();
  const announcementsDataSNo = announcementsData.map((item, index) => ({
    ...item,
    sNo: index + 1,
  }));


  //  console.log(JSON.parse(currentUser).id.id);
  const loadAnnouncements = async ( ) => {
    const userId =  localStorage.getItem("crusr_id")
    try {
      const userRespose = await fetcher.fetch({url:usersInfo.usersInfo + `?queryType=single&&user_id=${userId}`});
      setuser(userRespose);
      const res = await fetcher.fetch({ url: AddressesUrls.addressUser + `?queryType=userAddress&&userId=${userRespose?.id}` })
      console.log(res);
      setaddress(res[0].address);
      if (res) {
        const response = await fetcher.fetch({url:announcements.announcementss+ `?queryType=addressAnnouncement&&addressId=${res[0]?.address.id}`})
        console.log(response);
        setannouncementsData(response);
      }
      
      
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
  loadAnnouncements();
  }, [])

  const handleView = (id) => {
    const msg = announcementsData.find((dat) => dat.id === id);
    swal({  
      title: "View Announcement",  
    text: msg?.announcement,  
    icon: "warning",  
    buttons: ["Ok"],   
      showCancelButton: true,  
      confirmButtonClass: "danger",  
      confirmButtonText: " Confirm, remove it!",  
      closeOnConfirm: false  
    }
    )
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
        title={`Annoucements for ${address?.name}`}
        extra={
          <>
            {
              role == 'ctzn' ? '':<Radio.Group defaultValue="a">
              <Radio.Button value="a" onClick={() =>  {
                navigate("/add_announcement", {state:{record:address}})
              }}>Add an Annoucement</Radio.Button>
            </Radio.Group>              
            }
          </>
        }
      >
        <div>
          <Table
            dataSource={announcementsDataSNo}
            className="table-responsive w-full "
            loading={isLoading}
          >
            <Column
              title="S/No"
              dataIndex="sNo"
              sorter={(a, b) => a.sNo - b.sNo}
            />
            <Column
              title="Tittle"
              dataIndex="name"
              key="name"
            />
            <Column title="Postal Code" key="postalCode"
         dataIndex="postalCode"

            />
            <Column
              title="Admin Name"
              dataIndex="address"
              key="address"
              render={(data) => (
                <div>
                <Badge color="green">{data.name}</Badge>
                </div>
              )}
            />
            <Column
              title="Date"
              dataIndex="date"
              key="date"
            
            />
            <Column
              title="Time"
              dataIndex="time"
              key="time"
            
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

export default Announcements