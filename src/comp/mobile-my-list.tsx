import React from 'react';
import FormRender, { useForm } from 'form-render-mobile';
import { Button, Dialog, Form, Grid } from 'antd-mobile';
import RenderCore from 'form-render-mobile/es/render-core';

const MyList = (props) => {
  const { schema = {}, readOnly = false } = props;

  return (
    <Grid.Item span={24}>
      <Form.Array
        name={[props.id]}
        renderAdd={!readOnly ? () => (
          <span>
            添加
          </span>
        ) : undefined}
        onAdd={({ add }) => add()}
        renderHeader={({ index }, { remove }) => (
          <div>
            {schema.title && (
              <span>{schema.title} {index + 1}</span>
            )}
            {!readOnly && (
              <a onClick={() => remove(index)} style={{ float: 'right' }}>
                删除
              </a>
            )}
          </div>
        )}
      >
        {fields => fields.map(({ index, key }) => {
          return (
            <Grid columns={2} key={key}>
              {RenderCore({
                schema: schema.items,
                parentPath: [index],
                rootPath: [props.id, index]
              })}
            </Grid>
          );
        })}
      </Form.Array>
    </Grid.Item>
  );
};


const schema = {
  type: 'object',
  displayType: 'column',
  properties: {
    list: {
      title: '对象数组',
      type: 'any',
      widget: 'myList',
      items: {
        type: 'object',
        widget: 'card',
        properties: {
          input1: {
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
          input4: {
            title: '输入框 D',
            type: 'string',
            widget: 'input',
          },
        },
      },
    },
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
    <FormRender
      schema={schema}
      form={form}
      onFinish={onFinish}
      widgets={{ myList: MyList }}
      footer={
        <Button block type='submit' color='primary' size='large'>
          提交
        </Button>
      }
    />
  );
};

export default App;