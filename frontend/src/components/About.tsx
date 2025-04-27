
function About()
{
    return (
        <div className="absolute z-10 bg-[url(./assets/backgroundmap2.jpg)] border-2 dark:border-[#ffca09] rounded-md w-3/10 h-5/10">
            <div className="flex-col justify-center w-full h-full bg-black/80 rounded-sm">
                <div className="flex justify-center items-center h-1/8 border-b-2 dark:border-[#ffca09] border-[#a48100]">
                    <h1 className="text-2xl dark:text-neutral-200 text-neutral-700 font-bold">About this Project</h1>
                </div>
            </div>
        </div>
    );
}

export default About;