import React, { Component } from "react";
import PropTypes from "prop-types";
import { CloseSmall, Dot } from "@icon-park/react";
import classname from "utils/classname";
import "./index.scss";

export default class TabList extends Component {
  render() {
    const { files, activeId, unSaveIds, onTabClick, onTabClose } = this.props;
    return (
      <ul className="nav nav-pills tab-list">
        {files.map((file) => {
          const targetClass = classname({
            active: file.id === activeId,
            unsave: unSaveIds.includes(file.id),
          });
          return (
            <li className="nav-item" key={file.id}>
              <a
                className={`nav-link ${targetClass} py-1 px-4 position-relative`}
                aria-current="page"
                href="#"
                onClick={() => {
                  onTabClick(file.id);
                }}
              >
                <span
                  style={{ display: "inline-block", verticalAlign: "middle" }}
                  className="me-1 text-white"
                >
                  {file.name}
                </span>
                <CloseSmall
                  theme="outline"
                  size="24"
                  fill="#ffffff"
                  strokeLinejoin="miter"
                  strokeLinecap="butt"
                  onClick={(e) => {
                    e.stopPropagation();
                    onTabClose(file.id);
                  }}
                  className="close-icon"
                />
                <Dot
                  theme="outline"
                  size="24"
                  fill="#f5a623"
                  strokeLinejoin="miter"
                  strokeLinecap="butt"
                  className="dot-icon"
                />
              </a>
            </li>
          );
        })}
      </ul>
    );
  }

  static propTypes = {
    files: PropTypes.array,
    activeId: PropTypes.string,
    unSaveIds: PropTypes.array,
    onTabClick: PropTypes.func,
    onTabClose: PropTypes.func,
  };

  static defaultProps = {
    unSaveIds: [],
  };
}
