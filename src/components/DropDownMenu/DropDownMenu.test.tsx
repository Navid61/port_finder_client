
import { render, screen } from '@testing-library/react';


test('simple test', () => {
    render(<div>Hello</div>);
    expect(screen.getByText('Hello')).toBeInTheDocument();
});