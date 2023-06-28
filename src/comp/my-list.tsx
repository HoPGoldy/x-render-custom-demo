import FormRender, { useForm } from "form-render";
import { Button, FormListFieldData, Table, TableColumnsType } from 'antd';
import sortProperties from "form-render/es/models/sortProperties";

const FIELD_LENGTH = 170;

const MyList = (compProps) => {
  console.log("🚀 ~ MyList props:", compProps)
  const {
    fields = [],
    removeItem,
    addItem,
    rootPath,
    schema,
    renderCore,
  } = compProps;
  const itemSchema = schema?.items?.properties || {};

  const { props = {} } = schema;
  const { pagination = {}, ...rest } = props;

  const paginationConfig = pagination && {
    size: 'small',
    hideOnSinglePage: true,
    ...pagination,
  };

  const columns: TableColumnsType<FormListFieldData> = sortProperties(Object.entries(itemSchema)).map(([dataIndex, item]) => {
    return {
      dataIndex,
      width: item.width || FIELD_LENGTH,
      title: item.title,
      render: (_, field) => {
        const fieldSchema = {
          type: 'object',
          properties: {
            [dataIndex]: {
              ...itemSchema[dataIndex],
              fieldCol: { span: 24 },
            }
          }
        };

        return (
          <div className='fr-table-cell-content'>
            {
              renderCore({
                parentPath: [field.name],
                rootPath: [...rootPath, field.name],
                schema: fieldSchema
              })
            }
          </div>
        )
      }
    };
  });

  columns.push({
    title: '操作',
    key: '$action',
    fixed: 'right',
    align: 'center',
    width: 80,
    render: (value, record) => {
      return (
        <div>
          {!props.hideDelete && (
            <Button type='text' danger onClick={() => removeItem(record.name)}>
              删除
            </Button>
          )}
        </div>
      );
    },
  });

  return (
    <div style={{ width: '100%' }} className="fr-table-list">
      <Table
        scroll={{ x: 'max-content' }}
        columns={columns}
        dataSource={fields}
        rowKey='index'
        size='small'
        pagination={paginationConfig}
        {...rest}
      />
      <Button block style={{ marginTop: 8 }} type='dashed' onClick={() => addItem()}>
        新增
      </Button>
    </div>
  );
};

const schema = {
  type: 'object',
  displayType: 'row',
  properties: {
    list: {
      title: '活动模版',
      type: 'array',
      widget: 'MyList',
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
      widgets={{ MyList }}
    />
  );
}

export default App
