import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as taskAction from "../../actions/taskAction";
import * as stepAction from "../../actions/stepAction";
import * as fileAction from "../../actions/fileAction";
import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import TaskDetail from "./TaskDetail";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Icon } from "@material-ui/core";
//import firebaseDb from "../../firebase";
//import { HubConnectionBuilder } from "@microsoft/signalr";

const TaskPage = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { list, task } = useSelector((state) => state.task);
  const [isShow, setIsShow] = useState(false);
  //const [connection, setConnection] = useState();
  const dispatch = useDispatch();

  //const [taskObjects, setTaskObjects] = useState();

  // useEffect(() => {
  //   firebaseDb.child("Tasks").on("value", (snapshot) => {
  //     if (snapshot.val() != null) {
  //       setTaskObjects({
  //         ...snapshot.val(),
  //       });
  //     }
  //   });
  // });

  // useEffect(() => {
  //   const connect = new HubConnectionBuilder()
  //     .withUrl("https://localhost:12345/hubs/notifications")
  //     .withAutomaticReconnect()
  //     .build();

  //   setConnection(connect);
  // }, []);

  // useEffect(() => async () => {
  //   if (connection) await connection.send("PushNotification", "Task ... đã quá hạn");
  // }, [connection]);

  // useEffect(() => {
  //   if (connection) {
  //     connection
  //       .start()
  //       .then(() => {
  //         connection.on("ReceiveNotify", (message) => {
  //           if (!window.Notification) {
  //             console.log("Trình duyệt không hỗ trợ thông báo.");
  //           } else {
  //             // check if permission is already granted
  //             if (Notification.permission === "granted") {
  //               // show notification here
  //               let notify = new Notification("TodoList", {
  //                 body: message,
  //                 icon: "https://ow2.res.office365.com/todo/338511_2.39.7/favicon.ico",
  //               });
  //             } else {
  //               // request permission from user
  //               Notification.requestPermission()
  //                 .then(function (p) {
  //                   if (p === "granted") {
  //                     // show notification here
  //                     let notify = new Notification("TodoList", {
  //                       body: message,
  //                       icon: "https://ow2.res.office365.com/todo/338511_2.39.7/favicon.ico",
  //                     });
  //                   } else {
  //                     console.log("Người dùng chặn thông báo.");
  //                   }
  //                 })
  //                 .catch(function (err) {
  //                   console.error(err);
  //                 });
  //             }
  //           }
  //         });
  //       })
  //       .catch((error) => console.log(error));
  //   }
  // }, [connection]);

  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    dispatch(taskAction.getTasks(user.id));
    dispatch(stepAction.getSteps());
    dispatch(fileAction.getFiles());
  }, [dispatch, user.id]);

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const sortByPredicate = (uid, predicate) => {
    dispatch(taskAction.sortByPredicate(uid, predicate));
    setOpen(false);
  };

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
            className={isShow ? "col-center col-md-7" : "col-center col-md-10"}
            style={{ backgroundColor: "white", height: "100%" }}
          >
            <div className="task-toolBar d-flex justify-content-between">
              <h5 className="m-3" style={{ color: "#3e69e4" }}>
                Task
              </h5>
              <Button
                ref={anchorRef}
                aria-controls={open ? "menu-list-grow" : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                className="btn-toolBar"
                style={{ color: "#3e69e4" }}
              >
                <Icon>sort</Icon>
                Sắp xếp
              </Button>
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                style={{ zIndex: "100" }}
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom" ? "center top" : "center bottom",
                      borderRadius: "0px",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={open}
                          id="menu-list-grow"
                          onKeyDown={handleListKeyDown}
                        >
                          <p
                            className="text-center"
                            style={{ outline: "none" }}
                          >
                            Sắp xếp theo
                          </p>
                          <hr />
                          <MenuItem
                            onClick={() =>
                              sortByPredicate(user.id, "importance")
                            }
                          >
                            <FontAwesomeIcon
                              icon="star"
                              style={{
                                color: "#767678",
                                marginRight: "10px",
                              }}
                            />
                            Tầm quan trọng
                          </MenuItem>
                          <MenuItem
                            onClick={() => sortByPredicate(user.id, "dueDate")}
                          >
                            <FontAwesomeIcon
                              icon="calendar"
                              style={{
                                color: "#767678",
                                marginRight: "10px",
                              }}
                            />
                            Ngày đến hạn
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>

            <TaskForm />
            <TaskList
              tasks={list}
              handleClickItem={() => setIsShow(true)}
              deleteItem={() => setIsShow(false)}
              //taskObjects={taskObjects}
            />
          </div>
          <div className="col-right col-md-3 p-0">
            {isShow && <TaskDetail />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
