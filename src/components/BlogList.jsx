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
            <a href={post.url} class="w-80 min-w-[20rem] rounded-md border-2 border-black bg-[color:var(--color-bg)] ">
                <div class="">
                    <img class="object-contain h-52 mx-auto " src={post.frontmatter.image} alt="Tool logo" />
                </div>
                <h3 class="pt-2 text-center font-extrabold text-lg ">{post.frontmatter.title}</h3>
                <p class="text-center font-medium text-lg">{post.frontmatter.pubDate}</p>
                <p class="p-2 min-h-[5rem] text-center font-medium text-lg">{post.frontmatter.description}</p>
                <div class="flex flex-row flex-wrap gap-2 px-2 py-1 font-bold ">
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
        <div class="w-full flex px-4 max-w-[100rem] mx-auto">
            <div class="basis-1/4 flex flex-col p-4 gap-8 ">
                <h2 class="text-center text-3xl font-extrabold">Blog Posts</h2>
                <div class="flex flex-col p-2 font-bold gap-2 ">
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
            <div class="w-full flex gap-6 p-6 overflow-x-scroll scrollbar bg-[color:var(--color-content)]">
                {showBlogs().map(blog => PostPreview(blog))}
            </div>
        </div>
    )
}