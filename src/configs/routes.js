import PostsList from '../pages/ListOfPosts';
import UsersList from '../pages/ViewPost';
import PageNotFound from '../pages/PageNotFound';
import { APP_ROUTES } from './constants';

const routes = [
    {
        path: APP_ROUTES.LIST_OF_POSTS,
        component: PostsList,
        isExact: true
    }, {
        path: APP_ROUTES.VIEW_POST,
        component: UsersList,
        isExact: true
    },
    {
        component: PageNotFound
    }
];

export default routes;
