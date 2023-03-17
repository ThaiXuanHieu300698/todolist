import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";

const Profile = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [firstName, ...lastName] = user.fullName.split(" ");
  return (
    <div className="task-page">
      <div className="text-center">
        <Header />
      </div>
      <div className="container-fluid">
        <div className="row" style={{ height: "100vh" }}>
          <div className="col-left col-md-2 p-0">
            <SideBar />
          </div>
          <div
            className="col-center col-md-10"
            style={{ backgroundColor: "white", height: "100%" }}
          >
            <h5 className="m-3" style={{ color: "#3e69e4" }}>
              Hồ sơ
            </h5>
            <div className="ml-3">
              <p>Họ : {firstName}</p>
              <p>Tên : {lastName.join(" ")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
