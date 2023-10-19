import LoginPage from '../Pages/Login';
import BlogPage from '../Pages/blog';
import EditPage from '../Pages/edit';
import HomePage from '../Pages/home';
import IRoute from './../interfaces/route';

const authRoutes: IRoute[] = [
    {
        path: '/login',
        exact: true,
        auth: false,
        component: LoginPage,
        name: 'Login'
    },
    {
        path: '/register',
        exact: true,
        auth: false,
        component: LoginPage,
        name: 'Register'
    }
];
const blogRoutes: IRoute[] = [
    {
        path: '/edit',
        exact: true,
        auth: true,
        component: EditPage,
        name: 'Edit'
    },
    {
        path: '/edit/:blogID',
        exact: true,
        auth: true,
        component: EditPage,
        name: 'Edit'
    },
    {
        path: '/blog/:blogID',
        exact: true,
        auth: false,
        component: BlogPage,
        name: 'Blog'
    }
];
const mainRoutes: IRoute[] = [
    {
        path: '/',
        exact: true,
        auth: true,
        component: HomePage,
        name: 'Home'
    }
];
const routes: IRoute[] = [...authRoutes, ...blogRoutes, ...mainRoutes];
export default routes;
