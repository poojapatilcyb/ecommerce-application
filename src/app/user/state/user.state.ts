export interface User {
    id?: string,
    name: string,
    email: string,
}

export interface UserState {
    user: User[]
};

export const userInitialState: UserState = {
    user:[
        {id:'1', name: 'Pooja Patil', email: 'pooja.patil@cybae.com'},
        {id:'2', name: 'Dipesh Lokare', email: 'dipeshlokare@cybae.com'}
    ]
}