import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import NewsItem from "./NewsItem";
import "@testing-library/jest-dom";
import defaultImage from "../../assets/dumy.png";

// Mock the modal component to prevent actual rendering of bootstrap modal
jest.mock("./NewsDetailModal", () => ({ show, onHide, newsData }) => (
  <div data-testid="mock-modal">
    {show && (
      <div>
        <h1>{newsData?.title}</h1>
        <button onClick={onHide}>Close</button>
      </div>
    )}
  </div>
));

const props = {
  title: "Test Title",
  description: "Test description",
  imageUrl: "https://example.com/image.jpg",
  newsUrl: "https://example.com/article",
  author: "Test Author",
  date: "2024-01-01T12:00:00Z",
  source: "BBC",
};

describe("NewsItem Component", () => {
  test("renders title, description, author, date, and source", () => {
    render(<NewsItem {...props} />);

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test description...")).toBeInTheDocument();
    expect(screen.getByText(/By Test Author on/i)).toBeInTheDocument();
    expect(screen.getByText("BBC")).toBeInTheDocument();
  });

  test("renders image with correct src and alt", () => {
    render(<NewsItem {...props} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", props.imageUrl);
    expect(img).toHaveAttribute("alt", props.title);
  });

  test("renders default image if imageUrl is missing", () => {
    render(<NewsItem {...{ ...props, imageUrl: null }} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", defaultImage);
  });

  test("opens modal when title is clicked", () => {
    render(<NewsItem {...props} />);
    fireEvent.click(screen.getByRole("heading", { name: "Test Title" }));
  });

  test('closes modal when Close button is clicked', async () => {
    render(<NewsItem {...props} />);
    fireEvent.click(screen.getByRole("heading", { name: "Test Title" }));
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
  });
});
