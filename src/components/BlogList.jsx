import { createSignal, createEffect } from "solid-js";

export default function BlogList(props) {
    const [blogs,setBlogs] = createSignal(props.blogs)
    const [showBlogs,setShowBlogs] = createSignal(blogs())
    const [tagSelect,setTagSelect] = createSignal("All")
    const blogTags = blogs().map(blog => blog.frontmatter.categories)
    const uniqueTags = [... new Set(blogTags.flat(1))]
    const tagColors = [
        "#d3c1ad",
        "#ae83c7",
        "#96d8e4",
        "#d47c7c",
        "#d18b49",
        "#6dad7b",
        "#6dad7b",
    ]

    let tagCoor = []
    for (let i = 0; i < uniqueTags.length; i++) {
        tagCoor[uniqueTags[i]] = tagColors[i]
    }
    
    createEffect(() => {
        if (tagSelect()==="All") {
            setShowBlogs(blogs())
        } else {
            let tmp = blogTags.map(tagSet => tagSet.includes(tagSelect()))
            let indices = tmp.reduce((out, bool, index) => bool ? out.concat(index) : out, [])
            setShowBlogs(indices.map(i=>blogs()[i]))
        }
      });
    
    function PostPreview(post) {
        return (
            <div class="flex flex-col w-72 shadow-lg bg-[#e9e4de]  border-2 border-black">
                <div class="bg-slate-800 border-b border-black">
                    <img class="object-contain h-52 w-72 mx-auto" src={post.frontmatter.image} alt="Tool logo" />
                </div>
                <h3 class="p-2 text-center font-extrabold text-lg bg-slate-400 border-b border-black">{post.frontmatter.title}</h3>
                <p class="pt-1 text-center font-medium text-lg">{post.frontmatter.pubDate}</p>
                <p class="p-2 h-full text-center font-medium text-lg">{post.frontmatter.description}</p>
                <div class="flex flex-row flex-wrap gap-2 p-2 font-bold ">
                    {post.frontmatter.categories.map(cat => 
                        <div class="rounded-md p-2 border-2 border-black" style={{"background-color": tagCoor[cat]}}>{cat}</div>)}
                </div>
            </div>
        )
    }

    function Tag(category) {
        return(
            <button class="rounded-md p-2 border-2 border-black" style={{"background-color": tagCoor[category]}} onClick={() => setTagSelect(category)}>{category}</button>
        )
    }

    return(
        <div class="">
            <div class="flex flex-row p-4 bg-[#353038] "><h2 class="basis-1/2 text-center text-3xl font-extrabold text-[#d3cece]">Blog Posts</h2></div>
            <div class="flex flex-row p-4">
                <div class="w-56 mr-8 font-bold  bg-slate-500 border-2 border-black">
                    <div class="p-1 px-3 justify-between text-center bg-[#d3bc8a] border-b border-black">
                        <h3>Sort By:</h3>
                    </div>
                    <div class="flex flex-row place-content-center p-1 px-3 gap-2 bg-gray-300">
                        <button class="px-2 rounded-md bg-red-300 border-2 border-black" onClick={() => setTagSelect("All")}>Date</button>
                        <p class=" self-center">Or Tags:</p>
                    </div>
                    <div class="flex flex-row flex-wrap gap-2 p-2">
                        {uniqueTags.map(category => Tag(category))}
                    </div>
                </div>
                <div class="flex flex-row gap-4">
                    {showBlogs().map(blog => PostPreview(blog))}
                </div>
            </div>
        </div>
    )
}