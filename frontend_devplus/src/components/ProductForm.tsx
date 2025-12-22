import { Form, Input, InputNumber, Select, type FormInstance } from 'antd';
import { TagOutlined, DollarOutlined, EditOutlined, LinkOutlined, BoxPlotOutlined } from '@ant-design/icons';

interface ProductFormProps {
  form: FormInstance;
  onFinish: (values: any) => void;
  categories: any[];
}

const ProductForm = ({ form, onFinish, categories }: ProductFormProps) => {
  return (
    <Form form={form} layout="vertical" onFinish={onFinish} className="pt-4">
      <Form.Item
        name="name"
        label={<span className="flex items-center gap-2 font-medium"><EditOutlined className="text-blue-500" /> Tên sản phẩm</span>}
        rules={[{ required: true, message: 'Nhập tên sản phẩm!' }]}
      >
        <Input placeholder="Tên sản phẩm..." className="h-10" />
      </Form.Item>

      <div className="grid grid-cols-2 gap-4">
        <Form.Item
          name="price"
          label={<span className="flex items-center gap-2 font-medium"><DollarOutlined className="text-green-500" /> Giá tiền</span>}
          rules={[{ required: true, message: 'Nhập giá!' }]}
        >
          <InputNumber 
            className="w-full !h-10 !flex items-center" 
            placeholder="0.000"
            formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          />
        </Form.Item>

        <Form.Item
          name="stock"
          label={<span className="flex items-center gap-2 font-medium"><BoxPlotOutlined className="text-purple-500" /> Số lượng</span>}
          rules={[{ required: true, message: 'Nhập số lượng!' }]}
        >
          <InputNumber className="w-full !h-10 !flex items-center" placeholder="0" min={0} />
        </Form.Item>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <Form.Item
          name="categoryId"
          label={<span className="flex items-center gap-2 font-medium"><TagOutlined className="text-orange-500" /> Phân loại</span>}
          rules={[{ required: true, message: 'Chọn loại!' }]}
        >
          <Select 
            placeholder="Chọn loại" 
            className="h-10" 
            options={categories.map(c => ({ value: c.id, label: c.name }))} 
          />
        </Form.Item>
      </div>

      <Form.Item 
        name="image" 
        label={<span className="flex items-center gap-2 font-medium"><LinkOutlined className="text-pink-500" /> Link hình ảnh</span>}
      >
        <Input placeholder="https://..." className="h-10" />
      </Form.Item>
    </Form>
  );
};

export default ProductForm;