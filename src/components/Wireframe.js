import '../styles/Wireframe.css'

import { useUpvote } from '../context/UpvoteListsContext';

import UpvoteRow from './UpvoteRow';

export default function Wireframe() {
    const upvoteLists = useUpvote();
    return ( 
        upvoteLists?.length > 0 && <div className="wireframe" data-testid="wireframe">
            {upvoteLists.map(upvoteList => {
                return <UpvoteRow list={upvoteList} key={upvoteList.id} />;
            })}
        </div>
    );
}