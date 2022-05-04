import { useRef, useState } from "react";
import { Button, message, Popconfirm } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ProTable, { ProColumns } from "@ant-design/pro-table";
import { ModalForm, ProFormInstance, ProFormText } from "@ant-design/pro-form";

import {
  TeamMember,
  useTeamMembers,
  addTeamMember,
  deleteTeamMember,
  mutateTeamMembers,
} from "../libs/api";

export default function TeamMembers() {
  const { data, isValidating, mutate } = useTeamMembers();

  const onDelete = async (item: any) => {
    setConfirmLoading(true);
    await deleteTeamMember(item.id);
    setConfirmLoading(false);
    await mutate();
  };
  const [confirmLoading, setConfirmLoading] = useState(false);

  const columns: ProColumns<TeamMember, "text">[] = [
    {
      title: "Email",
      dataIndex: "email",
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
    <ProTable<TeamMember>
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
      toolbar={{ title: "Team Members" }}
      toolBarRender={() => [<AddMemberFormModal />]}
    />
  );
}

function AddMemberFormModal() {
  const formRef = useRef<ProFormInstance>();

  return (
    <ModalForm<{ email: string }>
      formRef={formRef}
      title="添加团队成员"
      trigger={
        <Button type="primary">
          <PlusOutlined /> 添加团队成员
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
        const result = await addTeamMember(values.email);

        if (result.ok) {
          message.success("添加成员成功");
          mutateTeamMembers();
          return true;
        }
        if (result.error?.validationErrors?.find((x) => x.name === "email")) {
          message.error("成员已存在");
          return true;
        }
        message.error("添加成员失败 " + result.error?.message);
      }}
    >
      <ProFormText name="email" label="Email" placeholder="请输入 Email" />
    </ModalForm>
  );
}
