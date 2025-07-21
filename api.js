import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT;



let verifiedUsers = {};


export async function signup(username, password) {
    try {
    const response = await fetch(`http://localhost:${port}/api/auth/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }
}



export async function verify(username, password) {
    try {
        const response = await fetch(`http://localhost:${port}/api/auth/verify`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        
        console.log( data);
        
        if (data.message === "verified") {
            verifiedUsers[username] = true
            console.log("User verified and added:", username);
        } else {
            console.log("User not verified:", data.message);
        }
        
        return data;


    } catch (error) {
        console.error(error);
    }
}

// פונקציה אסינכרונית שתריץ את הבדיקה
async function runTest() {
    await verify("eytan", "a123456");
    console.log(verifiedUsers);
}

runTest();


