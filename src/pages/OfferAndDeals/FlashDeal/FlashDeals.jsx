import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSearch, FaEye, FaDownload } from "react-icons/fa";
import { MdFlashOn } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./FlashDeals.css";
import ApiUrl from "../../../ApiUrl";
import ExportButton from "../../../components/ActionButton/Export";
import ActionButton from "../../../components/ActionButton/Action";

const FlashDeals = () => {
  const [activeLang, setActiveLang] = useState("en");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    endDate: "",
    image: null,
  });
  const [flashDeals, setFlashDeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchFlashDeals();
  }, []);

  const fetchFlashDeals = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${ApiUrl}flash-deals/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFlashDeals(response.data.doc);
    } catch (error) {
      console.error("Error fetching flash deals:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validate date range
    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Date Range",
        text: "End Date must be after Start Date!",
      });
      return;
    }

    // Validate image file size (max 2MB)
    if (formData.image && formData.image.size > 2 * 1024 * 1024) {
      Swal.fire({
        icon: "error",
        title: "Invalid File Size",
        text: "Image file size must be less than 2MB!",
      });
      return;
    }

    if (!formData.image) {
      Swal.fire({
        icon: "error",
        title: "Image Required",
        text: "Please upload an image!",
      });
      return;
    }

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("startDate", formData.startDate);
    formDataToSubmit.append("endDate", formData.endDate);
    formDataToSubmit.append("image", formData.image);
    formDataToSubmit.append("title", formData.title);

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${ApiUrl}flash-deals/`,
        formDataToSubmit,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFlashDeals((prevDeals) => [...prevDeals, response.data]);
      setFormData({ title: "", startDate: "", endDate: "", image: null });
      Swal.fire({
        icon: "success",
        title: "Flash Deal Added",
        text: "New flash deal has been successfully added!",
      });
    } catch (error) {
      console.error("Error submitting flash deal:", error);
      setErrorMessage(
        `Error adding flash deal: ${
          error.response?.data?.message || error.message
        }`
      );
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message || "Failed to add new flash deal!",
      });
    }
  };

  const handleSwitcherChange = async (id) => {
    const dealToUpdate = flashDeals.find((deal) => deal._id === id);
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.patch(
        `${ApiUrl}flash-deals/${id}/update-publish`,
        {
          publish: !dealToUpdate.publish,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFlashDeals((prevDeals) =>
        prevDeals.map((deal) =>
          deal._id === id ? { ...deal, publish: response.data.publish } : deal
        )
      );
      Swal.fire({
        icon: "success",
        title: "Status Updated",
        text: "Flash deal status has been successfully updated!",
      });
    } catch (error) {
      console.error("Error updating flash deal:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to update flash deal status!",
      });
    }
  };

  const confirmDeleteDeal = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this flash deal?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteDeal(id);
      }
    });
  };

  const handleDeleteDeal = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`${ApiUrl}flash-deals/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFlashDeals(flashDeals.filter((deal) => deal._id !== id));
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Flash deal has been deleted.",
      });
    } catch (error) {
      console.error("Error deleting flash deal:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to delete flash deal!",
      });
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };
  const filteredFlashDeals = flashDeals.filter((deal) =>
    (deal.title ? deal.title.toLowerCase() : "").includes(searchQuery)
  );

  // const filteredFlashDeals = flashDeals.filter(deal =>
  //   deal.title.toLowerCase().includes(searchQuery)
  // );

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(activeLang, options);
  };

  return (
    <div className="content container-fluid snipcss-SrYZc">
      <div className="d-flex justify-content-between gap-2 mb-3">
        <h2 className="h1 mb-0 text-capitalize d-flex align-items-center gap-2">
          <MdFlashOn size={24} /> Flash deals
        </h2>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <form
                onSubmit={handleFormSubmit}
                className="text-start"
                encType="multipart/form-data"
              >
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label
                        htmlFor="title"
                        className="title-color font-weight-medium text-capitalize"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        className="form-control"
                        placeholder="Enter title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="start-date"
                        className="title-color font-weight-medium text-capitalize"
                      >
                        Start Date
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        className="form-control"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="end-date"
                        className="title-color font-weight-medium text-capitalize"
                      >
                        End Date
                      </label>
                      <input
                        type="date"
                        name="endDate"
                        className="form-control"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label
                        htmlFor="image"
                        className="title-color font-weight-medium text-capitalize"
                      >
                        Upload image
                      </label>
                      <input
                        type="file"
                        name="image"
                        className="form-control-file"
                        accept=".jpg, .png, .jpeg"
                        onChange={handleInputChange}
                      />
                    </div>
                    {formData.image && (
                      <div className="form-group">
                        <img
                          width="70%"
                          height="100"
                          src={URL.createObjectURL(formData.image)}
                          alt="Uploaded"
                          className="img-fluid"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {errorMessage && (
                  <div className="error-message">{errorMessage}</div>
                )}

                <div className="d-flex justify-content-end">
                  <button
                    type="submit"
                    className="btn bg-[#A1CB46] text-white hover:bg-[#7e9f37]"
                  >
                    Add Flash Deal
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-12 my-5">
          <div className="card">
            <div className="card-header flex flex-col md:flex-row gap-4 justify-between items-center">
              <h4 className="card-title text-[1rem] font-semibold">
                Flash Deals List
              </h4>
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="form-control mt-2"
                />
                <ExportButton
                  data={filteredFlashDeals} // Pass the data to export
                  filename="FlashDeal" // Optional filename for the exported file
                  icon={FaDownload} // Icon for the button
                  label="Export " // Button label
                  className="bg-[#A1CB46] text-white hover:bg-[#7e9f37]" // Tailwind classes for styling
                  style={{ color: "white" }} // Optional inline styles
                />
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFlashDeals.length > 0 ? (
                      filteredFlashDeals.map((deal) => (
                        <tr key={deal._id}>
                          <td>
                            <img
                              src={deal.image}
                              alt={deal.title}
                              className="img-fluid"
                              width="50"
                              height="50"
                            />
                          </td>
                          <td>{deal.title}</td>
                          <td>{formatDate(deal.startDate)}</td>
                          <td>{formatDate(deal.endDate)}</td>
                          <td>
                            {/* <label className="switcher">
                              <input
                                type="checkbox"
                                className="switcher_input"
                                checked={dealItem.status === "active"}
                                onChange={() =>
                                  toggleStatus(dealItem._id, dealItem.status)
                                }
                              />
                              <span className="switcher_control"></span>
                            </label> */}
                            <label className="switch">
                              <input
                                type="checkbox"
                                checked={deal.publish}
                                onChange={() => handleSwitcherChange(deal._id)}
                              />
                              <span className="slider round"></span>
                            </label>
                          </td>
                          <td>
                            <ActionButton
                              to={`/flash-deals/${deal._id}`}
                              icon={FaEdit} // Pass dynamic icon
                              className="ml-4"
                              label="View"
                            />
                            <ActionButton
                              onClick={() => confirmDeleteDeal(deal._id)}
                              icon={FaTrash} // Pass dynamic icon
                              className="ml-4"
                              label="Delete"
                            />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">
                          No Flash Deals found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashDeals;
