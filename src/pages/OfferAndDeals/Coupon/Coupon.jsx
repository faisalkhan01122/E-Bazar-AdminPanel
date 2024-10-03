import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import {
  FaSearch,
  FaDownload,
  FaChevronDown,
  FaEye,
  FaEdit,
  FaTrashAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Coupon.css";
import ExportButton from "../../../components/ActionButton/Export";
import ActionButton from "../../../components/ActionButton/Action";
const CouponManagement = () => {
  const [couponData, setCouponData] = useState([]);
  const [form, setForm] = useState({
    title: "",
    code: "",
    type: "Discount on Purchase",

    userLimit: {
      limit: "",
      used: "0",
    },
    discountBearer: "Admin",
    discountType: "Percentage",
    discountAmount: "",
    minPurchase: "",
    maxDiscount: "",
    startDate: "",
    expireDate: "",
    status: "Active",
    applicableProducts: [],
    allVendors: false,
    applicableVendors: [],
    allCustomers: true,
    applicableCustomers: [],
  });
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/coupons/");
        setCouponData(response.data);
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    };

    fetchCoupons();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked, dataset } = e.target;

    if (type === "checkbox") {
      setForm((prevForm) => ({ ...prevForm, [name]: checked }));
    } else if (name === "userLimit") {
      setForm((prevForm) => ({
        ...prevForm,
        userLimit: {
          ...prevForm.userLimit,
          [dataset.field]: value,
        },
      }));
    } else {
      setForm((prevForm) => ({ ...prevForm, [name]: value }));
    }
  };

  const handleStatusChange = async (couponId, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";

    try {
      await axios.put(`http://localhost:3000/api/coupons/${couponId}`, {
        status: newStatus,
      });
      setCouponData((prevData) =>
        prevData.map((coupon) =>
          coupon.id === couponId ? { ...coupon, status: newStatus } : coupon
        )
      );
    } catch (error) {
      console.error("Error updating coupon status:", error);
      Swal.fire(
        "Error!",
        "There was an issue updating the coupon status.",
        "error"
      );
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("form data =======", form);
      await axios.post("http://localhost:3000/api/coupons/", form);
      Swal.fire("Success!", "Coupon added successfully.", "success");

      setForm({
        title: "",
        code: "",
        type: "Discount on Purchase",

        userLimit: { limit: "", used: "" },
        discountBearer: "Admin",
        discountType: "Percentage",
        discountAmount: "",
        minPurchase: "",
        maxDiscount: "",
        startDate: "",
        expireDate: "",
        status: "Active",
        applicableProducts: [],
        allVendors: false,
        applicableVendors: [],
        allCustomers: true,
        applicableCustomers: [],
      });

      const response = await axios.get("http://localhost:3000/api/coupons/");
      setCouponData(response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire("Error!", "There was an issue adding the coupon.", "error");
    }
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleViewCoupon = (coupon) => {
    Swal.fire({
      html: `
        <div class="modal-content">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="Swal.close()">
            <i class="tio-clear"></i>
          </button>
          <div class="coupon__details">
            <div class="coupon__details-left">
              <div class="text-center">
                <h6 class="title">${coupon.title}</h6>
                <h6 class="subtitle">Code: <span>${coupon.code}</span></h6>
                <div class="text-capitalize">
                  <span>Discount ${coupon.discountType.toLowerCase()} on purchase</span>
                </div>
              </div>
              <div class="coupon-info">
                <div class="coupon-info-item">
                  <span>Discount amount:</span>
                  <strong>${coupon.discountAmount}${
        coupon.discountType === "Percentage" ? "%" : ""
      }</strong>
                </div>
                <div class="coupon-info-item">
                  <span>Minimum purchase:</span>
                  <strong>${coupon.minPurchase}</strong>
                </div>
                <div class="coupon-info-item">
                  <span>Maximum discount:</span>
                  <strong>${coupon.maxDiscount}</strong>
                </div>
                <div class="coupon-info-item">
                  <span>Start date:</span>
                  <span>${new Date(
                    coupon.startDate
                  ).toLocaleDateString()}</span>
                </div>
                <div class="coupon-info-item">
                  <span>Expire date:</span>
                  <span>${new Date(
                    coupon.expireDate
                  ).toLocaleDateString()}</span>
                </div>
                <div class="coupon-info-item">
                  <span>Status:</span>
                  <span>${coupon.status}</span>
                </div>
                <div class="coupon-info-item">
                  <span>Applicable Products:</span>
                  <span>${coupon.applicableProducts.join(", ")}</span>
                </div>
                <div class="coupon-info-item">
                  <span>Applicable Vendors:</span>
                  <span>${coupon.applicableVendors.join(", ")}</span>
                </div>
                <div class="coupon-info-item">
                  <span>Applicable Customers:</span>
                  <span>${coupon.applicableCustomers.join(", ")}</span>
                </div>
              </div>
            </div>
            <div class="coupon__details-right">
              <div class="coupon">
                <div class="d-flex">
                  <h4>${coupon.discountAmount}${
        coupon.discountType === "Percentage" ? "%" : ""
      }</h4>
                </div>
                <span>Off</span>
              </div>
            </div>
          </div>
        </div>`,
      showConfirmButton: false,
      customClass: {
        container: "swal2-container-custom",
        popup: "swal2-popup-custom",
      },
    });
  };

  const handleDeleteCoupon = (couponId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setCouponData((prevData) =>
          prevData.filter((coupon) => coupon.id !== couponId)
        );

        Swal.fire("Deleted!", "Your coupon has been deleted.", "success");

        axios.delete(`http://localhost:3000/api/coupons/${couponId}`);
      }
    });
  };

  const filteredCoupons = couponData.filter(
    (coupon) =>
      coupon.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      coupon.code.toLowerCase().includes(searchValue.toLowerCase()) ||
      coupon.discountType.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="p-10">
      <div className="mb-3">
        <h2 className="h1 mb-0 text-capitalize d-flex align-items-center gap-2">
          <img
            src="https://6valley.6amtech.com/public/assets/back-end/img/coupon_setup.png"
            alt=""
          />{" "}
          Coupon setup
        </h2>
      </div>

      <div className="row">
        <div className="col-sm-12 col-lg-12 mb-3 mb-lg-2">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 col-lg-4 form-group">
                    <label
                      htmlFor="type"
                      className="title-color font-weight-medium d-flex"
                    >
                      Coupon type
                    </label>
                    <select
                      className="form-control"
                      name="type"
                      id="type"
                      value={form.type}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="Discount on Purchase">
                        Discount on Purchase
                      </option>
                      <option value="Free Delivery">Free Delivery</option>
                      <option value="On First Order">On First Order</option>
                      {/* Add more options as necessary */}
                    </select>
                  </div>

                  <div className="col-md-6 col-lg-4 form-group">
                    <label
                      htmlFor="title"
                      className="title-color font-weight-medium d-flex"
                    >
                      Coupon title
                    </label>
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      value={form.title}
                      onChange={handleInputChange}
                      id="title"
                      placeholder="Title"
                      required
                    />
                  </div>
                  <div className="col-md-6 col-lg-4 form-group">
                    <label
                      htmlFor="code"
                      className="title-color font-weight-medium d-flex"
                    >
                      Coupon code
                    </label>
                    <input
                      type="text"
                      name="code"
                      className="form-control"
                      value={form.code}
                      onChange={handleInputChange}
                      id="code"
                      placeholder="Ex: SUMMER2024"
                      required
                    />
                  </div>

                  <div className="col-md-6 col-lg-4 form-group">
                    <label
                      htmlFor="userLimitLimit"
                      className="title-color font-weight-medium d-flex"
                    >
                      User Limit
                    </label>
                    <input
                      type="number"
                      data-field="limit"
                      name="userLimit"
                      className="form-control"
                      value={form.userLimit.limit}
                      onChange={handleInputChange}
                      id="userLimitLimit"
                      placeholder="Limit"
                      required
                    />
                  </div>

                  <div className="col-md-6 col-lg-4 form-group">
                    <label
                      htmlFor="discountBearer"
                      className="title-color font-weight-medium d-flex"
                    >
                      Discount Bearer
                    </label>
                    <select
                      className="form-control"
                      name="discountBearer"
                      id="discountBearer"
                      value={form.discountBearer}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="Admin">Admin</option>
                      <option value="Vendor">Vendor</option>
                      {/* Add more options as necessary */}
                    </select>
                  </div>

                  <div className="col-md-6 col-lg-4 form-group">
                    <label
                      htmlFor="discountType"
                      className="title-color font-weight-medium d-flex"
                    >
                      Discount Type
                    </label>
                    <select
                      className="form-control"
                      name="discountType"
                      id="discountType"
                      value={form.discountType}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="Percentage">Percentage</option>
                      <option value="Amount">Amount</option>
                    </select>
                  </div>

                  <div className="col-md-6 col-lg-4 form-group">
                    <label
                      htmlFor="discountAmount"
                      className="title-color font-weight-medium d-flex"
                    >
                      Discount Amount
                    </label>
                    <input
                      type="number"
                      name="discountAmount"
                      className="form-control"
                      value={form.discountAmount}
                      onChange={handleInputChange}
                      id="discountAmount"
                      placeholder="Amount"
                      required
                    />
                  </div>

                  <div className="col-md-6 col-lg-4 form-group">
                    <label
                      htmlFor="minPurchase"
                      className="title-color font-weight-medium d-flex"
                    >
                      Minimum Purchase
                    </label>
                    <input
                      type="number"
                      name="minPurchase"
                      className="form-control"
                      value={form.minPurchase}
                      onChange={handleInputChange}
                      id="minPurchase"
                      placeholder="Minimum Purchase"
                      required
                    />
                  </div>

                  <div className="col-md-6 col-lg-4 form-group">
                    <label
                      htmlFor="maxDiscount"
                      className="title-color font-weight-medium d-flex"
                    >
                      Maximum Discount
                    </label>
                    <input
                      type="number"
                      name="maxDiscount"
                      className="form-control"
                      value={form.maxDiscount}
                      onChange={handleInputChange}
                      id="maxDiscount"
                      placeholder="Maximum Discount"
                      required
                    />
                  </div>

                  <div className="col-md-6 col-lg-4 form-group">
                    <label
                      htmlFor="startDate"
                      className="title-color font-weight-medium d-flex"
                    >
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      className="form-control"
                      value={form.startDate}
                      onChange={handleInputChange}
                      id="startDate"
                      required
                    />
                  </div>

                  <div className="col-md-6 col-lg-4 form-group">
                    <label
                      htmlFor="expireDate"
                      className="title-color font-weight-medium d-flex"
                    >
                      Expire Date
                    </label>
                    <input
                      type="date"
                      name="expireDate"
                      className="form-control"
                      value={form.expireDate}
                      onChange={handleInputChange}
                      id="expireDate"
                      required
                    />
                  </div>

                  <div className="col-md-6 col-lg-4 form-group">
                    <label
                      htmlFor="status"
                      className="title-color font-weight-medium d-flex"
                    >
                      Status
                    </label>
                    <select
                      className="form-control"
                      name="status"
                      id="status"
                      value={form.status}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  {/* Form fields here... */}
                  <div className="col-12 form-group">
                    <button
                      type="submit"
                      className="btn bg-green-400 text-white hover:bg-green-600"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="px-3 py-4">
              <div className="d-flex flex-wrap gap-3 align-items-center">
                <h5 className="mb-0 text-capitalize d-flex gap-2 mr-auto">
                  Coupon list
                  <span className="badge badge-soft-dark radius-50 fz-12 ml-1">
                    {filteredCoupons.length}
                  </span>
                </h5>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="input-group input-group-merge input-group-custom">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <FaSearch />
                      </div>
                    </div>
                    <input
                      id="datatableSearch_"
                      type="search"
                      name="searchValue"
                      className="form-control"
                      placeholder="Search by Title or Code or Discount Type"
                      value={searchValue}
                      onChange={handleSearchChange}
                      aria-label="Search orders"
                    />
                  </div>
                </form>
                {/* <button className="btn btn-secondary">
                  <FaDownload />
                </button> */}
                <ExportButton
                  data={filteredCoupons} // Pass the data to export
                  filename="Coupan" // Optional filename for the exported file
                  icon={FaDownload} // Icon for the button
                  label="Export " // Button label
                  className="bg-[#A1CB46] text-white hover:bg-[#7e9f37]" // Tailwind classes for styling
                  style={{ color: "white" }} // Optional inline styles
                />
              </div>
            </div>
            <div className="table-responsive">
              <table className="table table-hover table-bordered mb-0">
                <thead>
                  <tr className="bg-gray-100">
                    <th>SL</th>
                    <th>Coupon</th>
                    <th>Coupon Type</th>

                    <th>Duration</th>
                    <th>User Limit</th>
                    <th>Discount Bearer</th>
                    <th>Status</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCoupons.map((coupon, index) => (
                    <tr key={coupon.id}>
                      <td>{index + 1}</td>
                      <td className="flex flex-col">
                        <span>{coupon.title}</span>
                        <span className="font-bold">Code:{coupon.code}</span>
                      </td>
                      <td>{coupon.type}</td>
                      <td className="flex flex-col ">
                        <span>
                          {new Date(coupon.startDate).toLocaleDateString()}
                        </span>
                        <span>
                          {new Date(coupon.expireDate).toLocaleDateString()}
                        </span>
                      </td>
                      <td>
                        Limit : {coupon.userLimit.limit}, Used :{" "}
                        {coupon.userLimit.used}
                      </td>
                      <td>{coupon.discountBearer}</td>

                      <td>
                        <label className="switcher">
                          <input
                            type="checkbox"
                            className="switcher_input toggle-switch-message"
                            id={`coupon_status_${coupon.id}`}
                            name="status"
                            value={coupon.status === "Active" ? "1" : "0"}
                            checked={coupon.status === "Active"}
                            onChange={() =>
                              handleStatusChange(coupon._id, coupon.status)
                            }
                            data-modal-id="toggle-status-modal"
                            data-toggle-id={`coupon_status_${coupon._id}`}
                            data-on-image="coupon-status-on.png"
                            data-off-image="coupon-status-off.png"
                            data-on-title="Want to Turn ON Coupon Status?"
                            data-off-title="Want to Turn OFF Coupon Status?"
                            data-on-message="<p>If enabled this coupon will be available on the website and customer app</p>"
                            data-off-message="<p>If disabled this coupon will be hidden from the website and customer app</p>"
                          />
                          <span className="switcher_control"></span>
                        </label>
                      </td>
                      <td className="text-center flex justify-center align-items-center gap-0">
                        <ActionButton
                          onClick={() => handleViewCoupon(coupon)}
                          icon={FaEye} // Pass dynamic icon
                          className="ml-4"
                          label="View"
                        />
                        <ActionButton
                          to={`/coupons/edit/${coupon.id}`}
                          icon={FaEdit} // Pass dynamic icon
                          className="ml-4"
                          label="View"
                        />
                        <ActionButton
                          onClick={() => handleDeleteCoupon(coupon._id)}
                          icon={FaTrash} // Pass dynamic icon
                          className="ml-4"
                          label="Delete"
                        />

                        {/* <button
                          className="btn btn-primary "
                          onClick={() => handleViewCoupon(coupon)}
                        >
                          <FaEye />
                        </button>
                        <Link
                          to={`/coupons/edit/${coupon.id}`}
                          className="btn btn-info btn-sm mx-2"
                        >
                          <FaEdit />
                        </Link> */}
                        {/* <button
                          className="btn btn-danger "
                          onClick={() => handleDeleteCoupon(coupon._id)}
                        >
                          <FaTrashAlt />
                        </button> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponManagement;
