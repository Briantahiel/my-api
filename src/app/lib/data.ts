type User = {
    id: string,
    name: string,
    lastname: string,
    city: string,
    country: string,
};
let users: User[] = [];
export const getUsers = () => users;

export const addUsers = (user: User) => {
    users.push(user);
}

export const deleteUsers = (id: string) => {
    users = users.filter((user) => user.id !== id);
}
export const updateUsers = (id: string, name: string, lastname: string, city: string, country: string) => {
    const user = users.find((user) => user.id === id);
    if(user){
        user.name = name;
        user.lastname = lastname;
        user.city = city;
        user.country = country;
    }else {
        throw new Error("No user found");
    }
}

export const getUserById = (id: string) => {
    return users.find((user) => user.id === id);
}


