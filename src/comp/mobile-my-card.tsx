import React from 'react';
import { Button, Dialog } from 'antd-mobile';
import FormRender, { useForm } from 'form-render-mobile';
import { Collapse as AntdCollapse } from 'antd-mobile';
import RenderCore from 'form-render-mobile/es/render-core';

/**
 * 手风琴组件
 */
export const MyCard = (props) => {
  return (
    <AntdCollapse
      defaultActiveKey={['1']}
    >
      <AntdCollapse.Panel
        title={
          <div style={{ fontWeight: 700 }}>{props?.schema?.title}</div>
        }
        key="1"
      >
        {RenderCore(props)}
      </AntdCollapse.Panel>
    </AntdCollapse>
  );
};

const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    obj: {
      type: 'object',
      widget: 'MyCard',
      title: '卡片主题',
      description: '这是一个对象类型',
      properties: {
        input1: {
          required: true,
          title: '输入框 A',
          type: 'string',
          widget: 'input',
        },
        input2: {
          title: '输入框 B',
          type: 'string',
          widget: 'input',
        },
        input3: {
          title: '输入框 C',
          type: 'string',
          widget: 'input',
        },
      },
    },
    obj1: {
      type: 'object',
      widget: 'MyCard',
      title: '卡片主题2',
      properties: {
        input4: {
          title: '输入框 A',
          type: 'string',
          widget: 'input',
        },
        input5: {
          title: '输入框 B',
          type: 'string',
          widget: 'input',
        },
      },
    }
  },
};


const App = () => {
  const form = useForm();

  const onFinish = (formData) => {
    Dialog.alert({
      content: <pre>{JSON.stringify(formData, null, 2)}</pre>,
    })
    console.log(formData);
  };

  return (
    <div>
      <FormRender
        schema={schema}
        form={form}
        onFinish={onFinish}
        widgets={{ MyCard }}
        footer={
          <Button block type='submit' color='primary' size='large'>
            提交
          </Button>
        }
      />
    </div>
  );
}

export default App;