import React, { useState,  } from 'react';
import { Button, Card, Form, Modal,Input } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { Colors } from '../../constants/Colors';
import { useFormPost } from '../../hooks/FormDataHoook';
import swal from 'sweetalert';
import { announcements } from '../../utils/apis';

const AddAnnouncentModal = (props) => {
    const location = useLocation();
    const [isloading, setisloading] = useState(false);
    const addressDetail = location?.state?.record;
    const formPost = useFormPost();
    const navigate = useNavigate();
   console.log('====================================');
   console.log(addressDetail);
   console.log('====================================');

   const handleSubmit = async (values) => {
    const body = {
        name: values.name,
        postalCode: values.postalCode,
        address: addressDetail?.id,
        time: values.time,
        date: values.date,
        announcement: values.announcement,

      };

      console.log('====================================');
      console.log(body);
      console.log('====================================');
      setisloading(true);    
      try {
  
        const response = await formPost.post({
          url: announcements.announcementss,
          data: body,
          login:true
        });
        if (response.save) {
            swal({  
                title: "Announcement",  
              text: "Posting announcement success",  
              icon: "success",  
              buttons: ["Ok"],   
                showCancelButton: true,  
                confirmButtonClass: "danger",  
                confirmButtonText: " Confirm, remove it!",  
                closeOnConfirm: false  
              }
              )
            navigate('/announcements');
        }
    }catch(e){
        swal({  
            title: "Announcement",  
          text: "Posting announcement failed",  
          icon: "error",  
          buttons: ["Ok"],   
            showCancelButton: true,  
            confirmButtonClass: "danger",  
            confirmButtonText: " Confirm, remove it!",  
            closeOnConfirm: false  
          }
          )
    }
   }
  return (

   <div>
    <Card
    title={`Add announcement for ${addressDetail?.name}`}
    >

        <Form
              onFinish={handleSubmit}
            //   onFinishFailed={onFinishFailed}
              layout="vertical"
              className="row-col"
            >
              <Form.Item
                className="username"
                label="Title"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input tittle!",
                  },
                ]}
              >
                <Input placeholder="Tittle" type="text" className="" />
              </Form.Item>
       

              <Form.Item
                className="username"
                label="postalCode"
                name="postalCode"
                rules={[
                  {
                    required: true,
                    message: "Please input your postalCode!",
                  },
                ]}
              >
                <Input className="" />
              </Form.Item>
              <Form.Item
                className="username"
                label="time"
                name="time"
                rules={[
                  {
                    required: true,
                    message: "Please input your time!",
                  },
                ]}
              >
                <Input className="" type="time" />
              </Form.Item>
              <Form.Item
                className="username"
                label="Date"
                name="date"
                rules={[
                  {
                    required: true,
                    message: "Please input date!",
                  },
                ]}
              >
                <Input className="" type="date" />
              </Form.Item>
              <Form.Item
                className="username"
                label="Announcement"
                name="announcement"
                rules={[
                  {
                    required: true,
                    message: "Please input date!",
                  },
                ]}
              >
                <Input.TextArea className="" type="text"  rows={4}/>
              </Form.Item>

              <Form.Item>
                {isloading ? (
                  <Button
                    style={{ width: "100%", backgroundColor: Colors.primary }}
                    type="primary"
                    htmlType="submit"
                    loading
                  >
                    posting in...
                  </Button>
                ) : (
                  <Button
                    style={{ width: "100%", backgroundColor: Colors.primary }}
                    type="primary"
                    htmlType="submit"
                  >
                    Post announcement
                  </Button>
                )}
              </Form.Item>
        </Form>
    
    </Card>
   </div>
 
  )
}

export default AddAnnouncentModal