interface ChildProps {
  toggleAbout: (about: any) => void;
}

const About: React.FC<ChildProps> = ({ toggleAbout }) => {
  function close() {
    toggleAbout(false);
  }

  return (
    <div className="fixed inset-0 flex items-start pt-30 z-12 flex h-full w-full max-w-full items-center justify-center bg-black/50">
      <div className="absolute z-12 h-fit rounded-md border-2 border-[#a48100] bg-[url(./assets/backgroundmap.jpg)] shadow-lg max-lg:h-3/10 max-sm:w-9/10 md:w-5/10 lg:w-3/10 dark:border-[#ffca09]">
        <div className="flex h-fit w-full flex-col justify-center rounded-sm bg-[#d6d4d4]/80 dark:bg-black/80">
          <div className="flex h-1/8 items-center justify-center border-b-2 border-[#a48100] dark:border-[#ffca09]">
            <h1 className="py-1 text-2xl font-bold text-neutral-700 dark:text-neutral-200">
              About this Project
            </h1>
          </div>
          <div className="text-md flex h-5/8 flex-col items-center justify-center p-5 text-center text-neutral-700 max-sm:text-sm dark:text-neutral-200">
            <p> <span className="inline font-bold">walkUCF</span> is a UCF map perfect for finding the fastest way to class. It provides the best routes, 
              comprehensive building abbreviations, and precise entraces. 
            </p>
            <p className="mt-3">
              This project was created by&nbsp;
              <a
                href="https://www.linkedin.com/in/luke-ded"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#a48100] hover:text-[#ffe68c] dark:text-[#ffca09]"
              >
                Luke
              </a>
              , a CS major at the University of Central Florida.
            </p>
            <p className="mt-3">
              Find the code for this project&nbsp;
              <a
                href="https://github.com/luke-ded/walkUCF"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#a48100] hover:text-[#ffe68c] dark:text-[#ffca09]"
              >
                here
              </a>
              .
            </p>
            <p className="mt-3">
              Report bugs, issues, or missing map elements&nbsp;
              <a
                href="https://forms.gle/XmwzZMkAw9f15xzs6"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#a48100] hover:text-[#ffe68c] dark:text-[#ffca09]"
              >
                here
              </a>
              .
            </p>
            <p className="mt-3">
              Thanks for using <span className="inline font-bold">walkUCF</span>!
            </p>
          </div>
          <div className="mb-5 flex h-2/8 w-full items-center justify-center justify-self-end">
            <button
              className="h-10 cursor-pointer rounded-xl border-2 border-[#a48100] bg-white/70 px-2 py-1.5 hover:bg-[#ffe68c]/20 active:bg-[#ffe68c]/20 dark:border-[#ffe68c] dark:bg-black/40"
              onClick={close}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
