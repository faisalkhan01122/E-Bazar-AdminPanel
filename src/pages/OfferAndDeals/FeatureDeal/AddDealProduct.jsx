
// import axios from 'axios';
// import React, { useEffect, useState, useRef } from 'react';
// import { useParams } from 'react-router-dom';
// import {
//     AiOutlineSearch,
//     AiOutlineDelete,
//     AiOutlineCheckCircle,
// } from "react-icons/ai";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Swal from 'sweetalert2';
// import ApiUrl from '../../../ApiUrl';

// const AddNewProductComponent = () => {
//     const { id } = useParams(); // Get the feature deal ID from the URL
//     const [deals, setDeals] = useState([]);
//     const [selectedProduct, setSelectedProduct] = useState(null);
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     const [featureDeal, setFeatureDeal] = useState(null); // State to hold feature deal data
//     const dropdownRef = useRef(null);

//     const fetchDeals = async () => {
//         try {
//             const response = await axios.get(`${ApiUrl}products/`);
//         //    console.log("")
//             const formattedDeals = response.data.doc.map((deal) => ({
//                 id: deal._id,
//                 title: deal.name,
//                 productInfo: deal.description,
//                 category: deal.category.name,
//                 // brand: deal.brand.name,
//                 thumbnail: deal.thumbnail,
//             }));
//             setDeals(formattedDeals);
//         } catch (error) {
//             console.error("Error fetching deals:", error);
//             toast.error("Error fetching deals.");
//         }
//     };

//     const fetchFeatureDeal = async () => {
//         try {
//             const response = await axios.get(`/featured-deals/${id}`);
//             setFeatureDeal(response.data.doc);
//         } catch (error) {
//             console.error("Error fetching feature deal:", error);
//             toast.error("Error fetching feature deal.");
//         }
//     };

//     useEffect(() => {
//         fetchDeals();
//         fetchFeatureDeal(); // Fetch feature deal data
//     }, []);

//     const toggleDropdown = () => {
//         setDropdownOpen(!dropdownOpen);
//     };

//     const handleProductSelect = (product) => {
//         setSelectedProduct(product);
//         setDropdownOpen(false);
//     };

//     const handleOutsideClick = (e) => {
//         if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//             setDropdownOpen(false);
//         }
//     };

//     useEffect(() => {
//         document.addEventListener("mousedown", handleOutsideClick);
//         return () => document.removeEventListener("mousedown", handleOutsideClick);
//     }, []);

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         if (selectedProduct) {
//             try {
//                 console.log("selcted product id ==========", selectedProduct)
//                 const response = await axios.put(`${ApiUrl}featured-deals/${id}/add-product`, {
//                     productId: selectedProduct._id,
//                 });
//                 toast.success('Product added successfully.');
//                 // console.log('Product added successfully:', response.data);
//                 fetchFeatureDeal(); // Fetch updated feature deal data
//             } catch (error) {
//                 console.error('Error adding product to feature deal:', error);
//                 toast.error('Error adding product to feature deal.');
//             }
//         } else {
//             toast.warn('Please select a product.');
//         }
//     };

//     const handleDeleteProduct = async (productId) => {
//         try {
//             const result = await Swal.fire({
//                 title: 'Are you sure?',
//                 text: "You won't be able to revert this!",
//                 icon: 'warning',
//                 showCancelButton: true,
//                 confirmButtonColor: '#3085d6',
//                 cancelButtonColor: '#d33',
//                 confirmButtonText: 'Yes, delete it!'
//             });

//             if (result.isConfirmed) {
//                 await axios.delete(`http://localhost:3000/api/feature-deals/${id}/remove-product/${productId}`);
//                 toast.success('Product removed successfully.');
//                 // console.log('Product removed successfully');
//                 fetchFeatureDeal(); // Fetch updated feature deal data
//             }
//         } catch (error) {
//             console.error('Error removing product from feature deal:', error);
//             toast.error('Error removing product from feature deal.');
//         }
//     };

//     return (
//         <div className="content container-fluid snipcss-GGjKD">
//             <ToastContainer />
//             <div className="mb-3">
//                 <h2 className="h1 mb-0 text-capitalize flex gap-2">
//                     <img src="https://6valley.6amtech.com/public/assets/back-end/img/inhouse-product-list.png" className="mb-1 mr-1" alt="" /> Add new product
//                 </h2>
//             </div>
//             <div className="row">
//                 <div className="col-md-12">
//                     <div className="card">
//                         <div className="card-header">
//                             <h3 className="mb-0 text-capitalize">Featured deal</h3>
//                         </div>
//                         <div className="card-body">
//                             <form onSubmit={handleSubmit}>
//                                 <div className="form-group">
//                                     <div className="row">
//                                         <div className="col-md-12 mt-3">
//                                             <label htmlFor="product" className="title-color">
//                                                 Products
//                                             </label>
//                                             <div
//                                                 ref={dropdownRef}
//                                                 className={`dropdown select-product-search w-100 ${dropdownOpen ? "show" : ""}`}
//                                             >
//                                                 <button
//                                                     type="button"
//                                                     className="form-control text-start dropdown-toggle text-capitalize select-product-button"
//                                                     onClick={toggleDropdown}
//                                                 >
//                                                     {selectedProduct ? selectedProduct.title : "Select product"}
//                                                 </button>
//                                                 <div className={`dropdown-menu w-100 px-2 ${dropdownOpen ? "show" : ""}`}>
//                                                     <div className="search-form mb-3">
//                                                         <button type="button" className="btn">
//                                                             <AiOutlineSearch />
//                                                         </button>
//                                                         <input
//                                                             type="text"
//                                                             className="js-form-search form-control search-bar-input search-product"
//                                                             placeholder="Search menu..."
//                                                         />
//                                                     </div>
//                                                     <div className="d-flex flex-column gap-3 max-h-40vh overflow-y-auto overflow-x-hidden search-result-box">
//                                                         {deals.map((deal) => (
//                                                             <div
//                                                                 key={deal.id}
//                                                                 className="select-product-item media gap-3 border-bottom py-2 cursor-pointer"
//                                                                 onClick={() => handleProductSelect(deal)}
//                                                             >
//                                                                 <img
//                                                                     className="avatar avatar-xl border"
//                                                                     width="40"
//                                                                     height="40"
//                                                                     src={`http://localhost:3000/${deal.thumbnail}`}
//                                                                     alt="product"
//                                                                 />
//                                                                 <div className="media-body d-flex justify-content-between align-items-center">
//                                                                     <div>
//                                                                         <h5 className="text-hover-primary h6">
//                                                                             {deal.title.length > 20
//                                                                                 ? `${deal.title.slice(0, 20)}...`
//                                                                                 : deal.title}
//                                                                         </h5>
//                                                                         <div className="text-muted text-capitalize">
//                                                                             {deal.category} - {deal.brand}
//                                                                         </div>
//                                                                     </div>
//                                                                     <div className="mr-2">
//                                                                         <AiOutlineCheckCircle />
//                                                                     </div>
//                                                                 </div>
//                                                             </div>
//                                                         ))}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="d-flex justify-content-end">
//                                     <button type="submit" className="btn text-white px-4" style={{ background: "green" }}>Add</button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             {/* Product table section */}
//             <div className="row mt-3">
//                 <div className="col-md-12">
//                     <div className="card">
//                         <div className="px-3 py-4">
//                             <h5 className="mb-0 text-capitalize"> Product table <span className="badge badge-soft-dark radius-50 fz-12 ml-1">{featureDeal ? featureDeal.activeProducts : 0}</span>
//                             </h5>
//                         </div>
//                         <div className="table-responsive">
//                             <table className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100">
//                                 <thead className="thead-light thead-50 text-capitalize">
//                                     <tr>
//                                         <th>SL</th>
//                                         <th>Image</th>
//                                         <th>Name</th>
//                                         <th>Price</th>
//                                         <th className="text-center">Action</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {featureDeal && featureDeal.productIds.length > 0 ? (
//                                         featureDeal.productIds.map((product, index) => (
//                                             <tr key={product._id}>
//                                                 <td>{index + 1}</td>
//                                                 <td>
//                                                     <img src={`http://localhost:3000/${product.thumbnail}`} alt="" className="avatar avatar-md border" />
//                                                 </td>
//                                                 <td><a href="javascript:" target="_blank" className="font-weight-semibold title-color hover-c1">{product.name}</a></td>
//                                                 <td>{product.price}</td>
//                                                 <td>
//                                                     <div className="d-flex justify-content-center">
//                                                         <button
//                                                             title="Delete"
//                                                             className="btn btn-outline-danger hover:text-white btn-sm border-green-400"
//                                                             onClick={() => handleDeleteProduct(product._id)}
//                                                         >
//                                                             <AiOutlineDelete />
//                                                         </button>
//                                                     </div>
//                                                 </td>
//                                             </tr>
//                                         ))
//                                     ) : (
//                                         <tr>
//                                             <td colSpan="5" className="text-center">No products found</td>
//                                         </tr>
//                                     )}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AddNewProductComponent;




import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../../components/redux/product/productSlice'; // Import the fetchProducts action
import {
    AiOutlineSearch,
    AiOutlineDelete,
    AiOutlineCheckCircle,
} from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import ApiUrl from '../../../ApiUrl';
import axios from 'axios';
import ImageApiUrl from '../../../ImageApiUrl';

const AddNewProductComponent = () => {
    const { id } = useParams(); // Get the feature deal ID from the URL
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products || []); 
    // Access products from the Redux store
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [featureDeal, setFeatureDeal] = useState(null); // State to hold feature deal data
    const dropdownRef = useRef(null);

    // Fetch feature deal data
    const fetchFeatureDeal = async () => {
        try {
            console.log("id====", id )
            const response = await axios.get(`${ApiUrl}/featured-deals/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setFeatureDeal(response.data.doc);
        } catch (error) {
            console.error("Error fetching feature deal:", error);
            toast.error("Error fetching feature deal.");
        }
    };

    useEffect(() => {
        dispatch(fetchProducts()); // Dispatch the fetchProducts action to fetch products
        fetchFeatureDeal(); // Fetch feature deal data
    }, [dispatch]);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleProductSelect = (product) => {
        setSelectedProduct(product);
        setDropdownOpen(false);
    };

    const handleOutsideClick = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (selectedProduct) {
            try {
                const response = await axios.put(`${ApiUrl}featured-deals/${id}/add-product`, {
                    productId: selectedProduct._id,
                });
                toast.success('Product added successfully.');
                fetchFeatureDeal(); // Fetch updated feature deal data
            } catch (error) {
                console.error('Error adding product to feature deal:', error);
                toast.error('Error adding product to feature deal.');
            }
        } else {
            toast.warn('Please select a product.');
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            });

            if (result.isConfirmed) {
                await axios.delete(`http://localhost:3000/api/featured-deals/${id}/remove-product/${productId}`);
                toast.success('Product removed successfully.');
                fetchFeatureDeal(); // Fetch updated feature deal data
            }
        } catch (error) {
            console.error('Error removing product from feature deal:', error);
            toast.error('Error removing product from feature deal.');
        }
    };

    return (
        <div className="content container-fluid snipcss-GGjKD">
            <ToastContainer />
            <div className="mb-3">
                <h2 className="h1 mb-0 text-capitalize flex gap-2">
                    <img src="https://6valley.6amtech.com/public/assets/back-end/img/inhouse-product-list.png" className="mb-1 mr-1" alt="" /> Add new product
                </h2>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="mb-0 text-capitalize">Featured deal</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-12 mt-3">
                                            <label htmlFor="product" className="title-color">
                                                Products
                                            </label>
                                            <div
                                                ref={dropdownRef}
                                                className={`dropdown select-product-search w-100 ${dropdownOpen ? "show" : ""}`}
                                            >
                                                <button
                                                    type="button"
                                                    className="form-control text-start dropdown-toggle text-capitalize select-product-button"
                                                    onClick={toggleDropdown}
                                                >
                                                    {selectedProduct ? selectedProduct.title : "Select product"}
                                                </button>
                                                <div className={`dropdown-menu w-100 px-2 ${dropdownOpen ? "show" : ""}`}>
                                                    <div className="search-form mb-3">
                                                        <button type="button" className="btn">
                                                            <AiOutlineSearch />
                                                        </button>
                                                        <input
                                                            type="text"
                                                            className="js-form-search form-control search-bar-input search-product"
                                                            placeholder="Search menu..."
                                                        />
                                                    </div>
                                                    <div className="d-flex flex-column gap-3 max-h-40vh overflow-y-auto overflow-x-hidden search-result-box">
                                                        {products.map((product) => (
                                                            <div
                                                                key={product.id}
                                                                className="select-product-item media gap-3 border-bottom py-2 cursor-pointer"
                                                                onClick={() => handleProductSelect(product)}
                                                            >
                                                                <img
                                                                    className="avatar avatar-xl border"
                                                                    width="40"
                                                                    height="40"
                                                                    src={`${ImageApiUrl}/${product.thumbnail}`}
                                                                    alt="product"
                                                                />
                                                                <div className="media-body d-flex justify-content-between align-items-center">
                                                                    <div>
                                                                        <h5 className="text-hover-primary h6">
                                                                            {product.name.length > 20
                                                                                ? `${product.name.slice(0, 20)}...`
                                                                                : product.name}
                                                                        </h5>
                                                                        <div className="text-muted text-capitalize">
                                                                            {product.category} - {product.brand}
                                                                        </div>
                                                                    </div>
                                                                    <div className="mr-2">
                                                                        <AiOutlineCheckCircle />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <button type="submit" className="btn text-white px-4" style={{ background: "green" }}>Add</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* Product table section */}
            <div className="row mt-3">
                <div className="col-md-12">
                    <div className="card">
                        <div className="px-3 py-4">
                            <h5 className="mb-0 text-capitalize"> Product table <span className="badge badge-soft-dark radius-50 fz-12 ml-1">{featureDeal ? featureDeal.activeProducts : 0}</span>
                            </h5>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100">
                                <thead className="thead-light thead-50 text-capitalize">
                                    <tr>
                                        <th>SL</th>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {featureDeal && featureDeal.productIds.length > 0 ? (
                                        featureDeal.productIds.map((product, index) => (
                                            <tr key={product._id}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    <img src={`${ImageApiUrl}${product.thumbnail}`} alt="" className="avatar avatar-md border" />
                                                </td>
                                                <td>
                                                    <span className="d-block font-size-sm">{product.name}</span>
                                                </td>
                                                <td>
                                                    {product.price}
                                                </td>
                                                <td className="text-center">
                                                    <button
                                                        className="btn btn-outline-danger btn-sm square-btn"
                                                        onClick={() => handleDeleteProduct(product._id)}
                                                    >
                                                        <AiOutlineDelete />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="text-center">No products found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddNewProductComponent;
