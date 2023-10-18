type User = {
    userId?: string;
    fullName: string;
    email: string;
    password: Blob | string;
    imageUrl: string;
    [key: string]: Blob | string | undefined;
}

type Post = {
    postId: number;
    userId: number;
    postImgUrl: string;
    content: string;
    timeStamps: string;
}
type CommentType = {
    commentId: number;
    postId: number;
    userId: number;
    content: string;
}
type Like = {
    postId: number;
    userId: number;
}
type FollowerType= {
    followerId: number,
    followingId: Number
}

// type Session = {
//     user: UserSession
// }