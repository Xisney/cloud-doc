import React, { Component } from "react";
import { FileAddition, Afferent } from "@icon-park/react";
import FileSearch from "components/FileSearch";
import FileList from "components/FileList";
import BottomBtn from "components/BottomBtn";
import "./App.scss";

export default class App extends Component {
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
          <div className="col-9 bg-light right-part">
            <h2>主体</h2>
          </div>
        </div>
      </div>
    );
  }
}
