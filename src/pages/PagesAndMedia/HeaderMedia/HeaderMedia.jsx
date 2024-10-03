import React from "react";
// import { TioDelete } from 'react-icons/tio';
import "./HeaderMedia.css";
const HeaderMedia = () => {
  return (
    <div className="card snipcss-fnvUF">
      <div className="card-header">
        <h5 className="mb-0 text-capitalize">Header section</h5>
      </div>
      <div className="card-body">
        <div className="card border shadow-none mb-3">
          <div className="card-body">
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <label className="title-color">Title</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    defaultValue="Vendor Registration"
                    placeholder="Enter title"
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label className="title-color text-capitalize">
                    Sub title
                  </label>
                  <input
                    type="text"
                    name="sub_title"
                    className="form-control"
                    defaultValue="Create your own store.Already have store?"
                    placeholder="Enter sub title"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card border shadow-none">
          <div className="card-body">
            <div className="mx-auto max-w-400">
              <div className="mb-3 text-center">
                <label
                  htmlFor="name"
                  className="title-color text-capitalize font-weight-bold mb-0"
                >
                  Image
                </label>
                <span className="badge badge-soft-info">
                  (Size : 310px x 240px)
                </span>
              </div>
              <div className="custom_upload_input">
                <input
                  type="file"
                  name="image"
                  className="image-input meta-img"
                  data-image-id="view-header-logo"
                  accept="image/*"
                />
                <span className="delete_file_input btn btn-outline-danger btn-sm square-btn d--none">
                  {/* <TioDelete /> */}
                </span>
                <div className="img_area_with_preview position-absolute z-index-2">
                  <img
                    id="view-header-logo"
                    src="https://6valley.6amtech.com/public/assets/back-end/img/placeholder/placeholder-4-1.png"
                    className="bg-white"
                    alt=""
                  />
                </div>
                <div className="position-absolute h-100 top-0 w-100 d-flex align-content-center justify-content-center">
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <img
                      alt=""
                      className="w-75"
                      src="https://6valley.6amtech.com/public/assets/back-end/img/icons/product-upload-icon.svg"
                    />
                    <h3 className="text-muted text-capitalize">Upload image</h3>
                  </div>
                </div>
              </div>
              <p className="text-muted text-center mt-2">
                {" "}
                Image format : Jpg, png, jpeg, webp, <br /> Image size : Max 2
                MB
              </p>
            </div>
          </div>
        </div>
        <div className="row justify-content-end gap-3 mt-3 mx-1">
          <button type="reset" className="btn btn-secondary px-5">
            Reset
          </button>
          <button
            type="submit"
            className="btn px-4 py-2 bg-[#A1CB46] text-white hover:bg-[#7e9f37]"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderMedia;
