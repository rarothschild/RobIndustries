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
            <a href={post.url} class="w-full p-2 md:flex items-center rounded-md border-2 border-black bg-[color:var(--color-section)] ">
                <div class="md:w-52">
                    <h3 class="text-center font-extrabold text-lg ">{post.frontmatter.title}</h3>
                    <p class="text-center font-medium text-lg">{post.frontmatter.pubDate}</p>
                </div>
                <p class="grow max-w-md p-2 text-center font-medium text-lg">{post.frontmatter.description}</p>
                <div class="ml-auto pr-2 justify-end flex flex-wrap gap-2 p-1 font-bold ">
                    {post.frontmatter.categories.map(cat => 
                        <div class="rounded-md px-2 py-1 border-2 border-black text-black" style={{"background-color": tagCoor[cat]}}>{cat}</div>)}
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
        <div class="w-full flex max-w-[94rem] h-96 flex-col lg:flex-row bg-[color:var(--color-section)] border-2 border-[color:var(--color-border)]">
            <div class="flex flex-col px-2 py-4 gap-2">
                <h2 class="text-center text-3xl font-extrabold">Blog Posts</h2>
                <div class="flex flex-col p-2 font-bold gap-2 ">
                    <div class="justify-between text-center">
                        <button class="px-2 rounded-md bg-red-300 border-2 border-black text-black" onClick={() => setTagSelect("All")}>Sort By Date</button>
                    </div>
                    <div class="flex flex-row place-content-center">
                        <p class=" self-center">Or Tags:</p>
                    </div>
                    <div class="flex flex-row flex-wrap gap-2 max-w-2xl ">
                        {uniqueTags.map(category => Tag(category))}
                    </div>
                </div>
            </div>
            <div class="w-full bg-[color:var(--color-content)] overflow-y-scroll scrollbar">
                <div class="flex flex-row flex-wrap gap-4 p-6 justify-center ">
                    {showBlogs().map(blog => PostPreview(blog))}
                </div>
            </div>
        </div>
    )
}