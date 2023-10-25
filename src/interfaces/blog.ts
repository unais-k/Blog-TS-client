import IUser from './user';

export default interface IBlog {
    _id: string;
    title?: string | any;
    author?: string | IUser | any;
    content?: string | any;
    headline?: string | any;
    picture?: string | any;
    createdAt?: string | any;
    updatedAt?: string | any;
}
