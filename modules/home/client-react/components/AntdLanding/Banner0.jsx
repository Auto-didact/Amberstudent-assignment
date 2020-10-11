import React from "react";
import {
  Button,
  Icon,
  Select,
  Row,
  Col,
  Dropdown,
  Menu,
  Input,
  Card,
  Skeleton,
  Avatar,
  Divider,
  Typography,
} from "antd";
import { mapMarkerAlt } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import QueueAnim from "rc-queue-anim";
import TweenOne from "rc-tween-one";
import { isImg } from "./utils";

const { Option } = Select;
const { Title } = Typography;
const { Meta } = Card;

const Banner00DataSource = {
  wrapper: { className: "banner0" },
  textWrapper: { className: "banner0-text-wrapper" },
  title: {
    className: "banner0-title",
    children:
      "https://res.cloudinary.com/www-lenshood-in/image/upload/v1580223483/nodejs-starterkit/untitled_4.svg",
  },
  content: {
    className: "banner0-content",
    children: "An All JavaScript Solution For Your App Needs",
  },
  button: { className: "banner0-button", children: "Learn More" },
};

const urlP =
  "https://base.amberstudent.com/api/v0/regions?sort_key=search_name&sort_order=desc&states=active&search_name=";

class Banner extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      searchParam: null,
      loading: false,
      data: null,
      suggestLoading: true,
      suggestData: null,
    };
  }

  setVisible = (param) => {
    this.setState({ visible: param });
  };

  onChange(value) {
    console.log(`selected ${value}`);
  }

  onBlur() {
    console.log("blur");
  }

  onFocus() {
    console.log("focus");
  }

  onSearch = async (val) => {
    console.log("search:", val);

    this.setState({ searchParam: val });
    // if (val.length > 2) {
    this.setState({ loading: true });
    this.getData();
    // }
  };

  componentDidMount() {
    fetch(urlP + "&limit=5")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            suggestData: result,
            suggestLoading: false,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block   so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            suggestLoading: false,
            error,
          });
        }
      );
  }

  getData = () => {
    const { searchParam } = this.state;
    fetch(urlP + searchParam + "&limit=5")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            data: result,
            loading: false,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            loading: false,
            error,
          });
        }
      );
  };

  render() {
    const { ...currentProps } = this.props;
    const {
      data,
      searchParam,
      loading,
      visible,
      suggestLoading,
      suggestData,
    } = this.state;
    const dataSource = Banner00DataSource;
    delete currentProps.isMobile;

    // const dataP =  this.getData();
    console.log("dataP", searchParam, data, loading);
    return (
      <div>
        <div {...currentProps} {...dataSource.wrapper}>
          <QueueAnim
            key="QueueAnim"
            type={["bottom", "top"]}
            delay={200}
            {...dataSource.textWrapper}
          >
            {/* <div key="title" {...dataSource.title}>
            {typeof dataSource.title.children === 'string' && dataSource.title.children.match(isImg) ? (
              <img src={dataSource.title.children} width="100%" alt="img" />
            ) : (
              dataSource.title.children
            )}
          </div> */}
            <div key="content" className="banner0-title">
              Home away from Home
            </div>
            <br />
            <br />
            <br />
            <Row className="banner-select">
              <Col span={20}>
                <Dropdown
                  placement="bottomCenter"
                  visible={visible}
                  overlay={
                    <Menu style={{ paddingBottom: "0" }}>
                      {loading ||
                      !searchParam ||
                      (searchParam && searchParam.length < 3) ||
                      !data ||
                      (data && !data.data) ||
                      (data &&
                        data.data &&
                        data.data.result &&
                        data.data.result.length == 0) ? (
                        [...Array(3).keys()].map((kk) => (
                          <Menu.Item key={kk}>
                            <Card
                              bordered={false}
                              style={{
                                borderRadius: "0",
                                borderBottom: "2px solid #f3f3f3",
                              }}
                              bodyStyle={{ padding: "10px" }}
                            >
                              <Meta
                                avatar={
                                  <div style={{ padding: "10px" }}>
                                    <Avatar
                                      size={25}
                                      src="https://res.cloudinary.com/approxyma/image/upload/v1602229648/1479569_p9ehdf.svg"
                                    />
                                  </div>
                                }
                                title={
                                  <div style={{ marginTop: "-15px" }}>
                                    <Skeleton active paragraph={{ rows: 1 }} />
                                  </div>
                                }
                              />
                            </Card>
                          </Menu.Item>
                        ))
                      ) : (
                        <>
                          {data.data.result.map((item, key) => (
                            <Menu.Item key={key}>
                              <Card
                                bordered={false}
                                style={{
                                  borderRadius: "0",
                                  borderBottom: "2px solid #f3f3f3",
                                }}
                                bodyStyle={{ padding: "10px" }}
                              >
                                <Meta
                                  avatar={
                                    <div style={{ padding: "10px" }}>
                                      <Avatar
                                        size={25}
                                        src="https://res.cloudinary.com/approxyma/image/upload/v1602229648/1479569_p9ehdf.svg"
                                      />
                                    </div>
                                  }
                                  title={item.name}
                                  description={
                                    <p style={{ marginTop: "-5px" }}>
                                      {item.secondary_name != ""
                                        ? item.secondary_name
                                        : item.region_type}
                                    </p>
                                  }
                                />
                              </Card>
                            </Menu.Item>
                          ))}
                        </>
                      )}
                    </Menu>
                  }
                >
                  <Input
                    onFocus={() => {
                      this.setVisible(true);
                    }}
                    onBlur={() => {
                      this.setVisible(false);
                    }}
                    placeholder="input search text"
                    enterButton="Search"
                    size="large"
                    onChange={(e) => {
                      this.onSearch(e.target.value);
                    }}
                    // onSearch={value => console.log(value)}
                  />
                </Dropdown>
                {/* <Select
              allowClear
              autoClearSearchValue={false}
                defaultValue={searchParam}
                showSearch
                enterButton="Search"
                style={{ width: "100%" }}
                placeholder="Select a person"
                // optionFilterProp="children"
                // onChange={this.onChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onSearch={this.onSearch}
                searchValue={}
                // filterOption={(input, option) =>
                //   option.props.children
                //     .toLowerCase()
                //     .indexOf(input.toLowerCase()) >= 0
                // }
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="tom">Tom</Option>
              </Select> */}
              </Col>
              <Col span={4}>
                <Button type="primary" block icon="search" />
              </Col>
            </Row>
          </QueueAnim>
          {/* <TweenOne
          animation={{
            y: '-=20',
            yoyo: true,
            repeat: -1,
            duration: 1000
          }}
          className="banner0-icon"
          key="icon"
        >
          <Icon type="down" />
        </TweenOne> */}
        </div>
        <Divider />
        <div style={{ position: "relative" }}>
          <br />
          <div style={{ maxWidth: "1200px", margin: "auto", padding: "24px" }}>
            <Title level={2}>Suggested Location</Title>

            <Row gutter={24}>
              {suggestLoading ||
                !suggestData ||
                (suggestData && !suggestData.data) ||
                (suggestData &&
                suggestData.data &&
                suggestData.data.result &&
                suggestData.data.result.length == 0
                  ? [...Array(3).keys()].map((kk) => (
                      <Col key={kk} xs={24} md={8} lg={6}>
                        <Card style={{ marginBottom: "10px" }}>
                          <Skeleton active paragraph={{ rows: 1 }} />
                        </Card>
                      </Col>
                    ))
                  : suggestData.data.result.map((rest, keu) => (
                      <Col key={keu} xs={24} md={8} lg={6}>
                        <Card
                          style={{ marginBottom: "10px" }}
                          title={<Title level={3}>{rest.name}</Title>}
                        >
                          {rest.secondary_name != ""
                            ? rest.secondary_name
                            : rest.region_type}
                        </Card>
                      </Col>
                    )))}
            </Row>
          </div>
        </div>
      </div>
    );
  }
}
export default Banner;
