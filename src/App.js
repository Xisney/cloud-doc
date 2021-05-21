import React, { Component } from "react";
import { FileAddition, Afferent } from "@icon-park/react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import FileSearch from "components/FileSearch";
import FileList from "components/FileList";
import BottomBtn from "components/BottomBtn";
import TabList from "components/TabList";
import { nanoid } from "nanoid";
import "./App.scss";
import defaultFiles from "utils/defaultFiles";
import { getRightIndex, debounce } from "utils/functions";

export default class App extends Component {
  // 单项数据流，DRY，不要重复自己，能够通过state计算出的东西不保存在state
  state = {
    files: defaultFiles,
    searchFiles: [],
    openFileIds: [],
    unSaveIds: [],
    activeFileId: "",
  };

  handleContentChange = (value, id) => {
    // 更新文件的内容，以及未保存的文件id
    console.log(value, id);
    const { files: source, unSaveIds } = this.state;
    const files = source.map((file) => {
      if (file.id === id) {
        file.body = value;
      }
      return file;
    });
    this.setState({
      files,
      unSaveIds: unSaveIds.includes(id) ? unSaveIds : unSaveIds.concat(id),
    });
  };

  handleTabClose = (id) => {
    this.setState(({ openFileIds, activeFileId }) => {
      const curindex = openFileIds.findIndex((curId) => curId === activeFileId);
      const len = openFileIds.length;
      const targetFileActiveId = openFileIds.filter((_id) => _id !== id)[
        getRightIndex(curindex, len)
      ];

      return {
        activeFileId: targetFileActiveId,
        openFileIds: openFileIds.filter((openId) => openId !== id),
      };
    });
  };

  handleFileNameEdit = (id, newName) => {
    this.setState(({ files }) => {
      return {
        files: files.map((file) => {
          if (file.id === id) {
            file.name = newName;
          }
          return file;
        }),
      };
    });
  };

  handleFileDelete = (id) => {
    this.handleTabClose(id);
    this.setState(({ files, unSaveIds }) => {
      return {
        files: files.filter((file) => {
          return file.id !== id;
        }),
        unSaveIds: unSaveIds.filter((_id) => {
          return _id !== id;
        }),
      };
    });
  };

  handleFileOpen = (id) => {
    this.setState((state) => {
      const { openFileIds } = state;
      return {
        activeFileId: id,
        openFileIds: openFileIds.includes(id)
          ? openFileIds
          : [...openFileIds, id],
      };
    });
  };

  handleFileSearch = (fileName) => {
    const { files } = this.state,
      reg = new RegExp(`${fileName}`, "i");
    const searchFiles =
      fileName === "" ? [] : files.filter((file) => reg.test(file.name));
    this.setState({ searchFiles });
  };

  handleFileCreate = () => {
    this.setState(({ files }) => {
      return {
        files: [
          ...files,
          {
            id: nanoid(),
            name: "new File",
            body: "",
          },
        ],
      };
    });
  };

  render() {
    let { files, openFileIds, activeFileId, unSaveIds, searchFiles } =
      this.state;
    const openFiles = openFileIds.map((id) => {
      return files.find((file) => file.id === id);
    });
    const activeFile = files.find((file) => file.id === activeFileId);
    const isOpen = openFiles.length !== 0;
    files = searchFiles.length === 0 ? files : searchFiles;

    return (
      <div className="container-fluid cloud-doc">
        <div className="row">
          <div className="col-3 left-part px-0">
            <FileSearch
              title="搜索云文档"
              onFileSearch={this.handleFileSearch}
            />
            <FileList
              onFileEdit={this.handleFileNameEdit}
              onFileDelete={this.handleFileDelete}
              onFileClick={this.handleFileOpen}
              files={files}
            />
            <div className="row mt-2 bottom-btns">
              <BottomBtn
                title="新建"
                btnClass="btn-primary col"
                Icon={FileAddition}
                onClick={this.handleFileCreate}
              />
              <BottomBtn
                title="导入"
                btnClass="btn-success col"
                Icon={Afferent}
              />
            </div>
          </div>
          <div className="col-9 bg-light right-part px-0">
            {!isOpen && (
              <div className="welcome-page">请选择或导入您的 Markdown 文档</div>
            )}
            {isOpen && (
              <>
                <TabList
                  activeId={activeFileId}
                  onTabClick={(id) => {
                    this.setState({
                      activeFileId: id,
                    });
                  }}
                  onTabClose={this.handleTabClose}
                  unSaveIds={unSaveIds}
                  files={openFiles}
                />
                <SimpleMDE
                  onChange={debounce((value) => {
                    this.handleContentChange(value, activeFile.id);
                  })}
                  value={activeFile && activeFile.body}
                  key={activeFile && activeFile.id}
                  options={{
                    minHeight: "452px",
                    autofocus: true,
                    spellChecker: false,
                  }}
                />
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}
