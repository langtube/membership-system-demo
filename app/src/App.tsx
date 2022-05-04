import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import "antd/dist/antd.css";
import "@ant-design/pro-form/dist/form.css";
import "@ant-design/pro-table/dist/table.css";
import "@ant-design/pro-layout/dist/layout.css";
import "@ant-design/pro-card/dist/card.css";

import { SWRGlobalConfig } from "./libs/swr";
import { Routes } from "./Routes";

function App() {
  return (
    <SWRGlobalConfig>
      <ConfigProvider locale={zhCN}>
        <Routes />
      </ConfigProvider>
    </SWRGlobalConfig>
  );
}

export default App;
