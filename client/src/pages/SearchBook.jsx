import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import BookSingleCard from "../components/home/BookSingleCard";
import BooksCard from "../components/home/BooksCard";

const SearchBook = () => {
  const [searchParams] = useSearchParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchBooks = async () => {
      // Skip if no search parameters
      if (searchParams.toString() === "") {
        setBooks([]);
        return;
      }

      setLoading(true);

      try {
        const params = Object.fromEntries(searchParams);
        const response = await axios.get("http://localhost:3000/api/books", {
          params,
        });

        // Handle response data
        if (!response.data?.data?.length) {
          enqueueSnackbar("No books found matching your criteria", {
            variant: "info",
          });
          setBooks([]);
        } else {
          setBooks(response.data.data);
        }
      } catch (error) {
        setBooks([]);
        if (error.response) {
          // Backend returned an error response (4xx/5xx)
          enqueueSnackbar(
            error.response.data.message || "Error fetching books",
            {
              variant: error.response.status === 400 ? "warning" : "error",
            }
          );
        } else {
          // Network error or no response
          enqueueSnackbar("Network error. Please try again.", {
            variant: "error",
          });
        }
      } finally {
        setLoading(false);
      }
    };

    // Add debounce to prevent rapid firing of requests
    const debounceTimer = setTimeout(fetchBooks, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchParams, enqueueSnackbar]);

  return (
    <div className="search-results">
      <div className="mt-2 ml-3"><BackButton />
      <h1 className="text-3xl mt-2 text-center">Search Results</h1>
      </div>
      {loading ? (
        <Spinner />
      ) : books.length === 0 ? (
        <p className="no-results">
          No books found. Try different search criteria.
        </p>
      ) : (
        <ul className="book-list">
          <BooksCard books={books} />
        </ul>
      )}
    </div>
  );
};

export default SearchBook;
