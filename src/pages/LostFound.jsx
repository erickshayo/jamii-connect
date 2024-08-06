import React, { useState, useEffect } from 'react';
import { useDataFetch } from '../hooks/DataHook';
import { forumsUrls, AddressesUrls } from '../utils/apis';
import { Card, List, Button, Modal, Form, Input, Select, Upload, message,Typography } from 'antd';
import { PlusOutlined, UploadOutlined, SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import { baseUrl } from '../utils/BaseUrl';

const { Option } = Select;
const { TextArea } = Input;
const {Text} =Typography;

const LostAndFoundList = () => {
  const fetcher = useDataFetch();
  const [lostAndFoundItems, setLostAndFoundItems] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [address, setaddress] = useState();
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchLostAndFoundItems = async () => {
    const userId = localStorage.getItem("crusr_id");
    try {
      setIsLoading(true);
      const res = await fetcher.fetch({ url: AddressesUrls.addressUser + `?queryType=userAddress&&userId=${userId}` })
      console.log(res[0].address);
      const response = await fetcher.fetch({
        url: forumsUrls.lostFound,
        method: 'GET',
      });

      setLostAndFoundItems(response);
      setaddress(res[0].address);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching lost and found items:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLostAndFoundItems();
  }, []);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleAddItem = async (values) => {
    const userId = localStorage.getItem("crusr_id");
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('userId', userId);
    formData.append('address', address.id);
    formData.append('type', values.type);
    if (values.picture) {
      formData.append('picture', values.picture.file);
    }
    formData.append('desc', values.desc);
    console.log(formData.values);

    try {
      // const response = await fetcher.fetch({
      //   url: forumsUrls.lostFound,
      //   method: 'POST',
      //   data: formData,
      //   headers: { 'Content-Type': 'multipart/form-data' }
      // });
 

      const response = await axios.post(forumsUrls.lostFound, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response) {
        message.success('Item added successfully');
       
       // Reload items after adding new item
      }
      handleCloseModal();
      fetchLostAndFoundItems(); 
    } catch (error) {
      console.error('Error adding item:', error);
      message.error('Failed to add item');
    }
  };

  const uploadProps = {
    beforeUpload: () => false,
    maxCount: 1, 
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);
    const filtered = lostAndFoundItems.filter(item => 
      item.name.toLowerCase().includes(searchValue) ||
      item.desc.toLowerCase().includes(searchValue) ||
      item.userId.fname.toLowerCase().includes(searchValue) ||
      item.userId.lname.toLowerCase().includes(searchValue) ||
      item.address.name.toLowerCase().includes(searchValue)
    );
    setFilteredItems(filtered);
  };

  console.log(address);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Lost and Found Items</h2>
        <Input
          placeholder="Search items..."
          prefix={<SearchOutlined />}
          value={searchTerm}
          onChange={handleSearch}
          style={{ width: 200, marginRight: 20 }}
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={handleOpenModal}>
          Add Item
        </Button>
      </div>

      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={searchTerm == ""? lostAndFoundItems:filteredItems}
        loading={isLoading}
        renderItem={(item) => (
          <List.Item>
            <Card
              hoverable
              cover={<img alt="example" src={`${baseUrl}${item.picture}` || 'https://via.placeholder.com/150'} />}
              className="shadow-lg rounded-lg"
            >
              <Card.Meta
                title={item.name}
                description={item.desc}
              />
              <div className="mt-2">
                <Text>Posted by: {item.userId?.fname} {item.userId?.lname}</Text>
                <br />
                <Text>Address: {item.address?.name}</Text>
                <br />
                <p>Contact: {item.userId?.email}</p>
                <p>Phone: {item.userId?.phone_number}</p>
                <p>Address: {item.address?.name}</p>
                <p>Type: {item.type === 'L' ? 'Lost' : 'Found'}</p>
              </div>
            </Card>
          </List.Item>
        )}
      />

      <Modal
        title="Add Lost and Found Item"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleAddItem}>
          <Form.Item
            name="name"
            label="Item Name"
            rules={[{ required: true, message: 'Please enter the item name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true, message: 'Please select the type' }]}
          >
            <Select>
              <Option value="L">Lost</Option>
              <Option value="F">Found</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="desc"
            label="Description"
            rules={[{ required: true, message: 'Please enter the description' }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          {/* <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: 'Please enter the address' }]}
          >
            <Input />
          </Form.Item> */}
          <Form.Item
            name="picture"
            label="Upload Picture"
            valuePropName="file"
            
          >
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Item
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LostAndFoundList;
