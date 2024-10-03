// import React, { useState } from 'react';
// import { FaUpload, FaTrash } from 'react-icons/fa';
// import { AiOutlineFileImage } from 'react-icons/ai';
// import axios from 'axios';
// import FileUpload from '../../components/FormInput/FileUpload';
// import PreviewImage from '../../components/FormInput/PreviewImage';
// import ApiUrl from '../../ApiUrl';

// const AddNewBrand = () => {
//   const [selectedLanguage, setSelectedLanguage] = useState('en');
//   const [imagePreview, setImagePreview] = useState(null);
//   const [brandName, setBrandName] = useState('');
//   const [status, setStatus] = useState('inactive');
//   const [imageAltText, setImageAltText] = useState('');
//   const [image, setImage] = useState(null);

//   // Retrieve token from local storage
//   const token = localStorage.getItem('token');

//   const handleLanguageChange = (lang) => {
//     setSelectedLanguage(lang);
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('name', brandName);
//     formData.append('logo', image);
//     formData.append('imageAltText', imageAltText);
//     // formData.append('status', status);

//     try {

//       const response = await axios.post(`${ApiUrl}brands`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           'Authorization': `Bearer ${token}` // Include token in headers
//         }
//       });
//       alert('Brand added successfully!');
//     } catch (error) {
//       alert('Error adding brand: ' + error.response?.data?.message || error.message);
//     }
//   };

//   const handleReset = () => {
//     setSelectedLanguage('en');
//     setImagePreview(null);
//     setBrandName('');
//     setImageAltText('');
//     setImage(null);
//   };

//   return (
//     <div className="content container-fluid snipcss-AwJk2">
//       <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
//         <h2 className="h1 mb-0 d-flex align-items-center gap-2">
//           <img width="20" src="https://6valley.6amtech.com/public/assets/back-end/img/brand.png" alt="Brand" /> Brand Setup
//         </h2>
//       </div>
//       <div className="row g-3">
//         <div className="col-md-12">
//           <div className="card mb-3">
//             <div className="card-body text-start">
//               <form className="brand-setup-form" onSubmit={handleSubmit}>
//                 <ul className="nav nav-tabs w-fit-content mb-4">
//                   <li className="nav-item">
//                     <span className={`nav-link form-system-language-tab cursor-pointer ${selectedLanguage === 'en' ? 'active' : ''}`} onClick={() => handleLanguageChange('en')}> English(EN) </span>
//                   </li>
//                   <li className="nav-item">
//                     <span className={`nav-link form-system-language-tab cursor-pointer ${selectedLanguage === 'sa' ? '' : ''}`} onClick={() => handleLanguageChange('sa')}> Arabic(SA) </span>
//                   </li>
//                   <li className="nav-item">
//                     <span className={`nav-link form-system-language-tab cursor-pointer ${selectedLanguage === 'bd' ? '' : ''}`} onClick={() => handleLanguageChange('bd')}> Bangla(BD) </span>
//                   </li>
//                   <li className="nav-item">
//                     <span className={`nav-link form-system-language-tab cursor-pointer ${selectedLanguage === 'in' ? '' : ''}`} onClick={() => handleLanguageChange('in')}> Hindi(IN) </span>
//                   </li>
//                 </ul>
//                 <div className="row flex">
//                   <div className="col-md-6">
//                     <div className="col-md-12">
//                       <div className={`form-group form-system-language-form ${selectedLanguage === 'en' ? '' : 'd-none'}`} id="en-form">
//                         <label htmlFor="name-en" className="title-color"> Brand Name <span className="text-danger">*</span> (EN) </label>
//                         <input type="text" name="name-en" className="form-control" id="name-en" placeholder="Ex : LUX" required value={brandName} onChange={(e) => setBrandName(e.target.value)} />
//                       </div>
//                     </div>
//                     <div className="col-md-12">
//                       <div className={`form-group form-system-language-form ${selectedLanguage === 'en' ? '' : 'd-none'}`} id="en-alt-form">
//                         <label htmlFor="alt-text-en" className="title-color"> Image Alt Text <span className="text-danger">*</span> (EN) </label>
//                         <input type="text" name="alt-text-en" className="form-control" id="alt-text-en" placeholder="Ex : Brand Logo" required value={imageAltText} onChange={(e) => setImageAltText(e.target.value)} />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="col-md-6">
//                     {imagePreview ? (
//                       <PreviewImage image={image} altText={imageAltText} />
//                     ) : (
//                       <PreviewImage image={null} altText={imageAltText} />
//                     )}
//                     <FileUpload
//                       name="image"
//                       label="Logo"
//                       accept="image/*"
//                       onChange={handleImageChange}
//                     />
//                   </div>
//                 </div>
//                 <div className="d-flex justify-content-end">
//                   <button type="reset" className="btn btn-secondary mx-2" onClick={handleReset}>Reset</button>
//                   <button type="submit" className="btn btn-primary">Submit</button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddNewBrand;

import React, { useState } from "react";
import { FaUpload, FaTrash } from "react-icons/fa";
import { AiOutlineFileImage } from "react-icons/ai";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toastify styles
import { useNavigate } from "react-router-dom";
import FileUpload from "../../components/FormInput/FileUpload";
import PreviewImage from "../../components/FormInput/PreviewImage";
import ApiUrl from "../../ApiUrl";

const AddNewBrand = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [imagePreview, setImagePreview] = useState(null);
  const [brandName, setBrandName] = useState("");
  const [status, setStatus] = useState("inactive");
  const [imageAltText, setImageAltText] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate(); // Hook to navigate programmatically

  // Retrieve token from local storage
  const token = localStorage.getItem("token");

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", brandName);
    formData.append("logo", image);
    formData.append("imageAltText", imageAltText);

    try {
      const response = await axios.post(`${ApiUrl}brands`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Include token in headers
        },
      });

      toast.success("Brand added successfully!");

      // Redirect to /brandlist after a brief delay
      setTimeout(() => {
        navigate("/brandlist");
      }, 3000);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(`Error adding brand: ${errorMessage}`);
    }
  };

  const handleReset = () => {
    setSelectedLanguage("en");
    setImagePreview(null);
    setBrandName("");
    setImageAltText("");
    setImage(null);
  };

  return (
    <div className="content container-fluid snipcss-AwJk2">
      <ToastContainer /> {/* Toast notifications container */}
      <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
        <h2 className="h1 mb-0 d-flex align-items-center gap-2">
          <img
            width="20"
            src="https://6valley.6amtech.com/public/assets/back-end/img/brand.png"
            alt="Brand"
          />{" "}
          Brand Setup
        </h2>
      </div>
      <div className="row g-3">
        <div className="col-md-12">
          <div className="card mb-3">
            <div className="card-body text-start">
              <form className="brand-setup-form" onSubmit={handleSubmit}>
                <ul className="nav nav-tabs w-fit-content mb-4">
                  <li className="nav-item">
                    <span
                      className={`nav-link form-system-language-tab cursor-pointer ${
                        selectedLanguage === "en" ? "active" : ""
                      }`}
                      onClick={() => handleLanguageChange("en")}
                    >
                      {" "}
                      English(EN){" "}
                    </span>
                  </li>
                  <li className="nav-item">
                    <span
                      className={`nav-link form-system-language-tab cursor-pointer ${
                        selectedLanguage === "sa" ? "" : ""
                      }`}
                      onClick={() => handleLanguageChange("sa")}
                    >
                      {" "}
                      Arabic(SA){" "}
                    </span>
                  </li>
                  <li className="nav-item">
                    <span
                      className={`nav-link form-system-language-tab cursor-pointer ${
                        selectedLanguage === "bd" ? "" : ""
                      }`}
                      onClick={() => handleLanguageChange("bd")}
                    >
                      {" "}
                      Bangla(BD){" "}
                    </span>
                  </li>
                  <li className="nav-item">
                    <span
                      className={`nav-link form-system-language-tab cursor-pointer ${
                        selectedLanguage === "in" ? "" : ""
                      }`}
                      onClick={() => handleLanguageChange("in")}
                    >
                      {" "}
                      Hindi(IN){" "}
                    </span>
                  </li>
                </ul>
                <div className="row flex">
                  <div className="col-md-6">
                    <div className="col-md-12">
                      <div
                        className={`form-group form-system-language-form ${
                          selectedLanguage === "en" ? "" : "d-none"
                        }`}
                        id="en-form"
                      >
                        <label htmlFor="name-en" className="title-color">
                          {" "}
                          Brand Name <span className="text-danger">
                            *
                          </span> (EN){" "}
                        </label>
                        <input
                          type="text"
                          name="name-en"
                          className="form-control"
                          id="name-en"
                          placeholder="Ex : LUX"
                          required
                          value={brandName}
                          onChange={(e) => setBrandName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div
                        className={`form-group form-system-language-form ${
                          selectedLanguage === "en" ? "" : "d-none"
                        }`}
                        id="en-alt-form"
                      >
                        <label htmlFor="alt-text-en" className="title-color">
                          {" "}
                          Image Alt Text <span className="text-danger">
                            *
                          </span>{" "}
                          (EN){" "}
                        </label>
                        <input
                          type="text"
                          name="alt-text-en"
                          className="form-control"
                          id="alt-text-en"
                          placeholder="Ex : Brand Logo"
                          required
                          value={imageAltText}
                          onChange={(e) => setImageAltText(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    {imagePreview ? (
                      <PreviewImage image={image} altText={imageAltText} />
                    ) : (
                      <PreviewImage image={null} altText={imageAltText} />
                    )}
                    <FileUpload
                      name="image"
                      label="Logo"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  <button
                    type="reset"
                    className="btn border border-secondary bg-secondary mx-2"
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="btn bg-primary hover:bg-primary-dark text-white"
                    style={{ color: "white" }}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewBrand;
