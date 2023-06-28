import FormRender, { useForm } from "form-render";

const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    list: {
      title: '活动模版',
      type: 'array',
      widget: 'TableList',
      items: {
        type: 'object',
        properties: {
          input1: {
            title: '输入框 A',
            type: 'string',
          },
          input2: {
            title: '输入框 B',
            type: 'string',
          },
          input3: {
            title: '输入框 C',
            type: 'string',
          },
        },
      },
    },
  },
};

function App() {
  const form = useForm();

  const onFinish = (formData) => {
    console.log('formData:', formData);
  };

  return (
    <FormRender
      schema={schema}
      form={form}
      onFinish={onFinish}
      footer={true}
    />
  );
}

export default App
