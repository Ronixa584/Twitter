import type { NextPage } from "next";
import TwitterLayout from "./Componenet/Layout/TwitterLayout";

const UserProfilePage: NextPage = () => {
    return (
        <div>
            <TwitterLayout>
                <h1>Profile Page</h1>
            </TwitterLayout>
        </div>
    )
}

export default UserProfilePage