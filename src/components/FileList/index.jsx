import React, { Component } from "react";
import PropTypes from "prop-types";
import { FileCollection, Editor, DeleteOne, Close } from "@icon-park/react";

export default class FileList extends Component {
  state = { currentName: "", editId: -1 };

  closeInput = () => {
    this.setState({
      currentName: "",
      editId: -1,
    });
  };

  onChangeName = (e) => {
    const { value } = e.target;
    this.setState({
      currentName: value,
    });
  };

  onChangeNameEnd = (e) => {
    const { value } = e.target;
    const id = this.state.editId;
    this.props.onFileEdit(id, value);
    this.closeInput();
  };

  handleEditClick = (el) => {
    this.setState(
      {
        editId: el.id,
        currentName: el.name,
      },
      () => {
        this.inputNode.focus();
      }
    );
  };

  render() {
    const { files, onFileDelete, onFileClick } = this.props;
    return (
      <ul
        className="list-group list-group-flush file-list"
        ref={(el) => (this.ulNode = el)}
      >
        {files.map((el) => (
          <li
            className="list-group-item d-flex justify-content-between align-items-center"
            key={el.id}
          >
            {this.state.editId === el.id ? (
              <>
                <input
                  type="text"
                  value={this.state.currentName}
                  onChange={this.onChangeName}
                  onBlur={this.onChangeNameEnd}
                  ref={(node) => (this.inputNode = node)}
                  autoFocus
                />
                <Close
                  theme="outline"
                  size="24"
                  fill="#4a90e2"
                  strokeLinejoin="miter"
                  strokeLinecap="butt"
                  onClick={this.closeInput}
                  className="icon-button"
                />
              </>
            ) : (
              <>
                <div
                  className="show-file-info"
                  onClick={() => {
                    onFileClick(el.id);
                  }}
                >
                  <FileCollection
                    theme="outline"
                    size="24"
                    fill="#4a90e2"
                    strokeLinejoin="miter"
                    strokeLinecap="butt"
                  />
                  <span className="file-name" style={{ marginLeft: "8px" }}>
                    {el.name}
                  </span>
                </div>

                <div className="file-opts">
                  <Editor
                    theme="outline"
                    size="24"
                    fill="#4a90e2"
                    strokeLinejoin="miter"
                    strokeLinecap="butt"
                    className="icon-button"
                    onClick={() => {
                      this.handleEditClick(el);
                    }}
                  />
                  <DeleteOne
                    theme="outline"
                    size="24"
                    fill="#4a90e2"
                    strokeLinejoin="miter"
                    strokeLinecap="butt"
                    className="icon-button"
                    onClick={() => {
                      onFileDelete(el.id);
                    }}
                  />
                </div>
              </>
            )}
          </li>
        ))}
        {files.length === 0 ? (
          <li>
            <h2 className="welcome-page">暂无内容</h2>
          </li>
        ) : (
          ""
        )}
      </ul>
    );
  }

  handleKeyup = (e) => {
    const { keyCode } = e;
    if (keyCode === 13) {
      this.onChangeNameEnd(e);
    } else if (keyCode === 27) {
      this.closeInput();
    }
  };

  componentDidMount() {
    this.ulNode.addEventListener("keyup", this.handleKeyup);
  }

  componentWillUnmount() {
    this.ulNode.removeEventListener("keyup", this.handleKeyup);
  }

  static propTypes = {
    files: PropTypes.array,
    onFileEdit: PropTypes.func,
    onFileDelete: PropTypes.func,
    onFileClick: PropTypes.func,
  };
}
