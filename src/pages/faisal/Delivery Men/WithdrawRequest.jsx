import React, { useState } from "react";
import { BiHide } from "react-icons/bi";
import { CiImport } from "react-icons/ci";
import { FaChevronDown } from "react-icons/fa";
import { FiEdit, FiSearch, FiTrash } from "react-icons/fi";

const WithdrawRequest = () => {
  const list = [
    {
      id: 1,
      name: "Will Smith",
      price: "$500.00",
      img: "Pending",
      priority: "20-Nov-2022, 01:41:01 AM",
    },
    {
      id: 2,
      price: "$4,000.00",
      name: "Will Smith",
      img: "Approud",
      priority: "20-Nov-2022, 01:40:43 AM",
    },
  ];
  const staticProducts = [
    {
      id: 1,
      name: "Product A",
      image: "https://via.placeholder.com/50",
      type: "Electronics",
      price: 100,
      featured: true,
      active: true,
    },
    {
      id: 2,
      name: "Product B",
      image: "https://via.placeholder.com/50",
      type: "Furniture",
      price: 200,
      featured: false,
      active: false,
    },
    {
      id: 3,
      name: "Product C",
      image: "https://via.placeholder.com/50",
      type: "Clothing",
      price: 50,
      featured: true,
      active: true,
    },
    {
      id: 4,
      name: "Product D",
      image: "https://via.placeholder.com/50",
      type: "Clothing",
      price: 50,
      featured: true,
      active: true,
    },
    {
      id: 5,
      name: "Product E",
      image:
        "https://th.bing.com/th/id/OIP.yuIhGQGVmD9pCQd22TKOWAHaHd?rs=1&pid=ImgDetMain",
      type: "Clothing",
      price: 50,
      featured: true,
      active: true,
    },
    {
      id: 6,
      name: "Product F",
      image: "https://via.placeholder.com/50",
      type: "Clothing",
      price: 50,
      featured: true,
      active: true,
    },
    {
      id: 7,
      name: "Product G",
      image: "https://via.placeholder.com/50",
      type: "Clothing",
      price: 50,
      featured: true,
      active: true,
    },
    // Add more products as needed
  ];
  // State to manage form inputs and filtered products
  const [filters, setFilters] = useState({
    brand: "",
    category: "",
    subCategory: "",
    subSubCategory: "",
    searchValue: "",
  });

  const [products, setProducts] = useState(staticProducts);

  const handleInputChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Apply filtering logic
    const filteredProducts = staticProducts.filter((product) => {
      return (
        (filters.searchValue === "" ||
          product.name
            .toLowerCase()
            .includes(filters.searchValue.toLowerCase())) &&
        (filters.category === "" || product.type === filters.category)
      );
    });
    setProducts(filteredProducts);
  };

  const handleReset = () => {
    setFilters({
      brand: "",
      category: "",
      subCategory: "",
      subSubCategory: "",
      searchValue: "",
    });
    setProducts(staticProducts);
  };
  return (
    <div className="bg-[#F9F9FB]  px-5 py-5 w-[100%] mb-5">
      <div className="font-bold text-[1.3rem] flex gap-2 items-center">
        <img
          src="https://6valley.6amtech.com/public/assets/back-end/img/withdraw-icon.png"
          alt=""
          className="h-7 w-7"
        />
        <h1>Withdraw Request</h1>
      </div>
      <div className="card mt-5">
        <div className="d-flex justify-content-between align-items-center  px-5">
          <div className="flex gap-3">
            <h1 className="text-[1rem ] font-bold">Withdraw Request Table</h1>
            <span className="badge badge-soft-dark radius-50 fz-14 ml-1">
              {products.length}
            </span>
          </div>
          <div>
            <div className="px-3 py-4">
              <div className="row align-items-center">
                <div className="col-lg-12 d-flex justify-content-end gap-3 align-items-center">
                  <form onSubmit={handleSearchSubmit}>
                    <div className="input-group input-group-custom input-group-merge">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <FiSearch />
                        </div>
                      </div>
                      <input
                        type="search"
                        name="searchValue"
                        className="form-control"
                        placeholder="Search by Product Name"
                        value={filters.searchValue}
                        onChange={handleInputChange}
                      />
                      <button
                        type="submit"
                        className="btn btn--primary bg-[#0177CD] text-white "
                      >
                        Search
                      </button>
                    </div>
                  </form>
                  <div className="flex flex-column align-content-center">
                    <button
                      type="button"
                      className="  flex gap-2 items-center justify-center border-blue-500 border text-blue-300 rounded px-3 py-2"
                    >
                      {" "}
                      <CiImport />
                      {/* <FiDownload /> Export <FiChevronDown /> */}
                      Export
                      <FaChevronDown />
                    </button>
                    <select
                      name="/"
                      id=""
                      className="border px-10 py-2 rounded border-gray-300 bg-white w-full "
                    >
                      <option value="">All </option>
                      <option value="">Approved </option>
                      <option value="">Denied</option>
                      <option value="">Pending </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-blue-50 text-blue-900">
                <tr>
                  <th className="px-4 py-2">SL</th>
                  <th className="px-4 py-2 text-center">Amount</th>

                  <th className="px-4 py-2 text-center"> Name</th>

                  <th className="px-4 py-2 text-center">Request Time</th>
                  <th className="px-4 py-2 text-center">Status</th>
                  <th className="px-4 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {list.map((product, index) => (
                  <tr key={product.id} className=" hover:bg-gray-100">
                    <td
                      className=" px-3 py-4 text-center font-semibold"
                      key={index}
                    >
                      {product.id}
                    </td>
                    <td className="px-4 py-2 text-center text-[.9rem] font-semibold">
                      {product.price}
                    </td>{" "}
                    <td className="px-4 py-2 text-center text-[.9rem] font-semibold">
                      {product.name}
                    </td>
                    <td className="px-4 py-2 text-center font-semibold">
                      ${product.priority}
                    </td>
                    <td className="px-4 py-2 text-center font-semibold text-green-500">
                      {product.img}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          type="button"
                          className="btn btn-outline-primary btn-sm text-blue-500 border-blue-500"
                        >
                          <BiHide />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="page-area">
          <nav aria-label="Page navigation">
            <ul className="pagination flex gap-2">
              <li className="page-item">
                <button className="page-link">
                  {/* <FiChevronLeft /> Prev */}
                  Prev
                </button>
              </li>
              <li className="page-item active">
                <button className="page-link">1</button>
              </li>
              <li className="page-item">
                <button className="page-link">2</button>
              </li>
              <li className="page-item">
                <button className="page-link">3</button>
              </li>
              <li className="page-item">
                <button className="page-link">
                  {/* Next <FiChevronRight /> */}
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default WithdrawRequest;
