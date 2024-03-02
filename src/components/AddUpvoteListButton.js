import '../styles/AddUpvoteListButton.css'

import { useUpvoteListAdd } from '../context/UpvoteListsContext';

export default function AddUpvoteListButton() {
    const btnLabel = 'Add New Upvote List';
    const addUpvoteList = useUpvoteListAdd();
    return (
        <button className="upvoteListAddBtn" onClick={addUpvoteList} data-testid="add-upvote-list-btn">{btnLabel}</button>
    );
}