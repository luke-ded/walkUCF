interface ChildProps 
{
    toggleAbout: (about:any) => void;
}

const About: React.FC<ChildProps> = ({toggleAbout}) =>
{
    function close()
    {
        toggleAbout(false);
    }

    return (
        <div className="absolute z-12 top-1/14 left-0 w-full max-w-full h-13/14 flex items-center justify-center bg-black/50">
            <div className="absolute z-12 bg-[url(./assets/backgroundmap.jpg)] border-2 dark:border-[#ffca09] border-[#a48100] rounded-md lg:w-3/10 h-5/10 max-sm:w-9/10 md:w-5/10 shadow-lg">
                <div className="flex-col justify-center w-full h-full dark:bg-black/80 bg-[#d6d4d4]/80 rounded-sm">
                    <div className="flex justify-center items-center h-1/8 border-b-2 dark:border-[#ffca09] border-[#a48100]">
                        <h1 className="text-2xl dark:text-neutral-200 text-neutral-700 font-bold">About this Project</h1>
                    </div>
                    <div className="flex justify-center items-center h-5/8">

                    </div>
                    <div className="flex w-full h-2/8 items-center justify-center justify-self-end">
                        <button className="cursor-pointer h-10 hover:bg-[#ffe68c]/20 dark:bg-black/40 bg-white/70 px-2 py-1.5 border-2 dark:border-[#ffe68c] border-[#a48100] rounded-xl"
                        onClick={close}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;