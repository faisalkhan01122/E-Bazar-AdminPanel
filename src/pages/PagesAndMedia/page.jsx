// ThirdPartySettings.js

import React, { useState } from "react";
import SocialMedia from "./SocialMedia";
import HeaderMedia from "./HeaderMedia/HeaderMedia";
import BusinessProcess from "./BusinessProcess/BusinessProcess";
import DownloadAppSection from "./DowloadApp/DownloadApp";
import FAQ from "./FAQ/FAQ";
import FaqList from "./FAQ/FAQ";
// import { FaWhatsapp } from 'react-icons/fa'; // Import React icon for WhatsApp
// import './OtherConfig.css'

const PageAndMedia = () => {
  const [currentTab, setCurrentTab] = useState("header"); // State to manage active tab

  // Function to handle tab change
  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  // Function to render content based on currentTab state
  const renderContent = () => {
    switch (currentTab) {
      case "header":
        return (
          // <a className="text-capitalize" href="https://6valley.6amtech.com/admin/social-login/view">Social media login content goes here</a>
          // Replace with actual content for social media login
          <HeaderMedia />
        );
      case "whysellwithus":
        return (
          // <a className="text-capitalize" href="https://6valley.6amtech.com/admin/social-login/view">Social media login content goes here</a>
          // Replace with actual content for social media login
          <HeaderMedia />
          // <SocialLoginSettings />
        );
      case "busnessproces":
        return (
          // <a className="text-capitalize" href="https://6valley.6amtech.com/admin/business-settings/mail"> Mail config content goes here</a>
          // Replace with actual content for mail config
          <BusinessProcess />
        );
      case "downloadapp":
        return (
          // <a className="text-capitalize" href="https://6valley.6amtech.com/admin/business-settings/sms-module">SMS config content goes here</a>
          <DownloadAppSection />
          // Replace with actual content for SMS config
        );
      case "FAQ":
        return (
          // <a className="text-capitalize" href="https://6valley.6amtech.com/admin/business-settings/sms-module">SMS config content goes here</a>
          <FaqList />
          // Replace with actual content for Recaptcha
        );

      default:
        return null;
    }
  };

  return (
    <div className="content container-fluid snipcss-YGKeU">
      <div className="mb-4 pb-2">
        <h2 className="h1 mb-0 text-capitalize d-flex align-items-center gap-2">
          <img
            src="https://6valley.6amtech.com/public/assets/back-end/img/3rd-party.png"
            alt=""
          />{" "}
          Vender Registration
        </h2>
      </div>

      {/* Inline page menu */}
      <div className="inline-page-menu my-4">
        <ul className="list-unstyled">
          <li className={currentTab === "header" ? "active" : ""}>
            <button
              className="text-capitalize"
              onClick={() => handleTabChange("header")}
            >
              Header
            </button>
          </li>
          <li className={currentTab === "whysellwithus" ? "active" : ""}>
            <button
              className="text-capitalize"
              onClick={() => handleTabChange("whysellwithus")}
            >
              Why Sell With Us
            </button>
          </li>
          <li className={currentTab === "busnessproces" ? "active" : ""}>
            <button
              className="text-capitalize"
              onClick={() => handleTabChange("busnessproces")}
            >
              Bussiness Process
            </button>
          </li>
          <li className={currentTab === "downloadapp" ? "active" : ""}>
            <button
              className="text-capitalize"
              onClick={() => handleTabChange("downloadapp")}
            >
              Download App
            </button>
          </li>
          <li className={currentTab === "FAQ" ? "active" : ""}>
            <button
              className="text-capitalize"
              onClick={() => handleTabChange("FAQ")}
            >
              FAQ
            </button>
          </li>
        </ul>
      </div>

      {/* Render content based on currentTab */}
      <div className="card overflow-hidden">{renderContent()}</div>
    </div>
  );
};

export default PageAndMedia;
