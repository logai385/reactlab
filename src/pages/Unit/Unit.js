import { AutoComplete, Popover, Tag } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSearchLineAct } from "../../redux/line/LineAction";
import { assignLine, assignLineAct, getUnitLineAct } from "../../redux/Unit/UnitAction";
import MainBreadcrumb from "../../templates/main/MainBreadcrumb/MainBreadcrumb";

const Unit = () => {
  const dispatch = useDispatch();
  const useSearch = useRef(null);
  
  const { unitLines } = useSelector((state) => state.UnitReducer);
  const { lineSearch } = useSelector((state) => state.LineReducer);
  const options = lineSearch.map((item) => ({
    value: item._id.toString(),
    label: item.lineNumber,
  }));
  const [searchText, setSearchText] = useState("");
  const onSelect = (value, option, unitId) => {
    setSearchText(option.label);
    dispatch(
      assignLineAct({
        unitId: unitId,
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
    dispatch(getUnitLineAct());
    dispatch(getSearchLineAct(''));

    return () => {};
  }, []);
  const renderUnitLine = () => {
    return unitLines.map((unitLine, index) => {
        return (
          <div className="col-4 user__item" key={index}>
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">{unitLine.unit.name}</h5>
              
              </div>
              <div className="card-body">
                {unitLine.lines?.map((line, index) => {
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
                          onSelect(value, option, unitLine.unit._id);
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
  }
  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <MainBreadcrumb contentTitle="Danh sách Đại lý" />
      </section>
      {/* Main content */}

      <section className="content">
        <div className="row">{renderUnitLine()}</div>
      </section>
    </div>
  );
};

export default Unit;
