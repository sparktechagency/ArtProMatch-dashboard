import { Button, ConfigProvider, Form, Input, Modal, Table, Tag } from 'antd';
import { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import {
  useCreateFaqMutation,
  useDeleteFaqMutation,
  useGetAllFaqsQuery,
  useUpdateFaqMutation,
} from '../../redux/features/adminApis';
import { toast } from 'sonner';

const Faqs = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [searchTermInput, setSearchTermInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedFaqForView, setSelectedFaqForView] = useState(null);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createFaqForm] = Form.useForm();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [faqForEditing, setFaqForEditing] = useState(null);
  const [editFaqForm] = Form.useForm();

  const { data, isLoading, isError, refetch } = useGetAllFaqsQuery({
    page,
    limit,
    searchTerm,
  });

  const [createFaq, { isLoading: isCreating }] = useCreateFaqMutation();
  const [updateFaq, { isLoading: isUpdating }] = useUpdateFaqMutation();
  const [deleteFaq, { isLoading: isDeleting }] = useDeleteFaqMutation();

  const meta = data?.meta;
  const faqRows = data?.data || [];

  const formatDate = iso => {
    if (!iso) return '-';
    try {
      return new Date(iso).toLocaleString();
    } catch {
      return '-';
    }
  };

  const publishedTag = value => (
    <Tag color={value ? 'green' : 'red'} className="capitalize">
      {value ? 'Published' : 'Unpublished'}
    </Tag>
  );

  const handleSearch = () => {
    setPage(1);
    setSearchTerm(searchTermInput);
  };

  const showModal = record => {
    setSelectedFaqForView(record);
    setIsViewModalOpen(true);
  };

  const handleCancel = () => {
    setIsViewModalOpen(false);
    setSelectedFaqForView(null);
  };

  // showCreateModal
  const showCreateModal = () => {
    // createForm.resetFields();
    setIsCreateModalOpen(true);
  };

  // handleCreateCancel
  const handleCreateCancel = () => {
    setIsCreateModalOpen(false);
    // createForm.resetFields();
  };

  // handleCreateSubmit
  const handleCreateSubmit = async values => {
    try {
      const res = await createFaq({
        data: {
          question: values.question,
          answer: values.answer,
        },
      }).unwrap();

      if (res?.success) {
        toast.success(res?.message ?? 'FAQ created successfully!');
        handleCreateCancel();
        refetch();
      } else {
        toast.error(res?.message ?? 'Failed to create FAQ!');
      }
    } catch (error) {
      toast.error(error?.data?.message ?? 'Failed to create FAQ!');
    }
  };

  const showEditModal = record => {
    setFaqForEditing(record);
    editFaqForm.setFieldsValue({
      question: record?.question ?? '',
      answer: record?.answer ?? '',
    });
    setIsEditModalOpen(true);
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
    setFaqForEditing(null);
    editFaqForm.resetFields();
  };

  const handleEditSubmit = async values => {
    if (!faqForEditing?._id) return;

    try {
      const res = await updateFaq({
        _id: faqForEditing._id,
        data: {
          question: values.question,
          answer: values.answer,
        },
      }).unwrap();

      if (res?.success) {
        toast.success(res?.message ?? 'FAQ updated successfully!');
        handleEditCancel();
        refetch();
      } else {
        toast.error(res?.message ?? 'Failed to update FAQ!');
      }
    } catch (error) {
      toast.error(error?.data?.message ?? 'Failed to update FAQ!');
    }
  };

  const confirmDelete = record => {
    Modal.confirm({
      title: 'Delete FAQ?',
      content:
        'Are you sure you want to delete this FAQ? This action cannot be undone.',
      okText: 'Delete',
      okButtonProps: { danger: true, loading: isDeleting },
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          const res = await deleteFaq({ _id: record?._id }).unwrap();
          if (res?.success) {
            toast.success(res?.message ?? 'FAQ deleted successfully');
            if (selectedFaqForView?._id === record?._id) {
              handleCancel();
            }
            if (faqForEditing?._id === record?._id) {
              handleEditCancel();
            }
            refetch();
          }
        } catch (error) {
          toast.error(error?.data?.message ?? 'Failed to delete FAQ');
        }
      },
    });
  };

  const columns = [
    {
      title: 'Sl No',
      key: 'slno',
      render: (text, record, index) =>
        (meta?.page ? (meta.page - 1) * limit : 0) + index + 1,
    },
    {
      title: 'Question',
      dataIndex: 'question',
      key: 'question',
      render: value => (
        <span className="text-gray-800 line-clamp-2">{value || '-'}</span>
      ),
    },
    {
      title: 'Answer',
      dataIndex: 'answer',
      key: 'answer',
      render: value => (
        <span className="text-gray-700 line-clamp-2">{value || '-'}</span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'isPublished',
      key: 'isPublished',
      render: value => publishedTag(Boolean(value)),
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: value => (
        <span className="text-gray-600">{formatDate(value)}</span>
      ),
    },
    {
      title: 'Updated',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: value => (
        <span className="text-gray-600">{formatDate(value)}</span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <Button type="default" onClick={() => showModal(record)}>
            View
          </Button>
          <Button type="primary" onClick={() => showEditModal(record)}>
            Edit
          </Button>
          <Button danger onClick={() => confirmDelete(record)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-10">
        <h3 className="text-xl md:text-2xl font-semibold text-textColor px-2 md:px-0">
          Faqs: {meta?.total}
        </h3>
        {/* <div className="mt-4 md:mt-0 flex justify-between items-center gap-2">
          <div>
            <ConfigProvider
              theme={{
                components: {
                  Input: {
                    borderRadius: 0,
                    hoverBorderColor: 'none',
                    activeBorderColor: 'none',
                  },
                },
              }}
            >
              <div className="flex gap-2 items-center relative">
                <Input
                  placeholder="Search by name"
                  allowClear
                  size="large"
                  value={nameInput}
                  onChange={e => {
                    const next = e.target.value;
                    setNameInput(next);
                    if (!next) {
                      setPage(1);
                      setSearchName('');
                    }
                  }}
                  onPressEnter={handleSearch}
                  prefix={
                    <SearchOutlined
                      style={{ cursor: 'pointer' }}
                      onClick={handleSearch}
                    />
                  }
                />

                <button
                  onClick={handleSearch}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-primaryColor text-white p-2 rounded-r-lg"
                >
                  search
                </button>
              </div>
            </ConfigProvider>
          </div>
        </div> */}
      </div>

      <div className="flex justify-end items-center gap-5 mt-4">
        <div>
          <ConfigProvider
            theme={{
              components: {
                Input: {
                  borderRadius: 0,
                  hoverBorderColor: 'none',
                  activeBorderColor: 'none',
                },
              },
            }}
          >
            <div className="flex gap-2 items-center relative">
              <Input
                placeholder="Search"
                allowClear
                size="large"
                value={searchTermInput}
                onChange={e => {
                  const next = e.target.value;
                  setSearchTermInput(next);
                  if (!next) {
                    setPage(1);
                    setSearchTerm('');
                  }
                }}
                onPressEnter={handleSearch}
                prefix={
                  <SearchOutlined
                    style={{ cursor: 'pointer' }}
                    onClick={handleSearch}
                  />
                }
              />
              <button
                onClick={handleSearch}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-primary text-white p-2 rounded-r-lg"
              >
                Search
              </button>
            </div>
          </ConfigProvider>
        </div>
      </div>

      <div className="flex justify-end items-center mt-3">
        <Button type="primary" onClick={showCreateModal}>
          Create FAQ
        </Button>
      </div>

      <div className="mt-4 bg-white overflow-x-auto">
        <Table
          columns={columns}
          dataSource={faqRows}
          loading={isLoading}
          pagination={{
            current: meta?.page || page,
            pageSize: meta?.limit || limit,
            total: meta?.total || 0,
            showSizeChanger: true,
            onChange: (nextPage, nextPageSize) => {
              setPage(nextPage);
              if (nextPageSize !== limit) {
                setLimit(nextPageSize);
              }
            },
          }}
          rowKey="_id"
        />
        {isError && !isLoading && (
          <div className="p-4 text-red-500 text-sm">Failed to load faqs</div>
        )}
      </div>

      <Modal
        open={isViewModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={700}
      >
        {selectedFaqForView && (
          <div className="p-2">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-lg font-semibold">
                FAQ Id: {selectedFaqForView?._id}
              </h2>
              <p className="text-gray-600 text-sm">
                {formatDate(selectedFaqForView?.createdAt)}
              </p>
            </div>

            <div className="border p-3 my-4">
              <h3 className="font-semibold border-b pb-1">Question</h3>
              <p className="text-gray-800 text-sm">
                {selectedFaqForView?.question || '-'}
              </p>
            </div>

            <div className="border p-3 my-4">
              <h3 className="font-semibold border-b pb-1">Answer</h3>
              <p className="text-gray-700 text-sm whitespace-pre-line">
                {selectedFaqForView?.answer || '-'}
              </p>
            </div>

            <div className="border p-3 my-4">
              <h3 className="font-semibold border-b pb-1">Status</h3>
              <div className="mt-2">
                {publishedTag(Boolean(selectedFaqForView?.isPublished))}
              </div>
              <p className="text-gray-600 text-sm mt-2">
                <strong>Created:</strong>{' '}
                {formatDate(selectedFaqForView?.createdAt)}
              </p>
              <p className="text-gray-600 text-sm">
                <strong>Updated:</strong>{' '}
                {formatDate(selectedFaqForView?.updatedAt)}
              </p>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        open={isEditModalOpen}
        onCancel={handleEditCancel}
        footer={null}
        width={700}
        destroyOnClose
      >
        <div className="p-2">
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-lg font-semibold">
              Edit FAQ Id: {faqForEditing?._id}
            </h2>
            <p className="text-gray-600 text-sm">
              {formatDate(faqForEditing?.updatedAt)}
            </p>
          </div>

          <Form
            form={editFaqForm}
            layout="vertical"
            className="mt-4"
            onFinish={handleEditSubmit}
          >
            <Form.Item
              name="question"
              label={<span className="font-semibold">Question</span>}
              rules={[
                { required: true, message: 'Please enter question' },
                {
                  min: 10,
                  message: 'Question must be at least 10 characters',
                },
              ]}
            >
              <Input size="large" placeholder="Enter question" />
            </Form.Item>

            <Form.Item
              name="answer"
              label={<span className="font-semibold">Answer</span>}
              rules={[
                { required: true, message: 'Please enter answer' },
                {
                  min: 20,
                  message: 'Answer must be at least 20 characters',
                },
              ]}
            >
              <Input.TextArea rows={6} placeholder="Enter answer" />
            </Form.Item>

            <div className="flex justify-end gap-2">
              <Button onClick={handleEditCancel}>Cancel</Button>
              <Button type="primary" htmlType="submit" loading={isUpdating}>
                Save
              </Button>
            </div>
          </Form>
        </div>
      </Modal>

      <Modal
        open={isCreateModalOpen}
        onCancel={handleCreateCancel}
        footer={null}
        width={700}
        destroyOnClose
      >
        <div className="p-2">
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-lg font-semibold">Create FAQ</h2>
          </div>

          <Form
            form={createFaqForm}
            layout="vertical"
            className="mt-4"
            onFinish={handleCreateSubmit}
          >
            <Form.Item
              name="question"
              label={<span className="font-semibold">Question</span>}
              rules={[
                { required: true, message: 'Please enter question' },
                {
                  min: 10,
                  message: 'Question must be at least 10 characters',
                },
              ]}
            >
              <Input size="large" placeholder="Enter question" />
            </Form.Item>

            <Form.Item
              name="answer"
              label={<span className="font-semibold">Answer</span>}
              rules={[
                { required: true, message: 'Please enter answer' },
                {
                  min: 20,
                  message: 'Answer must be at least 20 characters',
                },
              ]}
            >
              <Input.TextArea rows={6} placeholder="Enter answer" />
            </Form.Item>

            <div className="flex justify-end gap-2">
              <Button onClick={handleCreateCancel}>Cancel</Button>
              <Button type="primary" htmlType="submit" loading={isCreating}>
                Create
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default Faqs;
