import '../styles/UpvoteList.css'
import Upvote from "./Upvote";

export default function UpvoteList({ list }) {
    return (
        <div className="upvoteList" data-testid={"upvote-list-" + list.id}>
            {list.upvoteCount > 0 && Array.from(Array(list.upvoteCount), (e, i) => {
                return <Upvote list={list} upvoteIndex={i} key={i} />
            })}
        </div>
    );
}