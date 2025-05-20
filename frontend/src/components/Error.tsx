interface ChildProps 
{
    toggleError: (error:any) => void;
}

const Error: React.FC<ChildProps> = ({toggleError}) =>
{
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

    function close()
    {
        toggleError(false);
    }

    return (
                <div className="absolute z-12 top-1/14 max-lg:top-1/21 left-0 w-full max-w-full h-full max-lg:20/21 flex items-center justify-center bg-black/50">
                <div className="absolute z-12 top-1/8 max-lg:top-1/16 bg-[url(./assets/backgroundmap.jpg)] border-2 dark:border-red-400 border-red-500 rounded-md lg:w-3/10 h-fit max-sm:w-9/10 md:w-5/10 shadow-lg">
                <div className="flex colored-marker flex-col justify-center w-full h-full dark:bg-black/80 bg-[#d6d4d4]/80 rounded-sm">
                    <div className="flex flex-col justify-center items-center max-sm:text-sm text-md dark:text-neutral-200 text-neutral-700 text-center h-6/8 p-3">
                        <p className="mt-3">Locations inacessible to each other. Some entrances could be inacessible depending on your map options. </p>
                        <p className="mt-3">If this is probably incorrect, please submit a issue report <a href="https://forms.gle/XmwzZMkAw9f15xzs6" target="_blank" rel="noopener noreferrer" className="inline font-bold dark:text-red-400 text-red-500 dark:hover:text-red-300 hover:text-red-700">here</a> with the names & entrances of these two locations.</p>
                    </div>
                    <div className="flex w-full h-2/8 mb-5 mt-3 items-center justify-center justify-self-end">
                        <button className="cursor-pointer h-10 hover:bg-red-400/20 dark:bg-black/40 bg-white/70 px-2 py-1.5 border-2 dark:border-red-400/75 border-red-500/75 rounded-xl"
                        onClick={close}>Close</button>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Error;