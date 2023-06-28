import FormRender, { useForm } from "form-render";

const schema = {
  type: "object",
  displayType: "row",
  properties: {
    obj: {
      type: "object",
      title: "卡片主题",
      description: "这是一个对象类型",
      widget: "collapse",
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
    />
  );
}

export default App
