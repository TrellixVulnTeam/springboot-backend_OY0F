import { Layout, Menu, Breadcrumb,Table, Button ,Popconfirm, message} from 'antd'
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined, PlusOutlined,
} from '@ant-design/icons';

import StudentDrawerForm from "./StudentDrawerForm";
import EditStudentDrawerForm from "./EditStudentDrawerForm";
import { getAllStudents, deleteStudent, updateStudent } from "./client";
import { useState, useEffect} from "react";

import './App.css';
import {errorNotification} from "./Notification";


function App() {

    const [students, setStudents] = useState([])
    const [collapsed, setCollapsed] = useState(false)
    const [showDrawer, setShowDrawer] = useState(false);
    const [student, setStudent] = useState()
    const [showEditDrawer, setShowEditDrawer] = useState(false)

    const fetchStudents = () => {

        getAllStudents()
           .then(res => res.json())
           .then(data => {
               setStudents(data)
           }).catch(err => {
               console.log(err.response)
               err.response.json().then(res =>{
                   console.log(res);
                   errorNotification(
                       "There was an issue",
                       res.message)
               })
        })
   }
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },{
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: 'Actions',
            key: 'action',
            render: (record) => (
                <div>
                    <Popconfirm
                        title="Are you sure to delete this student?"
                        onConfirm={confirmDelete}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            type="primary"
                            className="actionButton"
                            onClick={() => {
                                setStudent(record)
                            }}
                        >
                            Delete
                        </Button>
                    </Popconfirm>
                    <Popconfirm
                        title="Are you sure to edit this student?"
                        onConfirm={confirmEdit}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            type="primary"
                            className="actionButton"
                            onClick={() => {
                                setStudent(record)
                            }}
                        >
                            Edit
                        </Button>
                    </Popconfirm>
                </div>
            )

        }
    ];

    useEffect(() => {
        fetchStudents()

    },[])

    // useEffect(() => {
    //     // console.log("new student")
    //     // console.log(student)
    // }
    // ,[student])

    function confirmDelete(e) {
        deleteStudent(student.id).then(()=>{
            fetchStudents()
        }).catch(err => {
            console.log(err.response)
            err.response.json().then(res =>{
                console.log(res);
                errorNotification("There was an Error",res.message)
            })
        })
    }

    function confirmEdit(e) {
        setShowEditDrawer(!showEditDrawer);
    }

    function cancel(e) {
        console.log(student);
    }


    const renderStudents = () => {

        if(students.length <= 0) {
            return  <div>
                        <StudentDrawerForm
                            setShowDrawer={setShowDrawer}
                            showDrawer={showDrawer}
                            fetchStudents={fetchStudents}
                        />
                        <EditStudentDrawerForm
                            student={student}
                            setShowDrawer={setShowEditDrawer}
                            showDrawer={showEditDrawer}
                            fetchStudents={fetchStudents}
                        />
                        <Button
                            onClick = {() => setShowDrawer(!showDrawer)}
                            type="primary"
                            shape="round"
                            icon={<PlusOutlined />}
                            size="small">
                            Add New Student
                        </Button>
                     </div>
        } else {
                return <>
                    {/*{console.log("form-remounted")}*/}
                    <StudentDrawerForm
                        setShowDrawer={setShowDrawer}
                        showDrawer={showDrawer}
                        fetchStudents={fetchStudents}
                    />
                    {/*{console.log("student to edit: ")}*/}
                    {/*{console.log(student)}*/}
                    <EditStudentDrawerForm
                        oldStudent={student}
                        setShowEditDrawer={setShowEditDrawer}
                        showEditDrawer={showEditDrawer}
                        fetchStudents={fetchStudents}
                    />
                    <Table
                    dataSource={students}
                    columns={columns}
                    rowKey={(student)=>student.id}
                    title ={
                        ()=>
                            <Button
                                onClick = {() => setShowDrawer(!showDrawer)}
                                type="primary"
                                shape="round"
                                icon={<PlusOutlined />}
                                size="small">
                                Add New Student
                            </Button>
                    }/>
                </>
        }

    }

    const { Header, Content, Footer, Sider } = Layout;
    const { SubMenu } = Menu;

  return (
      <Layout style={{ minHeight: '100vh' }}>
          <Sider
              collapsible
              collapsed={collapsed}
              onCollapse={(c) => setCollapsed(c)}>
              <div className="logo" />
              <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                  <Menu.Item key="1" icon={<PieChartOutlined />}>
                      Option 1
                  </Menu.Item>
                  <Menu.Item key="2" icon={<DesktopOutlined />}>
                      Option 2
                  </Menu.Item>
                  <SubMenu key="sub1" icon={<UserOutlined />} title="Students">
                      <Menu.Item key="4">Bill</Menu.Item>
                      <Menu.Item key="5">Alex</Menu.Item>
                  </SubMenu>
                  <SubMenu key="sub2" icon={<TeamOutlined />} title="Class">
                      <Menu.Item key="6">Class 1</Menu.Item>
                      <Menu.Item key="8">Class 2</Menu.Item>
                  </SubMenu>
              </Menu>
          </Sider>
      <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                  <div>
                      {renderStudents()}
                  </div>
              </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}></Footer>
      </Layout>
  </Layout>
  )
}

export default App;
