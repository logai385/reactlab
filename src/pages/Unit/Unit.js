import {
  AutoComplete,
  Button,
  Input,
  Popconfirm,
  Popover,
  Space,
  Tag,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSearchLineAct } from "../../redux/line/LineAction";
import {
  assignLineAct,
  getUnitLineAct,
  createUnitAct,
  deleteUnitAct,
  removeLineAct,
} from "../../redux/Unit/UnitAction";
import MainBreadcrumb from "../../templates/main/MainBreadcrumb/MainBreadcrumb";
import { DeleteTwoTone,CloseCircleTwoTone } from "@ant-design/icons";
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
  const [formData, setFormData] = useState({
    name: "",
  });
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
    if (useSearch.current) {
      clearTimeout(useSearch.current);
    }
    useSearch.current = setTimeout(() => {
      dispatch(getSearchLineAct(data));
    }, 300);
  };
  const onChange = (value) => {
    setSearchText(value);
  };
  useEffect(() => {
    dispatch(getUnitLineAct());
    dispatch(getSearchLineAct(""));

    return () => {};
  }, []);
  const renderUnitLine = () => {
    return unitLines.map((unitLine, index) => {
      return (
        <div className="col-12 col-sm-6 col-md-4 user__item mb-3" key={index}>
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h6 className="card-title mb-0">{unitLine.unit.name}</h6>
              <Popconfirm
                placement="topRight"
                title="Bạn có chắc chắn muốn xóa?"
                onConfirm={() => {
                  dispatch(deleteUnitAct(unitLine.unit._id));
                }}
                okText="Yes"
                cancelText="No"
              >
                <Button type="link" size="small">
                  <DeleteTwoTone twoToneColor="#eb2f96" />
                </Button>
              </Popconfirm>
            </div>
            <div className="card-body">
            <Popover
                placement="bottom"
                content={() => (
                  <>
                    <table className="table table-hover table-sm">
                      <thead>
                        <tr>
                          <th>Số</th>
                          <th>Tuyến</th>
                          <th className="text-center">#</th>
                        </tr>
                      </thead>
                      <tbody>
                        {unitLine?.lines.map((line, index) => {
                          return (
                            <tr key={index}>
                              <td className="align-middle">
                                <Tag color="geekblue" key={index}>
                                  {line.lineNumber}
                                </Tag>
                              </td>
                              <td className="align-middle">
                                {line.description}
                              </td>
                              <td className="align-middle">
                                <Button
                                  type="link"
                                  onClick={() => {
                                    dispatch(
                                      removeLineAct({
                                        userId: unitLine.user._id,
                                        lineId: line._id,
                                      })
                                    );
                                  }}
                                >
                                  <CloseCircleTwoTone
                                    twoToneColor="#eb2f96"
                                    style={{ fontSize: "18px" }}
                                  />
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </>
                )}
                trigger="click"
              >
                {unitLine?.lines.map((line, index) => {
                  return (
                    <Tag color="geekblue" key={index}>
                      {line.lineNumber}
                    </Tag>
                  );
                })}
              </Popover>
             
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
  };
  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <MainBreadcrumb contentTitle="Danh sách Đại lý" />
      </section>
      {/* Main content */}

      <section className="content">
        <div className="row">{renderUnitLine()}</div>
        <Popover
          placement="bottom"
          content={() => (
            <>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  dispatch(createUnitAct(formData));
                }}
              >
                <Space>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Tên đại lý"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  ></Input>
                  <Button htmlType="sumbit">Ok</Button>
                </Space>
              </form>
            </>
          )}
          trigger="click"
        >
          <Button ghost type="primary" size="large">
            <i className="fa fa-plus"></i>
          </Button>
        </Popover>
      </section>
    </div>
  );
};

export default Unit;
