import React from "react";

export default function BottomBtn({ title, btnClass, Icon, ...rest }) {
  return (
    <button type="button" className={`btn ${btnClass} bottom-btn `} {...rest}>
      <Icon
        theme="outline"
        size="24"
        fill="#ffffff"
        strokeLinejoin="miter"
        strokeLinecap="butt"
      />
      <span style={{ verticalAlign: "middle" }}>{title}</span>
    </button>
  );
}
