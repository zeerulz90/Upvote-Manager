import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

const unselectedStyles = {
  bgColor: '#F4F6F8',
  strokeColor: '#343A40',
}

const selectedStyles = {
  bgColor: '#E5E8FD',
  strokeColor: '#253CF2',
}

test('clicking upvote component should toggle selection state', async () => {
  // Render app component
  render(<App />);
  // Ensure 'Add New Upvote List' button is visible
  const addUpvoteListButton = screen.getByTestId('add-upvote-list-btn');
  expect(addUpvoteListButton).toBeVisible();
  // Mock up crypto randomUUID
  window['crypto'] = {
    randomUUID: jest.fn(() => '1234'),
  }
  // Click button to add an upvote list
  fireEvent.click(addUpvoteListButton);
  // Ensure no upvote is visible at this point (i.e. first upvote is not present)
  let firstUpvote = screen.queryByTestId('upvote-0');
  expect(firstUpvote).toBeNull();
  // Ensure add upvote button is visible
  const addUpvoteButton = await screen.findAllByTestId(/add-upvote-btn-/);
  expect(addUpvoteButton).toHaveLength(1);
  // Click button to add a single upvote to the list
  fireEvent.click(addUpvoteButton[0]);
  // Ensure upvote is now visible
  firstUpvote = screen.queryByTestId('upvote-0');
  expect(firstUpvote).not.toBeNull();
  // Check background color and arrow stroke color to ensure upvote is unselected
  expect(firstUpvote).toHaveStyle(`background-color: ${unselectedStyles.bgColor}`);
  let arrowSvg = screen.queryByTestId('upvote-svg-0');
  let strokeColor = await arrowSvg.getAttribute('stroke');
  expect(strokeColor).toEqual(unselectedStyles.strokeColor);
  // Click on the upvote to toggle to selection mode
  fireEvent.click(firstUpvote);
  // Check background color and arrow stroke color to ensure upvote is in selection mode
  firstUpvote = screen.queryByTestId('upvote-0');
  expect(firstUpvote).toHaveStyle(`background-color: ${selectedStyles.bgColor}`);
  arrowSvg = screen.queryByTestId('upvote-svg-0');
  strokeColor = await arrowSvg.getAttribute('stroke');
  expect(strokeColor).toEqual(selectedStyles.strokeColor);
  // Add another upvote and ensure second upvote is in selected state
  fireEvent.click(addUpvoteButton[0]);
  let secondUpvote = screen.queryByTestId('upvote-1');
  expect(secondUpvote).toHaveStyle(`background-color: ${selectedStyles.bgColor}`);
  let secondArrowSvg = screen.queryByTestId('upvote-svg-1');
  let secondStrokeColor = await secondArrowSvg.getAttribute('stroke');
  expect(secondStrokeColor).toEqual(selectedStyles.strokeColor);
  // Click second upvote and ensure second upvote is unselected now
  fireEvent.click(secondUpvote);
  secondUpvote = screen.queryByTestId('upvote-1');
  expect(secondUpvote).toHaveStyle(`background-color: ${unselectedStyles.bgColor}`);
  secondArrowSvg = screen.queryByTestId('upvote-svg-1');
  secondStrokeColor = await arrowSvg.getAttribute('stroke');
  expect(secondStrokeColor).toEqual(unselectedStyles.strokeColor);
  // Ensure first upvote is now in unselected state as well
  firstUpvote = screen.queryByTestId('upvote-0');
  expect(firstUpvote).toHaveStyle(`background-color: ${unselectedStyles.bgColor}`);
  arrowSvg = screen.queryByTestId('upvote-svg-0');
  strokeColor = await arrowSvg.getAttribute('stroke');
  expect(strokeColor).toEqual(unselectedStyles.strokeColor);
});
