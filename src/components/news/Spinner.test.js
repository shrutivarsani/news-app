import { render, screen } from '@testing-library/react';
import Spinner from '../Spinner';

jest.mock('../../assets/loader.gif', () => 'mocked-loader.gif');

describe('Spinner Component', () => {
  test('renders img element with correct src and alt attributes', () => {
    render(<Spinner />);
    const imgElement = screen.getByAltText('Loading');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', 'mocked-loader.gif');
  });

  test('renders div with text-center class', () => {
    render(<Spinner />);
    const divElement = screen.getByAltText('Loading').parentElement;
    expect(divElement).toHaveClass('text-center');
  });
});