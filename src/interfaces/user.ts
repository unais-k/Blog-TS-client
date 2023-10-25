export default interface IUser {
    _id: string | any;
    uid: string | any;
    name: string | any;
}

export const DEFAULT_USER: IUser = {
    _id: '',
    uid: '',
    name: ''
};

export const DEFAULT_FIRE_TOKEN = '';
