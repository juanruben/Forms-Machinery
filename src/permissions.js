export default [
    {
        role: 1,
        routes: [
            '/admin/dashboard',
            '/admin/clientes',
            '/admin/usuarios',
            '/admin/maquinas',
            '/admin/formularios',
            '/admin/formularios/:id',
            '/admin/formularios/secciones/:id',
        ],
    },
    {
        role: 2,
        routes: [
            '/entrada',
            '/salida',
        ],
    },
];
