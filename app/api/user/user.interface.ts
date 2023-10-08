interface UserInterface {
    userId?: string;
    fullName: string;
    email: string;
    password: Blob | string;
    imageUrl: string;
    type: string;
    [key: string]: Blob | string | undefined;
}
export default UserInterface;