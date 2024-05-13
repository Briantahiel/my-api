import { addUsers, getUsers } from "@/app/lib/data";
import { NextResponse } from "next/server"

export const GET = async (req: Request, res: Response) => {
    try {
        const users = getUsers();
        return NextResponse.json({message: "Ok", users}, {status: 200});
    } catch(err){
        return NextResponse.json(
            {message: "Error", err},
        {
            status: 500,
        });
    }
};

export const POST = async (req: Request, res: Response) => {
    const {name, lastname, city, country} = await req.json();
    try {
        const user = {id: Date.now().toString(), name, lastname, city, country};
        addUsers(user);
        return NextResponse.json({message: "Ok", user}, {status: 201});
    }catch (err){
        return NextResponse.json(
            {message: "Error", err},{
                status: 500,
            }
        );
    }
};