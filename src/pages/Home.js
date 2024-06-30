import React, { useEffect, useState } from 'react';
import { useDataFetch } from '../hooks/DataHook';
import { Card, Spin, Row, Col } from 'antd';
import { HomeOutlined, UserOutlined, NotificationOutlined, CommentOutlined, TeamOutlined, SearchOutlined } from '@ant-design/icons';
import { baseUrl } from '../utils/BaseUrl';
import { useSelector } from 'react-redux';
import { selectUserCurretRole } from '../App/AuthSlice'; 

const Statistics = () => {
  const fetcher = useDataFetch();
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const role = useSelector(selectUserCurretRole);

  const fetchStatistics = async () => {
    try {
      setIsLoading(true);
      const response = await fetcher.fetch({
        url: `${baseUrl}/api/statistics/`,
        method: 'GET',
      });
      setStats(response);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching statistics:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  if (isLoading) {
    return <Spin />;
  }

  if (!stats) {
    return <div>No statistics available</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Statistics</h2>
      <Row gutter={16}>
     { role !== "ctzn" && 
     (
     <>
      <Col span={8}>
      <Card
        title={<><HomeOutlined /> Total Addresses</>}
        className="shadow-lg"
      >
        {stats.total_addresses}
      </Card>
    </Col>
       <Col span={8}>
       <Card
         title={<><UserOutlined /> Total Address Users</>}
         className="shadow-lg"
       >
         {stats.total_address_users}
       </Card>
     </Col>
     </>
     )
     }
       
     
        <Col span={8}>
          <Card
            title={<><NotificationOutlined /> Total Announcements</>}
            className="shadow-lg"
          >
            {stats.total_announcements}
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title={<><TeamOutlined /> Total Forums</>}
            className="shadow-lg"
          >
            {stats.total_forums}
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title={<><CommentOutlined /> Total Comments</>}
            className="shadow-lg"
          >
            {stats.total_comments}
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title={<><SearchOutlined /> Total Lost and Found</>}
            className="shadow-lg"
          >
            {stats.total_lost_and_found}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Statistics;
