describe('Shape', () => {
  it('renders a random shape', () => {
    const { container } = render(<Shape />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
