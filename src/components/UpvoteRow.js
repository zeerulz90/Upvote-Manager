import '../styles/UpvoteRow.css'

import RemoveUpvoteList from './RemoveUpvoteList';
import UpvoteList from './UpvoteList';
import AddUpvote from './AddUpvote';
import RemoveUpvote from './RemoveUpvote';

export default function UpvoteRow({ list }) {
    return (
        <div className="upvoteRow" data-testid={"upvote-row-" + list.id}>
          <RemoveUpvoteList list={list} />
          <UpvoteList list={list} />
          <AddUpvote list={list} />
          {list.upvoteCount > 0 && <RemoveUpvote list={list} />}
        </div>
    );
} 