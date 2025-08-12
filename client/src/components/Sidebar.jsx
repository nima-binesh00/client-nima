import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import { NavLink } from "react-router-dom";
import CustomDropdown from "./Dropdown";
import Listtwo from "./Listtwo";
import List from "./List";

function TabsExample() {
  return (
    <Tab.Container
      id="list-group-tabs-example"
      className="vw-100"
      defaultActiveKey="#link1"
    >
      <Row className="w-100 ">
        <Col xs={3} className="bg-body d-none d-xxl-block bgdark ">
          <List />
        </Col>
        <Col className="hittmin bgdark">
          <Listtwo />
        </Col>
      </Row>
    </Tab.Container>
  );
}

export default TabsExample;
