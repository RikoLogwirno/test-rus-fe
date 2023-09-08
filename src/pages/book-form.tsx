import React, { useState, useEffect } from "react";
// import Layout from '../components/Layout'; // Assuming you have a Layout component
import { HeadFC, PageProps, navigate } from "gatsby";
import Button from "../components/Button";
import "./book-form.scss";

interface BookFormProps {
  location: {
    state: { bookId?: string };
    search: string;
  };
}

const BookForm: React.FC<BookFormProps> = ({ location }) => {
  const queryParams = new URLSearchParams(location.search);
  const bookId = queryParams.get("bookId");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    authors: "",
    published_year: "",
    tags: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    authors: "",
    published_year: "",
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (bookId) {
      fetch(`http://127.0.0.1:8000/api/books/${bookId}`)
        .then((response) => response.json())
        .then((data) => setFormData(data.book))
        .catch((error) => console.error(error));
    }
  }, []);

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    // Client-side validation (you can add more complex validation rules)
    const validationErrors: any = {};

    if (!formData.title) {
      validationErrors.title = "Title is required";
    }

    if (!formData.description) {
      validationErrors.description = "Description is required";
    }

    if (!formData.authors) {
      validationErrors.authors = "Authors are required";
    }

    if (!formData.published_year) {
      validationErrors.published_year = "Published Year is required";
    }

    setErrors(validationErrors);

    // If there are validation errors, do not submit the form
    if (Object.keys(validationErrors).length === 0) {
      setSubmitting(true);

      if (bookId) {
        // Update book by ID
        fetch(`http://127.0.0.1:8000/api/books/${bookId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((response) => response.json())
          .then((data) => {
            setSubmitting(false);
            navigate("/");
          })
          .catch((error) => {
            setSubmitting(false);
            console.error(error);
          });
      } else {
        // Create a new book
        fetch("http://127.0.0.1:8000/api/books", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((response) => response.json())
          .then((data) => {
            setSubmitting(false);
            navigate("/");
          })
          .catch((error) => {
            setSubmitting(false);
            console.error(error);
          });
      }
    }
  };

  return (
    <main>
      <h1>{bookId ? "Edit Book" : "Create New Book"}</h1>
      <div className="book-form">
        <div className="form-field">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>

        <div className="form-field">
          <label>Description:</label>
          <textarea
            rows={4}
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
          {errors.description && (
            <span className="error">{errors.description}</span>
          )}
        </div>

        <div className="form-field">
          <label>Authors:</label>
          <input
            type="text"
            name="authors"
            value={formData.authors}
            onChange={handleInputChange}
          />
          {errors.authors && <span className="error">{errors.authors}</span>}
        </div>

        <div className="form-field">
          <label>Published Year:</label>
          <input
            type="text"
            name="published_year"
            value={formData.published_year}
            onChange={handleInputChange}
          />
          {errors.published_year && (
            <span className="error">{errors.published_year}</span>
          )}
        </div>

        <div className="form-field">
          <label>Tags:</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-field">
          <Button
            onClick={handleSubmit}
            className={submitting ? "disabled" : undefined}
          >
            {submitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </div>
    </main>
  );
};

export default BookForm;

export const Head: HeadFC = () => <title>Riko Logwirno | Test RUS FE</title>;
