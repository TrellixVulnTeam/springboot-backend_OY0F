import {Drawer, Input, Col, Select, Form, Row, Button, Spin, } from 'antd';

import { updateStudent} from "./client";
import {LoadingOutlined} from "@ant-design/icons";
import {useState, useEffect} from "react";
import {successNotification, errorNotification} from "./Notification";

const {Option} = Select;

function EditStudentDrawerForm({showEditDrawer, setShowEditDrawer, fetchStudents, oldStudent}) {
    const [submitting, setSubmitting] = useState(false);
    const [fields, setFields] = useState([]);

    const onCLose = () => setShowEditDrawer(false)

    useEffect(()=> {
        setFields([
            {
                name: ['name'],
                value: oldStudent?.name,
            },{
                name: ['email'],
                value: oldStudent?.email,
            },{
                name: ['gender'],
                value: oldStudent?.gender,
            },
        ])
    }, [oldStudent])

    const onFinish = student => {
        console.log(JSON.stringify(student, null, 2));
        setSubmitting(true)
        updateStudent(student, oldStudent.id)
            .then(() => {
                console.log("student has been edited")
                fetchStudents()
                onCLose()
                successNotification(
                    "student has been edited",
                    `${student.name} has been successfully edited`)
            }).catch(err => {
            console.log(err.response)
            err.response.json().then(res =>{
                console.log(res);
                errorNotification(
                    "There was an issue",
                    res.message)
            })
        }).finally(() => {
            setSubmitting(false)
        })
    };

    const onFinishFailed = errorInfo => {
        alert(JSON.stringify(errorInfo, null, 2));
    };

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

        return <Drawer
            title="Edit student"
            width={720}
            onClose={onCLose}
            visible={showEditDrawer}
            bodyStyle={{paddingBottom: 80}}
            footer={
                <div
                    style={{
                        textAlign: 'right',
                    }}
                >
                    <Button onClick={onCLose} style={{marginRight: 8}}>
                        Cancel
                    </Button>
                </div>
            }
        >
            {console.log(fields)}
            <Form layout="vertical"
                  onFinishFailed={onFinishFailed}
                  onFinish={onFinish}
                  hideRequiredMark
                  fields={fields}
                  onFieldsChange={(_,allFields) => {
                    setFields(allFields)
                  }
                  }
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="name"
                            label="Name"
                            // initialValue={editStudent?.name}
                            rules={[{required: true, message: 'Please enter student name'}]}
                        >
                            <Input placeholder="Please enter student name"/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="email"
                            label="Email"
                            // initialValue={editStudent?.email}
                            rules={[{required: true, message: 'Please enter student email'}]}
                        >
                            <Input placeholder="Please enter student email"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="gender"
                            label="gender"
                            // initialValue={editStudent?.gender}
                            rules={[{required: true, message: 'Please select a gender'}]}
                        >
                            <Select placeholder="Please select a gender">
                                <Option value="MALE">MALE</Option>
                                <Option value="FEMALE">FEMALE</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    {submitting && <Spin indicator={antIcon}/>}
                </Row>
            </Form>
        </Drawer>
}

export default EditStudentDrawerForm;