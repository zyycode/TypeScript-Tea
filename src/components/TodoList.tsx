import { Menu, List, Avatar, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Todo, getUserById } from '../utils/const';

export type MenyKey = 'complete' | 'delete';

interface ActionProps {
  onClick: (key: MenyKey) => void;
  isCompleted: boolean;
}

function Action({ onClick, isCompleted }: ActionProps) {
  const handleActionClick = ({ key }: any) => {
    if (key === 'complete') {
      onClick('complete');
    } else if (key === 'delete') {
      onClick('delete');
    }
  };
  return (
    <Menu onClick={handleActionClick}>
      <Menu.Item key="complete">{isCompleted ? '重做' : '完成'}</Menu.Item>
      <Menu.Item key="delete">删除</Menu.Item>
    </Menu>
  );
}

interface TodoListProps {
  todoList: Todo[];
  onClick: (todoId: string, key: MenyKey) => void;
}

const TodoList = ({ todoList, onClick }: TodoListProps) => {
  return (
    <List
      className="demo-loadmore-list"
      itemLayout="horizontal"
      dataSource={todoList}
      renderItem={(item) => {
        const user = getUserById(item.user);
        return (
          <List.Item
            actions={[
              <Dropdown
                overlay={() => (
                  <Action
                    onClick={(key: MenyKey) => onClick(item.id, key)}
                    isCompleted={item.isCompleted}
                  />
                )}
              >
                <Button key="list-loadmore-more" type="link">
                  操作 <DownOutlined />
                </Button>
              </Dropdown>
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={user.avatar} />}
              title={<a href="https://ant.design">{user.name}</a>}
              description={item.date}
            />
            <div
              style={{
                textDecoration: item.isCompleted ? 'line-through' : 'none'
              }}
            >
              {item.content}
            </div>
          </List.Item>
        );
      }}
    />
  );
};

export default TodoList;
