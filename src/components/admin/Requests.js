import React, { useEffect, useState } from 'react';
import DataTable from "../table/DataTable";
import FloatingAlert from "../common/FloatingAlert";
import { useAlert } from "../../hooks/useAlert";
import { api, config, rest } from "../../helpers/api";

const columns = [
  {id: 'name', numeric: false, disablePadding: false, label: 'عنوان نیاز'},
  {id: 'amount', numeric: true, disablePadding: false, label: 'تعداد'},
  {id: 'urgent', numeric: true, disablePadding: false, label: 'ضروری'},
  {id: 'askDate', numeric: false, disablePadding: false, label: 'تاریخ درخواست'},
  {id: 'changeDate', numeric: false, disablePadding: false, label: 'آخرین بروزرسانی'},
  {id: 'helpDate', numeric: false, disablePadding: false, label: 'تاریخ امدادرسانی'},
  {id: 'status', numeric: false, disablePadding: false, label: 'وضعیت'},
  {id: 'type', numeric: false, disablePadding: false, label: 'نوع حادثه'},
  {id: 'desc', numeric: false, disablePadding: false, label: 'توضیحات'},
  {id: 'actions', numeric: false, disablePadding: false, label: 'عملیات'},
];

const Requests = () => {
  const {open, message, type, duration, closeAlert, showAlert} = useAlert();

  const [loading, setLoading] = useState(true)
  const [rowLoading, setRowLoading] = useState([])
  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(10)

  useEffect(() => {
    setLoading(true)
    api.get(rest.admin.requests, config("json", {page, limit}))
        .then((response) => {
          setData(response.data.data)
          setTotal(response.data.total)
          setRowLoading(new Array(response.data.data.length).fill(false))
        })
        .catch((err) => {
          showAlert(err.response.data.error, "error", 3000);
        })
        .finally(() => setLoading(false))
  }, [page, limit])

  const changeStatus = (k, i, id) => {
    setRowLoading([
      ...rowLoading.slice(0, k),
      true,
      ...rowLoading.slice(k + 1),
    ])
    api.patch(`${rest.admin.request}/${id}`, {status: i}, config("json", {page, limit}))
        .then((response) => {
          setData(response.data.data)
          setTotal(response.data.total)
          showAlert(response.data.msg, "success", 3000);
        })
        .catch((err) => {
          showAlert(err.response.data.error, "error", 3000);
        })
        .finally(() => setRowLoading([
          ...rowLoading.slice(0, k),
          false,
          ...rowLoading.slice(k + 1),
        ]))
  }

  const getNewResults = (p, l) => {
    setPage(p)
    setLimit(l)
  }

  return (
      <div>
        <DataTable
            title={'وضعیت درخواست‌ها'}
            rows={data}
            loading={loading}
            rowLoading={rowLoading}
            columns={columns}
            isAdmin
            statusFn={changeStatus}
            total={total}
            limit={limit}
            page={page}
            getNewResults={getNewResults}
        />

        <FloatingAlert text={message} open={open} handleClose={closeAlert} duration={duration} type={type}/>
      </div>
  );
};

Requests.propTypes = {};

export default Requests;