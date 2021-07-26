// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import Hint from './Badge';
//
// describe('Test <Badge/> component', () => {
//   it('should render <Badge /> component with text "Badge" and badgeContent "9"', () => {
//     const { container } = render(
//       <Hint badgeContent='9'>
//         <span className='badge-test-9'>Badge</span>
//       </Hint>
//     );
//
//     const badgeComponent = container.getElementsByClassName('rf-badge').item(0);
//     const badgeContent = container.getElementsByClassName('badge-test-9').item(0);
//
//     expect(badgeComponent?.textContent).toBe('9');
//     expect(badgeContent?.textContent).toBe('Badge');
//   });
//
//   it('should render <Badge /> component with badgeContent "99+"', () => {
//     render(
//       <Hint badgeContent='999' max={99}>
//         Badge
//       </Hint>
//     );
//
//     const t = screen.getByText('99+');
//     expect(t).toBeInTheDocument();
//   });
//
//   it('should be empty and have class "rf-badge--dot"', () => {
//     const badge = <Hint>Badge</Hint>;
//     const { container } = render(badge);
//     const item = container.getElementsByClassName('rf-badge')[0];
//     expect(item).toHaveClass('rf-badge--dot');
//     expect(item?.textContent).toHaveLength(0);
//   });
//
//   it('should be blue', () => {
//     const badge = <Hint variant='blue'>Badge</Hint>;
//     const { container } = render(badge);
//     expect(container.getElementsByClassName('rf-badge--blue')).toHaveLength(1);
//   });
//
//   it('should be lightBlue', () => {
//     const { container } = render(<Hint variant='lightBlue'> Badge </Hint>);
//     expect(container.getElementsByClassName('rf-badge--lightBlue')).toHaveLength(1);
//   });
//
//   it('should be turquoise', () => {
//     const { container } = render(<Hint variant='turquoise'> Badge </Hint>);
//     expect(container.getElementsByClassName('rf-badge--turquoise')).toHaveLength(1);
//   });
//
//   it('should be green', () => {
//     const { container } = render(<Hint variant='green'> Badge </Hint>);
//     expect(container.getElementsByClassName('rf-badge--green')).toHaveLength(1);
//   });
//
//   it('should be yellow', () => {
//     const { container } = render(<Hint variant='yellow'> Badge </Hint>);
//     expect(container.getElementsByClassName('rf-badge--yellow')).toHaveLength(1);
//   });
//
//   it('should be red', () => {
//     const { container } = render(<Hint variant='red'> Badge </Hint>);
//     expect(container.getElementsByClassName('rf-badge--red')).toHaveLength(1);
//   });
//
//   it('should be magenta', () => {
//     const { container } = render(<Hint variant='magenta'> Badge </Hint>);
//     expect(container.getElementsByClassName('rf-badge--magenta')).toHaveLength(1);
//   });
//
//   it('should be purple', () => {
//     const { container } = render(<Hint variant='purple'> Badge </Hint>);
//     expect(container.getElementsByClassName('rf-badge--purple')).toHaveLength(1);
//   });
//
//   it('should be violet', () => {
//     const { container } = render(<Hint variant='violet'> Badge </Hint>);
//     expect(container.getElementsByClassName('rf-badge--violet')).toHaveLength(1);
//   });
// });
