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

// type Session = {
//     user: UserSession
// }