import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Search, Close } from "@icon-park/react";

function FileSearch({ title, onFileSearch }) {
  const [value, setValue] = useState("");
  const [isActive, changeActive] = useState(false);
  const inputNode = useRef(null);
  const divNode = useRef(null);

  const closeInput = (e) => {
    e.preventDefault();
    setValue("");
    changeActive(false);
  };

  useEffect(() => {
    const handleKeyup = (e) => {
      const { keyCode } = e;
      if (keyCode === 13) {
        onFileSearch(value);
        closeInput(e);
      } else if (keyCode === 27) {
        closeInput(e);
      }
    };
    const target = divNode.current;
    target.addEventListener("keyup", handleKeyup);
    return () => {
      target.removeEventListener("keyup", handleKeyup);
    };
  });

  useEffect(() => {
    if (isActive) {
      inputNode.current.focus();
    }
  }, [isActive]);

  return (
    <div
      className="alert alert-primary file-search d-flex justify-content-between align-items-center"
      ref={divNode}
    >
      {!isActive && (
        <>
          <span style={{ height: "30px", lineHeight: "30px" }}>{title}</span>
          <Search
            theme="outline"
            size="24"
            fill="#4a90e2"
            strokeLinecap="square"
            onClick={() => {
              changeActive(true);
            }}
            className="icon-button"
          />
        </>
      )}
      {isActive && (
        <>
          <input
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            onBlur={(e) => {
              onFileSearch(value);
              closeInput(e);
            }}
            ref={inputNode}
          />
          <Close
            theme="outline"
            size="24"
            fill="#4a90e2"
            strokeLinejoin="miter"
            strokeLinecap="butt"
            onClick={closeInput}
            className="icon-button"
          />
        </>
      )}
    </div>
  );
}

FileSearch.propTypes = {
  title: PropTypes.string,
  onFileSearch: PropTypes.func.isRequired,
};

FileSearch.defaultProps = {
  title: "搜索云文档",
};

export default FileSearch;
