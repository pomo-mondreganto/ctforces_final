import Index from '@/views/Index';
import Login from '@/views/Login';
import Register from '@/views/Register';
import TaskList from '@/views/Tasks/List';
import TaskIndex from '@/views/Tasks/Index';

const routes = [
    {
        path: '/',
        name: 'index',
        component: Index,
    },
    {
        path: '/login/',
        name: 'login',
        component: Login,
    },
    {
        path: '/register/',
        name: 'register',
        component: Register,
    },
    {
        path: '/tasks/',
        name: 'task_list',
        component: TaskList,
    },
    {
        path: '/tasks/:id',
        name: 'task_index',
        component: TaskIndex,
    },
];

export default routes;
