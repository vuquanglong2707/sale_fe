import React from "react";
import "antd/dist/antd.css";
import { Layout  } from "antd";

const { Footer } = Layout;

class FooterComponent extends React.Component<any, any> {
  render() {
    return (
      <Layout>
      <Footer style={{ textAlign: "center"}}>
        Design By <span style={{color:"red"}}>Quang Long</span>
      </Footer>
    </Layout>
    );
  }
}

export default FooterComponent;
