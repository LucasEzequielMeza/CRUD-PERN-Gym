export const publicRoutes = [
    {
        name: 'Registro',
        path: '/register',
    },
    {
        name: 'Iniciar Sesión',
        path: '/login',
    },
]

export const privateRoutes = [
    {
        name: 'Lista de clientes',
        path: '/clients',
        role: ['admin']
    },
    {
        name: 'Clases',
        path: '/clases',
        role: ['admin', 'client']
    },
    {
        name: 'Crear Clase',
        path: '/clases/nueva',
        role: ['admin']
    },
    {
        name: 'Ejercicios',
        path: '/ejercicios',
        role: ['admin', 'client']
    },
    {
        name: 'Agregar Ejercicios',
        path: '/ejercicios/nuevo',
        role: ['admin']
    },
    {
        name: 'Mis Rutinas',
        path: '/rutinas',
        role: ['client']
    },
    {
        name: 'Crear Rutina',
        path: '/rutinas/nueva',
        role: ['client']
    },
    {
        name: 'Perfil',
        path: '/profile',
        role: ['admin', 'client']
    },
];
