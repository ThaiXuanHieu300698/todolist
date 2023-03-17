/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatTypeFile, formatSizeFile } from "../../utils/fileHelper";
import { backendUrl } from "../../utils/appSetting"

const FileItem = (props) => {
  const { file, onDeleteItem } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    onDeleteItem(id);
    setOpen(false);
  };

  return (
    <div>
      <div className="d-flex align-items-center">
        <a className="file-item" href={ backendUrl + file.path} target="_blank">
          <div className="file-thumbnail">
            <div className="file-extension">
              {file.type.slice(0, 3).toUpperCase()}
            </div>
          </div>
          <div className="file-detail">
            <p className="file-name">{file.name}</p>
            <div className="file-info">
              <span className="file-size">{formatSizeFile(file.size)}</span>
              <span className="file-type">{formatTypeFile(file.type)}</span>
            </div>
          </div>
        </a>
        <button className="btn-deleteFile" onClick={handleClickOpen}>
          <FontAwesomeIcon icon="times" />
        </button>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          "{file.name}" sẽ bị xóa vĩnh viễn.
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
            onClick={() => handleDelete(file.id)}
            className="btn btn-danger"
          >
            Xóa tệp
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FileItem;
