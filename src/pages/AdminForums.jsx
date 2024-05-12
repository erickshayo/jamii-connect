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
  } from "antd";
  import { UserOutlined, RightOutlined } from "@ant-design/icons";

  const { Title, Text, Paragraph } = Typography;
const AdminForums = () => {
    const navigate = useNavigate();
    const [forums, setforums] = useState([]);
    const fetcher = useDataFetch();
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

  return (
    <div>
      <Row gutter={[24, 0]}>
          {
            forums.map((forum) => 
                <Col xs={24} md={12} sm={24} lg={6} xl={14} className="mb-24" key={forum?.id}>
            <Card bordered={false} className="criclebox h-full">
              <Row gutter>
                <Col
                  xs={24}
                  md={12}
                  sm={24}
                  lg={12}
                  xl={14}
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
                     <Button color='red' className='bg-red-100 hover:bg-red-200 hover:text-white'>Delete</Button>
                     <Button>Deactivate</Button>
                      <a className="icon-move-right" href="#pablo">
                        Read More
                        {<RightOutlined />}

                      </a>
                    </div>
                  </div>
                </Col>
                <Col
                  xs={24}
                  md={12}
                  sm={24}
                  lg={12}
                  xl={10}
                  className="col-img"
                >
                  <div className="ant-cret text-right">
                    <img src={card} alt="" className="border10" />
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