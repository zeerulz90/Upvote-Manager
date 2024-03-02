import '../styles/RemoveUpvote.css'

import { useUpvoteRemove } from '../context/UpvoteListsContext';

export default function RemoveUpvote({ list }) {
    const removeUpvote = useUpvoteRemove();
    return (
        <div className="upvoteRemove" onClick={() => removeUpvote(list.id)} data-testid={"remove-upvote-btn-" + list.id}>
            <svg viewBox="0 0 24 24" fill="currentColor" height="24" width="24">
                <path d="M17 11a1 1 0 010 2H7a1 1 0 010-2h10z" />
            </svg>
        </div>
    );
} 