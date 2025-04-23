import { render, screen } from "@testing-library/react";
import App from "./App";
import News from "./components/news/News";

jest.mock("./components/Navbar", () => () => <div>Navbar</div>);
jest.mock("./components/news/SearchNews", () => () => (
  <div>SearchNews Component</div>
));
jest.mock("./components/news/NewsDetailModal", () => () => (
  <div>NewsDetail Component</div>
));

const mockNews = jest.fn(() => <div>News Component</div>);
jest.mock("./components/news/News", () => () => mockNews());

describe("App Component", () => {
  beforeEach(() => {
    mockNews.mockClear();
  });

  test("renders Navbar component", () => {
    render(<App />);
    expect(screen.getByText("Navbar")).toBeInTheDocument();
  });

  jest.mock("./components/news/News", () => (props) => mockNews(props));

  test("passes correct props to News component", () => {
    render(
      <News
        apiKey={process.env.REACT_APP_NEWS_API}
        pageSize={12}
        country="us"
        category="general"
      />
    );
    jest.mock("./components/news/News", () => (props) => mockNews(props));
  });
});
