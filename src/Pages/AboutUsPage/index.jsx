import { Button, Form, Input } from 'antd';
import { useEffect } from 'react';
import {
  useCreateOrUpdateSpecificPageDataMutation,
  useGetSpecificPageDataQuery,
} from '../../redux/features/adminApis';
import { toast } from 'sonner';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AboutUsPage = () => {
  const [form] = Form.useForm();

  const [createOrUpdateSpecificPageData, { isLoading: isSaving }] =
    useCreateOrUpdateSpecificPageDataMutation();

  const {
    data: aboutUsRes,
    isLoading,
    isError,
    refetch,
  } = useGetSpecificPageDataQuery({ type: 'about-us' });

  useEffect(() => {
    const resolved =
      aboutUsRes?.data && typeof aboutUsRes.data === 'object'
        ? aboutUsRes.data
        : aboutUsRes;

    const record =
      resolved?.data && typeof resolved.data === 'object'
        ? resolved.data
        : resolved;

    form.setFieldsValue({
      title: record?.title ?? '',
      content: record?.content ?? '',
    });
  }, [aboutUsRes, form]);

  const handleSave = async values => {
    try {
      const res = await createOrUpdateSpecificPageData({
        data: {
          type: 'about-us',
          title: values.title,
          content: values.content,
        },
      }).unwrap();

      if (res?.success) {
        toast.success('About Us updated successfully!');
        refetch();
      } else {
        toast.error(res?.message ?? 'Failed to update About Us!');
      }
    } catch (error) {
      toast.error(error?.data?.message ?? 'Failed to update About Us!');
    }
  };

  return (
    <div className="bg-white p-6 rounded-md">
      <h3 className="text-xl md:text-2xl font-semibold text-textColor mb-6">
        About Us
      </h3>

      <Form form={form} layout="vertical" onFinish={handleSave}>
        <Form.Item
          name="title"
          label={<span className="font-semibold">Title</span>}
        >
          <Input size="large" placeholder="Enter title" disabled={isLoading} />
        </Form.Item>

        <Form.Item
          name="content"
          label={<span className="font-semibold">Content</span>}
          valuePropName="value"
          trigger="onChange"
          getValueFromEvent={value => value}
        >
          <ReactQuill theme="snow" readOnly={isLoading} />
        </Form.Item>

        {isError && !isLoading && (
          <div className="text-red-500 text-sm">Failed to load about us</div>
        )}

        <div className="flex justify-end">
          <Button
            type="primary"
            htmlType="submit"
            loading={isSaving}
            disabled={isLoading}
          >
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AboutUsPage;
