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
            <a href={post.url} class="flex flex-col w-72 mb-2 shadow-[-10px_10px_0px_0px_rgba(0,0,0,0.3)] bg-slate-200  border-2 border-black text-black">
                <div class="bg-slate-800 border-b border-black">
                    <img class="object-contain h-52 w-72 mx-auto" src={post.frontmatter.image} alt="Tool logo" />
                </div>
                <h3 class="p-2 text-center font-extrabold text-lg bg-slate-400 border-b border-black">{post.frontmatter.title}</h3>
                <p class="pt-1 text-center font-medium text-lg">{post.frontmatter.pubDate}</p>
                <p class="p-2 h-full text-center font-medium text-lg">{post.frontmatter.description}</p>
                <div class="flex flex-row flex-wrap gap-2 px-2 py-1 font-bold ">
                    {post.frontmatter.categories.map(cat => 
                        <div class="rounded-md px-2 py-1 border-2 border-black" style={{"background-color": tagCoor[cat]}}>{cat}</div>)}
                </div>
            </a>
        )
    }

    function Tag(category) {
        return(
            <button class="text-black rounded-md px-2 py-1 border-2 border-black" style={{"background-color": tagCoor[category]}} onClick={() => setTagSelect(category)}>{category}</button>
        )
    }

    return(
        <div class="flex flex-col md:flex-row overflow-hidden">
            <div class="mt-8 flex flex-col p-4 gap-8 ">
                <h2 class="text-center text-3xl font-extrabold">Blog Posts</h2>
                <div class="flex flex-col w-64 p-2 font-bold gap-2 ">
                    <div class="justify-between text-center">
                        <button class="px-2 rounded-md bg-red-300 border-2 border-black text-black" onClick={() => setTagSelect("All")}>Sort By Date</button>
                    </div>
                    <div class="flex flex-row place-content-center">
                        <p class=" self-center">Or Tags:</p>
                    </div>
                    <div class="flex flex-row flex-wrap gap-2 ">
                        {uniqueTags.map(category => Tag(category))}
                    </div>
                </div>
            </div>
            <div class="flex flex-row gap-6 ">
                {showBlogs().map(blog => PostPreview(blog))}
            </div>
        </div>
    )
}