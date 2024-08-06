import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDataFetch } from '../../hooks/DataHook';
import { forumsUrls } from '../../utils/apis';
import { CommentOutlined, DeleteOutlined } from '@ant-design/icons';
import { Card, List, Tooltip, Typography, message, Popconfirm, FloatButton ,Form, Modal,Input,Button} from 'antd';
import { Comment } from '@ant-design/compatible';
import { useFormPost } from '../../hooks/FormDataHoook';
import { useSelector } from 'react-redux';
import { selectUserCurretRole } from '../../App/AuthSlice';
const { Title, Text } = Typography;

const ViewForum = () => {
    const { forumIds } = useParams(); // Get the forumId from URL params
    const fetcher = useDataFetch();
    const [forum, setForum] = useState(null);
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const formPost = useFormPost();
    const role = useSelector(selectUserCurretRole);

    console.log(forumIds);
    const fetchForumDetails = async () => {
        console.log("-------------------------");
        try {
            setIsLoading(true);
            const response = await fetcher.fetch({
                url: forumsUrls.forums + `?queryType=single&&forumId=${forumIds}`,
                method: 'GET',
            });
            console.log('Forum details:', response);
            setForum(response[0]);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching forum details:', error);
            setIsLoading(false);
        }
    };

    const fetchComments = async () => {
        try {

            setIsLoading(true);
            const response = await fetcher.fetch({
                url: forumsUrls.comment + `?queryType=forumComment&&forumId=${forumIds}`,// Construct your API endpoint for fetching comments
                method: 'GET',
            });
            console.log('Comments:', response);
            setComments(response);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching comments:', error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchForumDetails();
        fetchComments();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!forum) {
        return <div>Forum not found</div>;
    }

    console.log(forum);

    const handleDeleteComment = async (commentId) => {
        try {
            const response = await formPost.deleteRequest({
                url: forumsUrls.comment + `/${commentId}/`,
              })
              console.log(response);
            if (response?.status === 204) {
                message.success('Comment deleted successfully');
                // Optionally reload comments or handle UI update
            } 
            fetchComments();
        } catch (error) {
            console.error('Error deleting comment:', error);
            message.error('Failed to delete comment');
        }
    };

    const handleOpenModal = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const handleAddComment = async (values) => {
        const userId = localStorage.getItem("crusr_id");
        const data = {
            ...values,
            userId,
            forum: forumIds,
        };
        try {
            const response = await formPost.post({
                url: forumsUrls.comment,
                data,
            });
            if (response && response.save) {
                message.success('Comment added successfully');
                handleCloseModal();
                fetchComments(); // Reload comments after adding new comment
            } else {
                message.error('Failed to add comment');
            }
        } catch (error) {
            console.error('Error adding comment:', error);
            message.error('Failed to add comment');
        }
    };


    return (
        <div>
            <Card className="shadow-lg rounded-lg p-4">
                <h2 className="text-xl font-bold mb-4">{forum.name}</h2>
                <div className="flex items-center mb-2">
                    <Text className="mr-2">Posted by:</Text>
                    <Text className="font-bold">{forum.userId?.fname} {forum.userId?.lname}</Text>
                </div>
                <Text className="mb-4">{forum.problem}</Text>
                <br />
                <div className="flex items-center">
                    <Text className="mr-2">Address:</Text>
                    <Text className="font-bold">{forum.address?.name}</Text>
                </div>
            </Card>
            <Card title="Comments" style={{ marginTop: '20px' }}>
                <List
                    itemLayout="horizontal"
                    dataSource={comments}
                    renderItem={(comment) => (
                        <li>
                            <Comment
                                author={`${comment.userId.fname} ${comment.userId.lname}`}
                                avatar={<CommentOutlined />}
                                content={<p>{comment.comment}</p>}
                                datetime={<Tooltip title={comment.createdAt}><span>{comment.createdAt}</span></Tooltip>}
                                actions={[
                                    <Popconfirm
                                        title="Are you sure you want to delete this comment?"
                                        onConfirm={() => handleDeleteComment(comment.id)}
                                        okText="Yes"
                                        cancelText="No"
                                        className='float-right'
                                    >
                                       {comment.userId.id === localStorage.getItem("crusr_id") || role != "ctzn"?    <DeleteOutlined key="delete" />:""}
                                    </Popconfirm>
                                ]}
                            />
                        </li>
                    )}
                />
            </Card>
            <FloatButton onClick={handleOpenModal} icon={<CommentOutlined />} className='w-20 h-20 mb-10' tooltip={<div>Create a new forum</div>}       style={{ right: 24 }} />

            <Modal
                title="Add Comment"
                visible={isModalVisible}
                onCancel={handleCloseModal}
                footer={null}
            >
                <Form
                    layout="vertical"
                    onFinish={handleAddComment}
                >
                    <Form.Item
                        name="comment"
                        label="Comment"
                        rules={[{ required: true, message: 'Please enter your comment' }]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Add Comment
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ViewForum;
