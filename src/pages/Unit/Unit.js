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
import {
  assignBusAct,
  getUnitBusAct,
  createUnitAct,
  deleteUnitAct,
  removeBusAct,
} from "../../redux/Unit/UnitAction";
import MainBreadcrumb from "../../templates/main/MainBreadcrumb/MainBreadcrumb";
import { DeleteTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import { getTransporterByKeywordAct } from "../../redux/transporter/TransporterAction";
const Unit = () => {
  const dispatch = useDispatch();
  const useSearch = useRef(null);

  const { unitBuses } = useSelector((state) => state.UnitReducer);
  const { transporterList } = useSelector((state) => state.TransporterReducer);
  const options = transporterList.map((item) => ({
    value: item._id.toString(),
    label: item.plate,
  }));
  const [searchText, setSearchText] = useState("");
  const [formData, setFormData] = useState({
    name: "",
  });
  const onSelect = (value, option, unitId) => {
    setSearchText(option.label);
    dispatch(
      assignBusAct({
        unitId: unitId,
        busId: value,
      })
    );
  };
  const onSearch = (data) => {
    if (useSearch.current) {
      clearTimeout(useSearch.current);
    }
    useSearch.current = setTimeout(() => {
      dispatch(getTransporterByKeywordAct(data));
    }, 300);
  };
  const onChange = (value) => {
    setSearchText(value);
  };
  useEffect(() => {
    dispatch(getUnitBusAct());
    dispatch(getTransporterByKeywordAct(""));

    return () => {};
  }, []);
  const renderUnitBus = () => {
    return unitBuses.map((unitBus, index) => {
      return (
        <div
          className="col-12 col-sm-6 col-md-4 user__item mb-3 pr-0"
          key={index}
        >
          <div className="card" style={{ height: "100%" }}>
            <div className="card-header d-flex justify-content-between align-items-center">
              <h6 className="card-title mb-0">{unitBus.unit.name}</h6>
              <Popconfirm
                placement="topRight"
                title="Bạn có chắc chắn muốn xóa?"
                onConfirm={() => {
                  dispatch(deleteUnitAct(unitBus.unit._id));
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
                          <th>Biển số</th>
                          {/* <th>Tuyến</th> */}
                          <th className="text-center">#</th>
                        </tr>
                      </thead>
                      <tbody>
                        {unitBus?.buses.map((bus, index) => {
                          return (
                            <tr key={index}>
                              <td className="align-middle">
                                <Tag color="geekblue" key={index}>
                                  {bus.plate}
                                </Tag>
                              </td>
                              {/* <td className="align-middle">
                                {bus.description}
                              </td> */}
                              <td className="align-middle">
                                <Button
                                  type="link"
                                  onClick={() => {
                                    dispatch(
                                      removeBusAct({
                                        unitId: unitBus.unit._id,
                                        busId: bus._id,
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
                <div>
                  {unitBus?.buses.length > 28
                    ? unitBus?.buses.slice(0, 28).map((bus, index) => {
                        return (
                          <Tag
                            color="geekblue"
                            key={index}
                            style={{ minWidth: "68.17px" }}
                          >
                            {bus.plate}
                          </Tag>
                        );
                      })
                    : unitBus?.buses.map((bus, index) => {
                        return (
                          <Tag
                            color="geekblue"
                            key={index}
                            style={{ minWidth: "68.17px" }}
                          >
                            {bus.plate}
                          </Tag>
                        );
                      })}
                </div>
              </Popover>

              <Popover
                placement="bottom"
                content={() => (
                  <>
                    <AutoComplete
                      style={{ width: 200 }}
                      options={options}
                      onSelect={(value, option) => {
                        onSelect(value, option, unitBus.unit._id);
                      }}
                      onSearch={onSearch}
                      onChange={onChange}
                      value={searchText}
                      placeholder="biến số"
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
        <MainBreadcrumb contentTitle="Doanh nghiệp Vận tải" />
      </section>
      {/* Main content */}

      <section className="content">
        <div className="row">{renderUnitBus()}</div>
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
