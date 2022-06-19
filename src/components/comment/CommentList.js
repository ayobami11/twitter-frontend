import CommentItem from './CommentItem';

const CommentList = ({ comments }) => {
    return (
        <ul>
            {comments.map(comment => (
                <CommentItem key={comment._id} {...comment} />
            ))}
        </ul>
    );
};

export default CommentList;
