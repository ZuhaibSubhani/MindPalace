import { NextResponse, NextRequest } from "next/server";
import { Brain, User } from "../../db/index";
import { connectDB } from "../../db/index";

console.log("Hello from the API route");
connectDB();

export async function POST(req: NextRequest) {
    try {
        const { action, ...data } = await req.json();
        console.log("POST action:", action, "data:", data);
        switch (action) {
            case "signup":
                return await handleSignup(data);
            case "addBrain":
                return await handleAddBrain(data);
            case "deleteBrain":
                return await handleDeleteBrain(data);
            default:
                return NextResponse.json({ error: "Invalid action" }, { status: 400 });
        }
    } catch (error) {
        console.error("POST error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

async function handleSignup({ name, password }: any) {
    if (!name || !password) {
        return NextResponse.json({ message: "Username and password can't be empty" }, { status: 400 });
    }
    const existingUser = await User.findOne({ name });
    if (existingUser) {
        return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }
    const user = await User.create({ name, password });
    return NextResponse.json({ message: "User created successfully" }, { status: 200 });
}

async function handleAddBrain({ title, description, link }: any) {
    if (!title || !description || !link) {
        return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }
    const brain = await Brain.create({ title, description, link });
    return NextResponse.json({ message: "Brain created successfully" }, { status: 200 });
}

async function handleDeleteBrain({ id }: any) {
    if (!id) {
        return NextResponse.json({ message: "Brain ID is required" }, { status: 400 });
    }
    await Brain.findByIdAndDelete(id);
    return NextResponse.json({ message: "Brain deleted successfully" }, { status: 200 });
}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const action = searchParams.get("action");
        const userId = searchParams.get("userId");
        console.log("GET action:", action, "userId:", userId);

        switch (action) {
            case "getBrain":
                return await handleGetBrain({ userId });
            default:
                return NextResponse.json({ error: "Invalid action" }, { status: 400 });
        }
    } catch (error) {
        console.error("GET error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

async function handleGetBrain({ userId }: any) {
    if (!userId) {
        return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    try {
        const user = await User.findById(userId).populate("brains");
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ brains: user.brains }, { status: 200 });
    } catch (error) {
        console.error("handleGetBrain error:", error);
        return NextResponse.json({ error: "Failed to retrieve brains" }, { status: 500 });
    }
}