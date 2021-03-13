import { Input, Select, DatePicker } from 'antd';
import React from 'react';
import { Moment } from 'moment';
import { userList } from '../utils/const';

const { Option } = Select;

enum UserId {
  tuture = '666666666',
  mRcfps = '23410977',
  crxk = '25455350',
  pftom = '23410976',
  holy = '58352313',
  pony = '12345678'
}

export interface TodoValue {
  content?: string;
  user?: string;
  date?: string;
}

interface TodoInputProps {
  value?: TodoValue;
  onChange?: (value: TodoValue) => void;
}

interface TodoInputState {
  content: string;
  user: string;
  date: string;
}

class TodoInput extends React.Component<TodoInputProps, TodoInputState> {
  state = {
    content: '',
    user: UserId.tuture,
    date: ''
  };

  private triggerChange = (changeValue: TodoValue) => {
    const { value, onChange } = this.props;
    const { content, user, date } = this.state;
    if (onChange) {
      onChange({ content, user, date, ...value, ...changeValue });
    }
  };

  private onContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value = {} } = this.props;
    if (!('content' in value)) {
      this.setState({ content: e.target.value });
    }
    this.triggerChange({ content: e.target.value });
  };

  private onUserChange = (selectValue: UserId) => {
    const { value = {} } = this.props;
    if (!('user' in value)) {
      this.setState({ user: selectValue });
    }
    this.triggerChange({ user: selectValue });
  };

  private onDateOk = (date: Moment) => {
    const { value = {} } = this.props;
    if (!('date' in value)) {
      this.setState({ date: date.format('YYYY-MM-DD HH:mm') });
    }
    this.triggerChange({ date: date.format('YYYY-MM-DD HH:mm') });
  };

  public render() {
    const { value } = this.props;
    const { content, user } = this.state;
    return (
      <div className="todoInput">
        <Input
          bordered={false}
          type="text"
          placeholder="输入待办事项内容"
          value={value?.content || content}
          onChange={this.onContentChange}
        />
        <Select
          style={{ width: 80 }}
          size="small"
          defaultValue={UserId.tuture}
          value={user}
          onChange={this.onUserChange}
        >
          {userList.map((user) => (
            <Option key={user.id} value={user.id}>
              {user.name}
            </Option>
          ))}
        </Select>
        <DatePicker
          showTime
          size="small"
          style={{ marginLeft: '16px', marginRight: '16px' }}
          onOk={this.onDateOk}
        />
      </div>
    );
  }
}

export default TodoInput;
