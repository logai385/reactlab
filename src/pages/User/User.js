import React, { useEffect, useRef, useState } from "react";
import MainBreadcrumb from "../../templates/main/MainBreadcrumb/MainBreadcrumb";
import { useSelector, useDispatch } from "react-redux";
import { getOperatorLineAct } from "../../redux/user/UserAction";
import { AutoComplete, Popover, Tag } from "antd";
import { assignUserAct, getSearchLineAct } from "../../redux/line/LineAction";
const User = () => {
  const useSearch = useRef(null);

  const dispatch = useDispatch();
  const { operatorLines } = useSelector((state) => state.UserReducer);
  const { lineSearch } = useSelector((state) => state.LineReducer);
  const options = lineSearch.map((item) => ({
    value: item._id.toString(),
    label: item.lineNumber,
  }));
  const [searchText, setSearchText] = useState("");
  const onSelect = (value, option, userId) => {
    setSearchText(option.label);
    dispatch(
      assignUserAct({
        userId: userId,
        lineId: value,
      })
    );
  };
  const onSearch = (data) => {
    if(useSearch.current){
      clearTimeout(useSearch.current);
    }
    useSearch.current = setTimeout(() => {
      dispatch(getSearchLineAct(data));
    },300);
  };
  const onChange = (value) => {
    setSearchText(value);
  };
  useEffect(() => {
    dispatch(getOperatorLineAct());
    dispatch(getSearchLineAct(''));
    return () => {};
  }, []);
  const renderOperator = () => {
    return operatorLines.map((user, index) => {
      return (
        <div className="col-4 user__item" key={index}>
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">{user.user?.name}</h5>
              <h6 className="card-subtitle text-muted">
                {user.user?.username}
              </h6>
            </div>
            <div className="card-body">
              {user?.lines.map((line, index) => {
                return (
                  <Tag color="geekblue" key={index}>
                    {line.lineNumber}
                  </Tag>
                );
              })}
              <Popover
                placement="bottom" 
                content={() => (
                  <>
                    <AutoComplete
                      style={{ width: 200 }}
                      options={options}
                      onSelect={(value, option) => {
                        onSelect(value, option, user.user._id);
                      }}
                      onSearch={onSearch}
                      onChange={onChange}
                      value={searchText}
                      placeholder="line"
                    />
                  </>
                )}
                trigger="click"
              >
                <Tag color="orange" style={{ cursor: "pointer" }}>
                  <i className="fa fa-plus"></i>
                </Tag>
              </Popover>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <MainBreadcrumb contentTitle="Danh sách Nhân viên" />
      </section>
      {/* Main content */}

      <section className="content">
        <div className="row">{renderOperator()}</div>
      </section>
    </div>
  );
};
export default User;
