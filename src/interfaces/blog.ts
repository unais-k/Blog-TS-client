import IUser from './user';

export default interface IBlog {
    _id: string;
    title: string;
    author?: string | IUser | any;
    content: string;
    headline: string;
    picture?: string;
    createdAt: string;
    updatedAt: string;
}
