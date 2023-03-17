import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as taskAction from "../../actions/taskAction";
import Step from "../Step/Step";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";
import {
  FormatHour,
  FormatMinutes,
  NewDateTime,
} from "../../utils/formatDateTime";
import File from "../File/File";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import firebaseDb from "../../firebase";

const TaskDetail = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { list, task } = useSelector((state) => state.task);
  const dispatch = useDispatch();
  const [titleTask, setTitleTask] = useState("");
  const [dueDate, setDueDate] = useState();
  const [hour, setHour] = useState();
  const [minute, setMinute] = useState();

  useEffect(() => {
    setTitleTask(task.title);
  }, [task.title]);

  useEffect(() => {
    if (task.dueDate) {
      setDueDate(new Date(task.dueDate));
      setHour(FormatHour(task.dueDate));
      setMinute(FormatMinutes(task.dueDate));
    } else {
      setDueDate(new Date());
      setHour("23");
      setMinute("59");
    }
  }, [task.dueDate]);

  const handleUpdateTask = (e) => {
    e.preventDefault();
    task.title = titleTask;
    dispatch(taskAction.update(task));
  };

  const handleChangeStatusTask = (task) => {
    task.isComplete = !task.isComplete;
    dispatch(taskAction.update(task));
  };

  const handleUpdateDueDate = (task) => {
    task.dueDate = NewDateTime(dueDate, hour, minute);
    // firebaseDb.child(`Tasks/${task.id}`).set(task, (err) => {
    //   if (err) {
    //     console.log(err);
    //   }
    // });
    dispatch(taskAction.update(task));
  };

  const handleUpdateRemind = (task) => {
    task.dueDate = NewDateTime(dueDate, hour, minute);
    dispatch(taskAction.update(task));
  };

  return (
    <div>
      <div className="p-2 box-item-right bg-white">
        <div
          style={{ paddingLeft: "10px", display: "flex", alignItems: "center" }}
        >
          <input
            type="checkbox"
            className="mr-3"
            title={
              task.isComplete
                ? "Đánh dấu là chưa hoàn thành"
                : "Đánh dấu là đã hoàn thành"
            }
            checked={task.isComplete}
            onChange={() => handleChangeStatusTask(task)}
          />
          <form onSubmit={handleUpdateTask} style={{ width: "100%" }}>
            <input
              type="text"
              className="input-detailTask font-weight-bold"
              value={titleTask || ""}
              onChange={(e) => setTitleTask(e.target.value)}
            />
          </form>
        </div>
        <Step taskId={task.id} />
      </div>
      <div className="box-item-right update-dueDate p-2 bg-white">
        <div className="section">
          <div title="Thêm ngày đến hạn">
            <label className="btn-choose-date m-0">
              <FontAwesomeIcon icon="calendar" />
              <span className="title-btn">Thêm ngày đến hạn</span>
            </label>
          </div>

          <div>
            <div className="date-picler-custom">
              <DatePicker
                selected={dueDate}
                onChange={(date) => setDueDate(date)}
              />
            </div>
            <div className="mt-2">
              <button
                className="btn btn-primary"
                onClick={() => handleUpdateDueDate(task)}
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="box-item-right file p-2 bg-white">
        <div className="section">
          <div title="Nhắc tôi">
            <label className="btn-choose-datetime m-0">
              <FontAwesomeIcon icon="bell" />
              <span className="title-btn">Nhắc tôi</span>
            </label>
          </div>
          <div className="">
            <div className="timePicker-input">
              <div className="timePicker-time">
                <input
                  className="timePicker-hour"
                  pattern="^[ء-ي٠-٩-१-९-०-९-\d]{1,2}"
                  aria-label="giờ"
                  value={hour}
                  tabIndex="-1"
                  onChange={(e) => setHour(e.target.value)}
                />
                :
                <input
                  className="timePicker-minute"
                  pattern="^[ء-ي٠-٩-१-९-०-९-\d]{1,2}"
                  aria-label="phút"
                  value={minute}
                  tabIndex="-1"
                  onChange={(e) => setMinute(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="mt-2">
            <button
              className="btn btn-primary"
              onClick={() => handleUpdateRemind(task)}
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
      <div className="box-item-right file p-2 bg-white">
        <File taskId={task.id} />
      </div>
    </div>
  );
};

export default TaskDetail;
