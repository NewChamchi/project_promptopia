"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";
const MyProfile = ({ params }) => {
    const { data: session } = useSession();
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    // const handleEdit = (post) => {
    //     console.log(post);
    //     router.push(`/update-prompt?id=${post._id}`);
    // };

    // const handleDelete = async (post) => {
    //     const hasConfirmed = confirm(
    //         "Are you sure you want to delete this prompt?"
    //     );

    //     if (hasConfirmed) {
    //         try {
    //             await fetch(`/api/prompt/${post._id.toString()}`, {
    //                 method: "DELETE",
    //             });
    //             const filteredPosts = posts.filter((p) => p._id !== post._id);
    //             setPosts(filteredPosts);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    // };

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${params.id}/posts`);
            const data = await response.json();

            setPosts(data);
        };
        if (params.id === session?.user.id) {
            router.push("/profile");
        } else {
            fetchPosts();
        }
    }, [session?.user.id]);
    return (
        <Profile
            name={posts[0]?.creator.username}
            desc="Welcome to your personalized profile page"
            data={posts}
            // handleEdit={handleEdit}
            // handleDelete={handleDelete}
        />
    );
};

export default MyProfile;