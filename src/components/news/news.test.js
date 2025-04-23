import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import News from "./News";

jest.mock("./NewsItem", () => ({ title }) => <div>{title}</div>);
jest.mock("../Spinner", () => () => <div>Loading...</div>);

const sampleData = {
  status: "ok",
  totalResults: 2,
  articles: [
    {
      title: "Sample News 1",
      description: "Description",
      urlToImage: "img.jpg",
      url: "https://example.com",
      author: "Author",
      publishedAt: "2023-10-10T10:00:00Z",
      source: { name: "Test Source" },
    },
  ],
};

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(sampleData),
    })
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("News component", () => {
  test("renders loading spinner initially", async () => {
    render(<News apiKey="test-key" category="general" />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders fetched news articles", async () => {
    render(<News apiKey="test-key" />);

    await waitFor(() =>
      expect(
        screen.getByText(sampleData.articles[0].title.slice(0, 45))
      ).toBeInTheDocument()
    );
  });

  test("sets document title based on category", () => {
    render(<News apiKey="test-key" category="technology" />);
    expect(document.title).toBe("Technology - News App");
  });
  
  test("fetch is called with correct URL", async () => {
    render(<News apiKey="test-key" />);
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining(
          "https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=test-key"
        )
      );
    });
  });
});
