export interface User {
    name?: string,
    email?: string,
}
export interface UserState {
    user: User[]
};

export const userInitialState: UserState = {
    user:[
        {name: 'Pooja Patil', email: 'pooja.patil@cybae.com'},
        {name: 'Dipesh Lokare', email: 'dipeshlokare@cybae.com'}
    ]
}