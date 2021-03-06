import { useState, useRef } from 'react';

import { Form, Tabs, Typography, Button } from 'antd';

import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';

import { todoListData } from './utils/const';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import { MenyKey } from './components/TodoList';

const { Title } = Typography;
const { TabPane } = Tabs;

function App() {
  const [todoList, setTodoList] = useState(todoListData);
  const callback = () => {};

  const onFinish = (value: any) => {
    console.log('received values from form: ', value);
    const newTodo = { ...value.todo, isCompleted: false };
    setTodoList(todoList.concat(newTodo));
  };
  const ref = useRef(null);

  const activeTodoList = todoList.filter((todo) => !todo.isCompleted);
  const completedTodoList = todoList.filter((todo) => todo.isCompleted);

  const onClick = (todoId: string, key: MenyKey) => {
    if (key === 'complete') {
      const newTodoList = todoList.map((todo) => {
        if (todo.id === todoId) {
          return { ...todo, isCompleted: !todo.isCompleted };
        }

        return todo;
      });

      setTodoList(newTodoList);
    } else if (key === 'delete') {
      const newTodoList = todoList.filter((todo) => todo.id !== todoId);
      setTodoList(newTodoList);
    }
  };

  return (
    <div className="App" ref={ref}>
      <div className="container header">
        <img src={logo} alt="reactjs" />
        <Title level={3}>图雀社区：汇聚精彩的免费实战教程</Title>
      </div>
      <div className="container">
        <Form onFinish={onFinish}>
          <Form.Item name="todo">
            <TodoInput />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="container">
        <Tabs onChange={callback} type="card">
          <TabPane tab="所有" key="1">
            <TodoList todoList={todoList} onClick={onClick} />
          </TabPane>
          <TabPane tab="进行中" key="2">
            <TodoList todoList={activeTodoList} onClick={onClick} />
          </TabPane>
          <TabPane tab="已完成" key="3">
            <TodoList todoList={completedTodoList} onClick={onClick} />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
