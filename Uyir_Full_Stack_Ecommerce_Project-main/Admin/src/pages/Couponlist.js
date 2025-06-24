import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteACoupon,
  getAllCoupon,
  resetState,
} from "../features/coupon/couponSlice";
import CustomModal from "../components/CustomModal";

const Couponlist = () => {
  const [open, setOpen] = useState(false);
  const [couponId, setcouponId] = useState("");
  const dispatch = useDispatch();

  const showModal = (id) => {
    setOpen(true);
    setcouponId(id);
  };

  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getAllCoupon());
  }, [dispatch]);

  const couponState = useSelector((state) => state.coupon.coupons);

  const today = new Date().toLocaleString('en-US').split("T")[0]; // YYYY-MM-DD format

  const data1 = couponState.map((coupon, index) => {
    const expiryDate = new Date(coupon.expiry);
    const expiryDateStr = expiryDate.toLocaleString('en-US').split("T")[0];
    const isToday = expiryDateStr === today;

    return {
      key: index + 1,
      name: coupon.name,
      discount: coupon.discount,
      expiry: isToday
        ? `${expiryDate.toLocaleString()} (Today)`
        : expiryDate.toLocaleString(),
      expiryRaw: expiryDate, // Used for sorting
      action: (
        <>
          <Link
            to={`/admin/coupon/${coupon._id}`}
            className="fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(coupon._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    };
  });

  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Discount",
      dataIndex: "discount",
      sorter: (a, b) => a.discount - b.discount,
    },
    {
      title: "Expiry",
      dataIndex: "expiry",
      sorter: (a, b) => new Date(a.expiryRaw) - new Date(b.expiryRaw),
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];

  const deleteCoupon = (id) => {
    dispatch(deleteACoupon(id));
    setOpen(false);
    setTimeout(() => {
      dispatch(getAllCoupon());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Coupons</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteCoupon(couponId);
        }}
        title="Are you sure you want to delete this Coupon?"
      />
    </div>
  );
};

export default Couponlist;
