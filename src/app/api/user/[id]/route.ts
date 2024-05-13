import { deleteUsers, getUserById, updateUsers } from "@/app/lib/data";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
    try {
        const id = req.url.split("user/")[1];
        const user = getUserById(id);
        if(!user){
            return NextResponse.json({message: "Error"}, {status: 404});
        }
        return NextResponse.json({message: "Ok", user}, {status: 200});
    }catch (err){
        return NextResponse.json({message: "Error", err}, {status: 500});

    }
    
}
export const PUT = async (req: Request) => {
    try{
        const {name, lastname, city, country} = await req.json();
        const id = req.url.split("user/")[1];
        updateUsers(id, name, lastname, city, country);
        return NextResponse.json({message: "Ok"}, {status: 200})
    }catch(err){
        return NextResponse.json({message: "Error", err}, {status: 500});

    }
}
export const DELETE = async (req: Request) => {
    try{
        const id = req.url.split("user/")[1];
        deleteUsers(id);
        return NextResponse.json({message: "Ok"}, {status: 200})
    }catch(err){
        return NextResponse.json({message: "Error", err}, {status: 500});

    }
}