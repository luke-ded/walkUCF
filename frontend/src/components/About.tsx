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
        <div className="absolute z-12 top-1/14 max-lg:top-1/21 left-0 w-full max-w-full h-full max-lg:20/21 flex items-center justify-center bg-black/50">
            <div className="absolute z-12 top-1/8 max-lg:top-1/16  bg-[url(./assets/backgroundmap.jpg)] border-2 dark:border-[#ffca09] border-[#a48100] rounded-md lg:w-3/10 h-fit max-sm:w-9/10 md:w-5/10 shadow-lg">
                <div className="flex flex-col justify-center w-full h-full dark:bg-black/80 bg-[#d6d4d4]/80 rounded-sm">
                    <div className="flex justify-center items-center h-1/8 border-b-2 dark:border-[#ffca09] border-[#a48100]">
                        <h1 className="text-2xl py-1 dark:text-neutral-200 text-neutral-700 font-bold">About this Project</h1>
                    </div>
                    <div className="flex flex-col justify-center items-center max-sm:text-sm text-md dark:text-neutral-200 text-neutral-700 text-center h-5/8 p-3">
                        <p>This project was created by&nbsp;
                            <a href="https://www.linkedin.com/in/luke-ded" target="_blank" rel="noopener noreferrer"
                                className="font-bold dark:text-[#ffca09] text-[#a48100] hover:text-[#ffe68c]">
                                Luke</a>
                            , a CS major at the University of Central Florida.
                        </p>
                        <p className="mt-5">Find the code for this project&nbsp;
                            <a href="https://github.com/luke-ded/walkUCF" target="_blank" rel="noopener noreferrer" 
                            className="font-bold dark:text-[#ffca09] text-[#a48100] hover:text-[#ffe68c]">here</a>
                            .
                        </p>
                        <p className="mt-5">Report bugs, issues, or missing map elements&nbsp;
                            <a href="https://forms.gle/XmwzZMkAw9f15xzs6" target="_blank" rel="noopener noreferrer"
                            className="font-bold dark:text-[#ffca09] text-[#a48100] hover:text-[#ffe68c]">here</a>
                            .
                        </p>
                        <p className="mt-5">Thanks for trying <h1 className="inline font-bold">walkUCF</h1>!</p>
                    </div>
                    <div className="flex w-full h-2/8 mb-5 mt-5 items-center justify-center justify-self-end">
                        <button className="cursor-pointer h-10 hover:bg-[#ffe68c]/20 dark:bg-black/40 bg-white/70 px-2 py-1.5 border-2 dark:border-[#ffe68c] border-[#a48100] rounded-xl"
                        onClick={close}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;