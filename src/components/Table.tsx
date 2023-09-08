import React, { useEffect, useState } from "react";
import "./Table.scss";

interface Book {
  id: number;
  description: string;
  title: string;
  authors: string;
  published_year: number;
  tags: string;
}

interface TableProps {
  data: Book[];
  onDelete?: (id: number) => any;
  onEdit?: (id: number) => any;
}

const Table: React.FC<TableProps> = ({ data, onDelete, onEdit }) => {
  const [filteredData, setFilteredData] = useState<Book[]>(data);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  // Function to handle column sorting
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      // Reverse the sort direction
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Set the new column as the sort column
      setSortColumn(column);
      setSortDirection("asc");
    }

    // Sort the data based on the selected column and direction
    // const sortedData = [...filteredData].sort((a, b) => {
    //   if (sortDirection === 'asc') {
    //     return a[column] > b[column] ? 1 : -1;
    //   } else {
    //     return a[column] < b[column] ? 1 : -1;
    //   }
    // });

    // setFilteredData(sortedData);
  };

  // Function to handle filtering
  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = data.filter((item) => {
      return Object.values(item).join(" ").toLowerCase().includes(searchTerm);
    });

    setFilteredData(filtered);
  };

  return (
    <div className="table-container">
      {/* <input
        type="text"
        placeholder="Filter..."
        onChange={handleFilter}
        className="filter-input"
      /> */}
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("title")}>
              {/* {sortColumn === "title" && (sortDirection === "asc" ? "▲" : "▼")} */}
              {"  "}Title
            </th>
            <th onClick={() => handleSort("description")}>
              {/* {sortColumn === "description" &&
                (sortDirection === "asc" ? "▲" : "▼")} */}
              {"  "}Description
            </th>
            <th onClick={() => handleSort("authors")}>
              {/* {sortColumn === "authors" &&
                (sortDirection === "asc" ? "▲" : "▼")} */}
              {"  "}Authors
            </th>
            <th onClick={() => handleSort("published_year")}>
              {/* {sortColumn === "published_year" &&
                (sortDirection === "asc" ? "▲" : "▼")} */}
              {"  "}Published Year
            </th>
            <th onClick={() => handleSort("tags")}>
              {/* {sortColumn === "tags" && (sortDirection === "asc" ? "▲" : "▼")} */}
              {"  "}Tags
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index} onClick={() => onEdit?.(item.id)}>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.authors}</td>
              <td>{item.published_year}</td>
              <td>{item.tags}</td>
              <td
                className="delete"
                onClick={(ev) => {
                  ev.stopPropagation();
                  onDelete?.(item.id);
                }}
              >
                Delete
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
