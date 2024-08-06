import React, {useState, useEffect} from 'react';
import { useDataFetch } from '../hooks/DataHook';
import { forumsUrls } from '../utils/apis';
import { useNavigate } from 'react-router-dom';
import card from "../assets/images/info-card-1.jpg";
import {
    Card,
    Col,
    Row,
    Typography,
    Progress,
    Upload,
    message,
    Button,
    Timeline,
    Radio,
    Modal,
    Popconfirm
  } from "antd";
  import { UserOutlined, RightOutlined,ExclamationCircleOutlined } from "@ant-design/icons";
import { baseUrl } from '../utils/BaseUrl';
import { useFormPost } from '../hooks/FormDataHoook';

  const { Title, Text, Paragraph } = Typography;
const AdminForums = () => {
    const navigate = useNavigate();
    const [forums, setforums] = useState([]);
    const fetcher = useDataFetch();
    const formPost = useFormPost();

    const [isLoading, setisLoading] = useState(false);

    const loadData = async () => {
        try {
          setisLoading(true);
          const response = await fetcher.fetch({
            url: forumsUrls.forums + `?queryType=all`,
          });
          console.log(response);

          if (response) {
            setforums(response)
          }

          setisLoading(false);
        } catch (error) {
          setisLoading(false);
        }
      };

      useEffect(() => {
        loadData();
      }, []);


      const handleDeleteForum = async (forumId) => {
        try {
          // const response = await fetcher.fetch({
          //   url: `${baseUrl}/api/forum/${forumId}`,
          //   method: 'delete',
          // });
          const response = await formPost.deleteRequest({
            url: `${baseUrl}/api/forum/${forumId}/`,
          })
          if (response) {
            message.success('Forum deleted successfully');
            loadData(); // Reload forums after deletion
          } 
          loadData(); 
        } catch (error) {
          console.error('Error deleting forum:', error);
          message.error('Failed to delete forum');
        }
      };
    
      const handleDeactivateForum = async (forumId) => {
        try {
          const response = await fetcher.fetch({
            url: `${baseUrl}/api/forum/${forumId}/deactivate`,
            method: 'PUT',
          });
          if (response) {
            message.success('Forum deactivated successfully');
            loadData(); // Reload forums after deactivation
          } else {
            message.error('Failed to deactivate forum');
          }
        } catch (error) {
          console.error('Error deactivating forum:', error);
          message.error('Failed to deactivate forum');
        }
      };
    
      const handleViewForum = (forumId) => {
        navigate(`/forums/${forumId}`);
      };
    
      const handleDeleteComment = async (commentId) => {
        try {
          const response = await fetcher.fetch({
            url: forumsUrls.comment + `/${commentId}`,
            method: 'DELETE',
          });
          if (response && response.message === 'Comment deleted successfully') {
            message.success('Comment deleted successfully');
            // Optionally reload comments or handle UI update
          } else {
            message.error('Failed to delete comment');
          }
        } catch (error) {
          console.error('Error deleting comment:', error);
          message.error('Failed to delete comment');
        }
      };
    
      const confirmDeleteForum = (forumId) => {
        Modal.confirm({
          title: 'Confirm Delete',
          icon: <ExclamationCircleOutlined />,
          content: 'Are you sure you want to delete this forum?',
          okText: 'Delete',
          okType: 'danger',
          cancelText: 'Cancel',
          onOk() {
            handleDeleteForum(forumId);
          },
        });
      };
    
      const confirmDeactivateForum = (forumId) => {
        Modal.confirm({
          title: 'Confirm Deactivate',
          icon: <ExclamationCircleOutlined />,
          content: 'Are you sure you want to deactivate this forum?',
          okText: 'Deactivate',
          cancelText: 'Cancel',
          onOk() {
            handleDeactivateForum(forumId);
          },
        });
      };

  return (
    <div>
      <Row gutter={[24, 0]}>
          {
            forums.map((forum) => 
                <Col xs={24} md={12} sm={24} lg={6} xl={8} className="mb-24" key={forum?.id}>
            <Card bordered={false} className="criclebox h-full">
              <Row gutter>
                <Col
           
                  className="mobile-24"
                >
                  <div className="h-full col-content p-20">
                    <div className="ant-muse">
                      <Text>Posted by: {forum?.userId.fname}  {forum?.userId.lname}</Text>
                      <Title level={5}>{forum?.name}</Title>
                      <Paragraph className="lastweek mb-36">
                      {forum?.problem}
                      </Paragraph>
                    </div>
                    <Text>Address: {forum?.address.name} </Text>
                    <div className="card-footer">

                     
                    <div className="forum-actions">
                <Button onClick={() => handleViewForum(forum.id)}>View</Button>
                <Popconfirm
                  title="Are you sure to delete this forum?"
                  onConfirm={() => confirmDeleteForum(forum.id)}
                  okText="Delete"
                  cancelText="Cancel"
                  placement="topRight"
                >
                  <Button type="danger">Delete</Button>
                </Popconfirm>
                {/* <Popconfirm
                  title="Are you sure to deactivate this forum?"
                  onConfirm={() => confirmDeactivateForum(forum.id)}
                  okText="Deactivate"
                  cancelText="Cancel"
                  placement="topRight"
                >
                  <Button>Deactivate</Button>
                </Popconfirm> */}
              </div>
                      <a className="icon-move-right" href="#pablo">
                        Read More
                        {<RightOutlined />}

                      </a>
                    </div>
                  </div>
                </Col>
              
              </Row>
            </Card>
          </Col>
            )
          }

        </Row>  
    </div>
  )
}

export default AdminForums