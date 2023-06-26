"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
    return (
        <div className="mt-16 prompt_layout">
            {data.map((post) => (
                <PromptCard
                    key={post._id}
                    post={post}
                    handleTagClick={handleTagClick}
                />
            ))}
        </div>
    );
};
const Feed = () => {
    const [searchText, setSearchText] = useState("");
    const [posts, setPosts] = useState([]);
    const [searchPosts, setSearchPosts] = useState([]);
    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
        const filteredPosts = posts.filter(
            (post) =>
                post.tag.includes(e.target.value) ||
                post.creator.username.includes(e.target.value) ||
                post.prompt.includes(e.target.value)
        );
        setSearchPosts(filteredPosts);
    };

    const handleTagClick = (tag) => {
        setSearchText(tag);
        handleSearchChange({ target: { value: tag } });
    };

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch("/api/prompt");
            const data = await response.json();

            setPosts(data);
        };

        fetchPosts();
    }, []);

    useEffect(() => {
        console.log("posts :", posts);
    }, [posts]);
    return (
        <section className="feed">
            <form className="relative w-full flex-center">
                <input
                    type="text"
                    placeholder="Search for a tag or a username"
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className="search_input peer"
                />
            </form>
            <PromptCardList
                data={searchText === "" ? posts : searchPosts}
                handleTagClick={handleTagClick}
            />
        </section>
    );
};

export default Feed;
