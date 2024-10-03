import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  createCategory,
  deleteCategory,
} from "../../components/redux/categorySlice";
import CategoryForm from "./CategoryForm";
import CategoryList from "./CategoryList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../../components/LoodingSpinner/LoadingSpinner";

const Categories = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(
    (state) => state.productCategory
  );

  const [newCategory, setNewCategory] = useState({
    name: "",
    priority: "",
    logo: null,
  });
  // const [newCategory, setNewCategory] = useState({ name: '', logo: null });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLang, setSelectedLang] = useState("en");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        await dispatch(fetchCategories({}));
      } catch (error) {
        toast.error("Failed to load categories");
        console.error(error.message);
      }
    };

    loadCategories();
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error("Failed to load categories");
    }
  }, [error]);

  const handleInputChange = (e) => {
    setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
  };

  const handleFileChange = (file) => {
    setNewCategory({ ...newCategory, logo: file });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", newCategory.name);
    // formData.append('priority', newCategory.priority);
    formData.append("logo", newCategory.logo);

    try {
      const action = await dispatch(createCategory(formData));
      if (createCategory.fulfilled.match(action)) {
        // setNewCategory({ name: '', priority: '', logo: null });
        setNewCategory({ name: "", logo: null });
        toast.success("Category added successfully");

        // Fetch categories again to update the list
        await dispatch(fetchCategories({}));
      } else {
        toast.error("Failed to add category");
      }
    } catch (error) {
      toast.error("Failed to add category");
      console.error(error.message);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      const action = await dispatch(deleteCategory(categoryId));
      if (deleteCategory.fulfilled.match(action)) {
        toast.success("Category deleted successfully");

        // Fetch categories again to update the list
        await dispatch(fetchCategories({}));
      } else {
        toast.error("Failed to delete category");
      }
    } catch (error) {
      toast.error("Failed to delete category");
      console.error(error.message);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCategories = categories.filter(
    (category) =>
      category.name &&
      category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading)
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container px-10 py-6">
      <ToastContainer />
      <div className="mb-5 mt-5">
        <h2 className="h1 mb-0 d-flex gap-3">
          <img
            src="https://6valley.6amtech.com/public/assets/back-end/img/brand-setup.png"
            alt=""
          />
          Category Setup
        </h2>
      </div>
      <CategoryForm
        selectedLang={selectedLang}
        newCategory={newCategory}
        onInputChange={handleInputChange}
        onFileChange={handleFileChange}
        onSubmit={handleFormSubmit}
      />
      <CategoryList
        categories={filteredCategories}
        handleDelete={handleDeleteCategory}
        handleSearch={handleSearch}
        searchQuery={searchQuery}
      />
    </div>
  );
};

export default Categories;
