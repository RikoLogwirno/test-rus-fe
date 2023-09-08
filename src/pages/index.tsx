import React, { useEffect, useState } from "react";
import { HeadFC, PageProps, navigate } from "gatsby";
import Table from "../components/Table";
import Button from "../components/Button";
import "./index.scss";

interface Book {
  id: number;
  description: string;
  title: string;
  authors: string;
  published_year: number;
  tags: string;
}

const data: Book[] = [
  {
    title: "Lorem ipsum",
    description: "Lorem ipsum",
    authors: "Lorem ipsum",
    published_year: 2020,
    tags: "Lorem ipsum",
  },
  {
    title: "Lorem ipsum 2",
    description: "Lorem ipsum 2",
    authors: "Lorem ipsum 2",
    published_year: 2021,
    tags: "Lorem ipsum 2",
  },
  {
    title: "Lorem ipsum 3",
    description: "Lorem ipsum 3",
    authors: "Lorem ipsum 3",
    published_year: 2023,
    tags: "Lorem ipsum 3",
  },
  {
    title: "Lorem ipsum",
    description: "Lorem ipsum",
    authors: "Lorem ipsum",
    published_year: 2020,
    tags: "Lorem ipsum",
  },
  {
    title: "Lorem ipsum 2",
    description: "Lorem ipsum 2",
    authors: "Lorem ipsum 2",
    published_year: 2021,
    tags: "Lorem ipsum 2",
  },
  {
    title: "Lorem ipsum 3",
    description: "Lorem ipsum 3",
    authors: "Lorem ipsum 3",
    published_year: 2023,
    tags: "Lorem ipsum 3",
  },
  {
    title: "Lorem ipsum",
    description: "Lorem ipsum",
    authors: "Lorem ipsum",
    published_year: 2020,
    tags: "Lorem ipsum",
  },
  {
    title: "Lorem ipsum 2",
    description: "Lorem ipsum 2",
    authors: "Lorem ipsum 2",
    published_year: 2021,
    tags: "Lorem ipsum 2",
  },
  {
    title: "Lorem ipsum 3",
    description: "Lorem ipsum 3",
    authors: "Lorem ipsum 3",
    published_year: 2023,
    tags: "Lorem ipsum 3",
  },
  {
    title: "Lorem ipsum",
    description: "Lorem ipsum",
    authors: "Lorem ipsum",
    published_year: 2020,
    tags: "Lorem ipsum",
  },
  {
    title: "Lorem ipsum 2",
    description: "Lorem ipsum 2",
    authors: "Lorem ipsum 2",
    published_year: 2021,
    tags: "Lorem ipsum 2",
  },
  {
    title: "Lorem ipsum 3",
    description: "Lorem ipsum 3",
    authors: "Lorem ipsum 3",
    published_year: 2023,
    tags: "Lorem ipsum 3",
  },
  {
    title: "Lorem ipsum",
    description: "Lorem ipsum",
    authors: "Lorem ipsum",
    published_year: 2020,
    tags: "Lorem ipsum",
  },
  {
    title: "Lorem ipsum 2",
    description: "Lorem ipsum 2",
    authors: "Lorem ipsum 2",
    published_year: 2021,
    tags: "Lorem ipsum 2",
  },
  {
    title: "Lorem ipsum 3",
    description: "Lorem ipsum 3",
    authors: "Lorem ipsum 3",
    published_year: 2023,
    tags: "Lorem ipsum 3",
  },
  {
    title: "Lorem ipsum",
    description: "Lorem ipsum",
    authors: "Lorem ipsum",
    published_year: 2020,
    tags: "Lorem ipsum",
  },
  {
    title: "Lorem ipsum 2",
    description: "Lorem ipsum 2",
    authors: "Lorem ipsum 2",
    published_year: 2021,
    tags: "Lorem ipsum 2",
  },
  {
    title: "Lorem ipsum 3",
    description: "Lorem ipsum 3",
    authors: "Lorem ipsum 3",
    published_year: 2023,
    tags: "Lorem ipsum 3",
  },
  {
    title: "Lorem ipsum",
    description: "Lorem ipsum",
    authors: "Lorem ipsum",
    published_year: 2020,
    tags: "Lorem ipsum",
  },
  {
    title: "Lorem ipsum 2",
    description: "Lorem ipsum 2",
    authors: "Lorem ipsum 2",
    published_year: 2021,
    tags: "Lorem ipsum 2",
  },
  {
    title: "Lorem ipsum 3",
    description: "Lorem ipsum 3",
    authors: "Lorem ipsum 3",
    published_year: 2023,
    tags: "Lorem ipsum 3",
  },
  {
    title: "Lorem ipsum",
    description: "Lorem ipsum",
    authors: "Lorem ipsum",
    published_year: 2020,
    tags: "Lorem ipsum",
  },
  {
    title: "Lorem ipsum 2",
    description: "Lorem ipsum 2",
    authors: "Lorem ipsum 2",
    published_year: 2021,
    tags: "Lorem ipsum 2",
  },
  {
    title: "Lorem ipsum 3",
    description: "Lorem ipsum 3",
    authors: "Lorem ipsum 3",
    published_year: 2023,
    tags: "Lorem ipsum 3",
  },
];

const IndexPage: React.FC<PageProps> = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [deleting, setDeleting] = useState<boolean>(false);

  const getDatas = () => {
    fetch("http://127.0.0.1:8000/api/books")
      .then((response) => response.json())
      .then((data) => setBooks(data.books))
      .catch((error) => console.error(error));
  };

  const deleteData = (bookId: number) => {
    setDeleting(true);
    fetch(`http://127.0.0.1:8000/api/books/${bookId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setDeleting(false);
        getDatas();
      })
      .catch((error) => {
        setDeleting(false);
        console.error(error);
      });
  };

  useEffect(() => {
    getDatas();
  }, []);

  return (
    <main className="page-styles">
      <h1>Books management</h1>
      <div>
        <p>Click on row to edit data</p>
      </div>
      <div className="button-add">
        <Button onClick={() => navigate("book-form")}>Create new book</Button>
      </div>
      <div>
        <Table
          data={books}
          onDelete={deleteData}
          onEdit={(bookId) => navigate(`book-form?bookId=${bookId}`)}
        />
      </div>
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Riko Logwirno | Test RUS FE</title>;
