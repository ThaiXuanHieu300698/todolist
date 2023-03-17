import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as taskAction from "../../actions/taskAction";
import "./style.css";
import { GetDate } from "../../utils/formatDateTime";
import Icon from "@material-ui/core/Icon";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TaskList = (props) => {
  const [currentTask, setCurrentTask] = useState({
    taskId: 0,
    title: "",
  });

  const { list } = useSelector((state) => state.step);

  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (task) => {
    task.isComplete = !task.isComplete;
    dispatch(taskAction.update(task));
  };

  const updateImportance = (task) => {
    task.isImportant = !task.isImportant;
    dispatch(taskAction.update(task));
  };

  const loadTaskDetail = (id) => {
    props.handleClickItem();
    setTimeout(() => {
      dispatch(taskAction.getTask(id));
    }, 200);
  };
  const handleClickDelete = (id) => {
    dispatch(taskAction.remove(id));
    setOpen(false);
    props.deleteItem();
  };

  const handleRightClick = (e, task) => {
    e.preventDefault();
    setCurrentTask({
      taskId: task.id,
      title: task.title,
    });
  };

  const renderTasks = () => {
    const taskCompleted = props.tasks.filter(
      (item) => item.isComplete === true
    );

    const taskInComplete = props.tasks.filter(
      (item) => item.isComplete === false
    );

    if (list.length > 0) {
      taskCompleted.map(
        (item) => (item.steps = [...list.filter((i) => i.taskId === item.id)])
      );

      taskInComplete.map(
        (item) => (item.steps = [...list.filter((i) => i.taskId === item.id)])
      );
    }

    return (
      <div>
        {taskInComplete.map((item) => (
          <div key={item.id} className="taskItem d-flex align-items-center">
            <input
              type="checkbox"
              className="mr-3"
              title="Đánh dấu là đã hoàn thành"
              checked={item.isComplete}
              onChange={() => handleChange(item)}
            />
            <ContextMenuTrigger id="context-menu">
              <button
                className="btn-taskItem"
                onClick={() => loadTaskDetail(item.id)}
                onContextMenu={(e) => handleRightClick(e, item)}
              >
                <span className="title">{item.title}</span>
                <div className="step-dueDate">
                  {item.steps.length > 0 ? (
                    <p className="step-completed mr-5">
                      {item.steps.filter((x) => x.isComplete === true).length +
                        " "}
                      trên {item.steps.length}
                    </p>
                  ) : (
                    ""
                  )}
                  <span className="dueDate">
                    {!item.dueDate
                      ? item.dueDate
                      : GetDate(item.dueDate)}
                  </span>
                </div>
              </button>
            </ContextMenuTrigger>
            <button
              className="btn-add-important"
              onClick={() => updateImportance(item)}
              title={
                item.isImportant
                  ? "Loại bỏ mức độ quan trọng"
                  : "Đánh dấu tác vụ là quan trọng"
              }
            >
              <FontAwesomeIcon
                icon="star"
                style={item.isImportant && { color: "#3e69e4" }}
              />
            </button>
          </div>
        ))}
        {!!taskCompleted.length && (
          <h6 style={{ marginTop: "15px", marginLeft: "10px" }}>
            Đã hoàn thành
          </h6>
        )}
        {taskCompleted.map((item) => (
          <div key={item.id} className="taskItem d-flex align-items-center">
            <input
              type="checkbox"
              className="mr-3"
              title="Đánh dấu là chưa hoàn thành"
              checked={item.isComplete}
              onChange={() => handleChange(item)}
            />
            <ContextMenuTrigger id="context-menu">
              <button
                className="btn-taskItem"
                onClick={() => loadTaskDetail(item.id)}
                onContextMenu={(e) => handleRightClick(e, item)}
              >
                <del className="title">{item.title}</del>
                <div className="step-dueDate">
                  {item.steps.length > 0 ? (
                    <p className="step-completed mr-5">
                      {item.steps.filter((x) => x.isComplete === true).length +
                        " "}
                      trên {item.steps.length}
                    </p>
                  ) : (
                    ""
                  )}
                  <span className="dueDate">
                    {!item.dueDate
                      ? item.dueDate
                      : GetDate(item.dueDate)}
                  </span>
                </div>
              </button>
            </ContextMenuTrigger>

            <button
              className="btn-add-important"
              onClick={() => updateImportance(item)}
              title={
                item.isImportant
                  ? "Loại bỏ mức độ quan trọng"
                  : "Đánh dấu tác vụ là quan trọng"
              }
            >
              <FontAwesomeIcon
                icon="star"
                style={item.isImportant && { color: "#3e69e4" }}
              />
            </button>
          </div>
        ))}
        <ContextMenu id="context-menu">
          <MenuItem>
            <span>Thêm vào...</span>
          </MenuItem>
          <MenuItem divider />
          <MenuItem
            data={{ taskId: currentTask.id, title: currentTask.title }}
            onClick={handleClickOpen}
            className="text-danger"
          >
            <Icon>delete</Icon> <span>Xóa tác vụ</span>
          </MenuItem>
        </ContextMenu>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            "{currentTask.title}" sẽ bị xóa vĩnh viễn.
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Bạn sẽ không thể hoàn tác hành động này.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button onClick={handleClose} className="btn btn-default">
              Hủy bỏ
            </button>
            <button
              onClick={() => handleClickDelete(currentTask.taskId)}
              className="btn btn-danger"
            >
              Xóa tác vụ
            </button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  return <div>{renderTasks()}</div>;
};

export default TaskList;
