import { useRef, useState } from "react";
import { Button, message, Popconfirm } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ProTable, { ProColumns } from "@ant-design/pro-table";
import { ModalForm, ProFormInstance, ProFormText } from "@ant-design/pro-form";

import {
  Workspace,
  useWorkspaces,
  addWorkspace,
  deleteWorkspace,
  mutateWorkspaces,
} from "../libs/api";
import { ServerExceptionDto } from "../libs/api";

export default function Workspaces() {
  const { data, isValidating, mutate } = useWorkspaces();

  const onDelete = async (item: any) => {
    setConfirmLoading(true);
    await deleteWorkspace(item.id);
    setConfirmLoading(false);
    await mutate();
  };
  const [confirmLoading, setConfirmLoading] = useState(false);

  const columns: ProColumns<Workspace, "text">[] = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      valueType: "date",
    },
    {
      title: "操作",
      width: 180,
      key: "option",
      valueType: "option",
      render: (_: any, item: any) => [
        <Popconfirm
          key="delete"
          title="确定删除吗？"
          onConfirm={() => onDelete(item)}
          okButtonProps={{ loading: confirmLoading }}
        >
          <Button type="link">删除</Button>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <ProTable<Workspace>
      search={false}
      columns={columns}
      dataSource={data}
      loading={isValidating}
      rowKey="id"
      pagination={{
        pageSize: 20,
        showQuickJumper: false,
        showSizeChanger: false,
      }}
      request={() => mutate()}
      dateFormatter="string"
      toolbar={{ title: "Workspaces" }}
      toolBarRender={() => [<AddWorkspaceFormModal />]}
    />
  );
}

function AddWorkspaceFormModal() {
  const formRef = useRef<ProFormInstance>();

  return (
    <ModalForm<{ name: string }>
      formRef={formRef}
      title="添加 Workspace"
      trigger={
        <Button type="primary">
          <PlusOutlined /> 添加 Workspace
        </Button>
      }
      width={500}
      autoFocusFirstInput
      submitTimeout={2000}
      onVisibleChange={(visible) => {
        if (!visible) {
          formRef.current?.resetFields();
        }
      }}
      onFinish={async (values) => {
        const response = await addWorkspace(values.name);
        if (!response) {
          return;
        }
        if (response.ok) {
          message.success("添加 Workspace 成功");
          mutateWorkspaces();
          return true;
        }
        const err: ServerExceptionDto = await response.json();
        message.error("添加 Workspace 失败 " + err.message);
      }}
    >
      <ProFormText
        name="name"
        label="Name"
        placeholder="请输入 Workspace 名称"
      />
    </ModalForm>
  );
}
