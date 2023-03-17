import "./style.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SideBar = (props) => {
  return (
    <ul className="sidebar mt-3">
      <li>
        <div className="sidebar-item">
          <Link to="/task" className="sidebar-link">
            <FontAwesomeIcon icon="home" /> <span>Task</span>
          </Link>
        </div>
      </li>
      <li>
        <div className="sidebar-item">
          <Link to="/myday" className="sidebar-link">
            <FontAwesomeIcon icon="search" />
            <span>Ngày của tôi</span>
          </Link>
        </div>
      </li>
      <li>
        <div className="sidebar-item">
          <Link to="/task/important" className="sidebar-link">
            <FontAwesomeIcon icon="star" />
            <span>Quan trọng</span>
          </Link>
        </div>
      </li>
      <li>
        <div className="sidebar-item">
          <Link to="/planned" className="sidebar-link">
            <FontAwesomeIcon icon="calendar" />
            <span>Đã lập kế hoạch</span>
          </Link>
        </div>
      </li>
    </ul>
  );
};

export default SideBar;
