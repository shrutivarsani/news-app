import { render, screen } from "@testing-library/react";
import NewsDetailModal from "./news/NewsDetailModal";
import defaultImage from '././../assets/dumy.png'
import { fireEvent } from "@testing-library/react";


const mockNewsData = {
  title: 'Test Title',
  description: 'This is a test description.',
  imageUrl: 'https://example.com/image.jpg',
  newsUrl: 'https://example.com/article',
  author: 'Test Author',
  date: '2024-01-01T12:00:00Z'
};

describe('NewsDetailModal', () => {
  test('renders correctly with news data', () => {
    render(<NewsDetailModal show={true} onHide={jest.fn()} newsData={mockNewsData} />);
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('This is a test description.')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockNewsData.imageUrl);
    expect(screen.getByText(/By Test Author on/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Read Full Article/i })).toHaveAttribute('href', mockNewsData.newsUrl);
    fireEvent.click(screen.getAllByRole('button', { name: /Close/i })[1]);

  });

  test('shows default image on image error', () => {
    render(<NewsDetailModal show={true} onHide={jest.fn()} newsData={{ ...mockNewsData, imageUrl: 'bad-url.jpg' }} />);
    
    const image = screen.getByRole('img');
    fireEvent.error(image);

    expect(image).toHaveAttribute('src', defaultImage);
    expect(image).toHaveAttribute('alt', 'dummy image');
  });

  test('renders fallback text for missing author and image', () => {
    const incompleteData = {
      ...mockNewsData,
      author: null,
      imageUrl: null
    };

    render(<NewsDetailModal show={true} onHide={jest.fn()} newsData={incompleteData} />);
    
    expect(screen.getByText(/By Unknown on/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', defaultImage);
  });
});
