import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as taskAction from "../../actions/taskAction";
import * as fileAction from "../../actions/fileAction";
import FileItem from "./FileItem";

const File = (props) => {
  const { taskId } = props;
  const { files } = useSelector((state) => state.file);
  const dispatch = useDispatch();

  useEffect(() => {
    if (taskId) {
      dispatch(fileAction.getByTaskId(taskId));
    }
  }, [dispatch, taskId]);

  const handleUploadFile = (e) => {
    dispatch(taskAction.addFile(taskId, e.target.files[0]));
  };

  const handleDeleteItem = (id) => {
    dispatch(fileAction.remove(id));
  };

  return (
    <div className="section">
      <div title="Thêm tệp">
        <label className="btn-upload-file m-0" htmlFor="file-upload">
          <FontAwesomeIcon icon="paperclip" />
          <span className="title-btn">Thêm tệp</span>
        </label>
        <input
          type="file"
          id="file-upload"
          accept="application/pdf,application/msword,
  application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.presentationml.presentation"
          style={{ display: "none" }}
          onChange={handleUploadFile}
        />
      </div>
      <div className="list-file">
        {files &&
          files.map((item) => (
            <FileItem
              key={item.id}
              file={item}
              onDeleteItem={handleDeleteItem}
            />
          ))}
      </div>
    </div>
  );
};

export default File;
