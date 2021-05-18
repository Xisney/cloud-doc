import React, { Component } from "react";
import { FileAddition, Afferent } from "@icon-park/react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import FileSearch from "components/FileSearch";
import FileList from "components/FileList";
import BottomBtn from "components/BottomBtn";
import TabList from "components/TabList";
import "./App.scss";
import files from "utils/defaultFiles";

export default class App extends Component {
  handleChange = (value) => {
    console.log(value);
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-3 left-part">
            <FileSearch
              title="搜索云文档"
              onFileSearch={(value) => {
                console.log(value);
              }}
            />
            <FileList
              onFileEdit={(el) => {
                console.log("edit", el);
              }}
              onFileDelete={(id) => {
                console.log("delete", id);
              }}
              onFileClick={(id) => {
                console.log(id);
              }}
              files={files}
            />
            <div className="row mt-2">
              <BottomBtn
                title="新建"
                btnClass="btn-primary col"
                Icon={FileAddition}
              />
              <BottomBtn
                title="导入"
                btnClass="btn-success col"
                Icon={Afferent}
              />
            </div>
          </div>
          <div className="col-9 bg-light right-part px-0">
            <TabList
              activeId="1"
              onTabClick={(id) => {
                console.log(id);
              }}
              onTabClose={(id) => {
                console.log(id);
              }}
              unSaveIds={["1"]}
              files={files}
            />
            <SimpleMDE
              onChange={this.handleChange}
              value={files[1].body}
              options={{ minHeight: "452px" }}
            />
          </div>
        </div>
      </div>
    );
  }
}
