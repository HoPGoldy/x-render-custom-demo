import FormRender, { useForm } from "form-render";
import { Form, Input } from 'antd'
import RenderCore from "form-render/es/render-core";

const MyCard1 = (props) => {
  return (
    <div style={{ padding: 16, margin: 16, backgroundColor: '#eee' }}>
      {props.children}
    </div>
  );
};

const MyCard2 = () => {
  return (
    <Form.Item label="内部组件" name="a123">
      <Input />
    </Form.Item>
  );
};

const MyCard3 = (props) => {
  return RenderCore({
    schema: props.schema,
    rootPath: [],
    parentPath: []
  });
};

const schema = {
  type: "object",
  displayType: "row",
  properties: {
    obj: {
      type: "object",
      title: "卡片主题",
      description: "这是一个对象类型",
      widget: "MyCard1",
      column: 3,
      properties: {
        input1: {
          title: "输入框 A",
          type: "string"
        },
        input2: {
          title: "输入框 B",
          type: "string"
        },
        input3: {
          title: "输入框 C",
          type: "string"
        },
        input4: {
          title: "输入框 D",
          type: "string"
        }
      }
    }
  }
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
      widgets={{ MyCard1, MyCard2, MyCard3 }}
    />
  );
}

export default App
