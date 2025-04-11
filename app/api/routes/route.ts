import { NextResponse, NextRequest } from "next/server";
import { Brain, User } from "../../db/index";
import { connectDB } from "../../db/index";


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
interface SignupPayload {
    name: string;
    password: string;
  }


async function handleSignup({ name, password }: SignupPayload) {
    if (!name || !password) {
        return NextResponse.json({ message: "Username and password can't be empty" }, { status: 400 });
    }
    const existingUser = await User.findOne({ name });
    if (existingUser) {
        return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }
     await User.create({ name, password });
    return NextResponse.json({ message: "User created successfully" }, { status: 200 });
}
interface AddBrainPayload {
    title: string;
    description: string;
    link: string;
    type: "youtube" | "twitter";
    user: string;
  }
async function handleAddBrain({ title, description, link,type,user}:AddBrainPayload) {
    if (!title || !description || !link ) {
        return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }
     await Brain.create({ title, description, link, type,user });
    return NextResponse.json({ message: "Brain created successfully" }, { status: 200 });
}
interface DeleteBrainPayload {
    id: string;
  }
async function handleDeleteBrain({ id }: DeleteBrainPayload) {
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
interface GetBrainPayload {
    userId: string | null;
  }

async function handleGetBrain({ userId }: GetBrainPayload) {
    if (!userId) {
        return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    try {
        // Query the Brain collection directly using the user reference
        const brains = await Brain.find({ user: userId });
        if (!brains || brains.length === 0) {
            return NextResponse.json({ message: "No brains found for this user" }, { status: 404 });
        }

        return NextResponse.json({ brains }, { status: 200 });
    } catch (error) {
        console.error("handleGetBrain error:", error);
        return NextResponse.json({ error: "Failed to retrieve brains" }, { status: 500 });
    }
}