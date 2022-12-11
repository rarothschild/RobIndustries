import { createSignal } from "solid-js";
import { PostPreview } from "./PostPreview.astro"
import { Image } from '@astrojs/image/components';


export default function BlogList(props) {
    const [blogs,setBlogs] = createSignal(props.blogs)
    const [showBlogs,setShowBlogs] = createSignal(props.blogs)
    const res = blogs().map(blog => blog.frontmatter.categories)
    const uniqueCategories = [... new Set(res.flat(1))]
    
    function PostPreview(post) {
        return (
            <div class="shadow-md bg-slate-200 border border-black">
                
                <p>{post.frontmatter.title}</p>
            </div>
        )
    }

    return(
        <div class="">
            <div class="p-4"><h2 class="text-3xl font-extrabold text-[#d3cece]">Blog Posts</h2></div>
            <div class="flex flex-row p-4">
                <div class="w-48 mr-8 font-bold bg-slate-500 border-2 border-black">
                    <div class="p-1 text-center border-b border-black"><h3>Sort By:</h3></div>
                    <div class="flex flex-row flex-wrap gap-2 p-2">
                        {uniqueCategories?.map(cat => 
                            <button class="rounded-md p-2 bg-red-500 border-2 border-black">{cat}</button>
                        )}
                    </div>
                </div>
                <div class="flex flex-row gap-4">
                    {blogs().map(blog => PostPreview(blog))}
                </div>
                <Image src="HouseHold.jpg" alt="" format="jpeg" height={200} width={200} /> 
            </div>
        </div>
    )
}