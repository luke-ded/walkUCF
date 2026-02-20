interface ChildProps {
  toggleError: (error: any) => void;
}

const Error: React.FC<ChildProps> = ({ toggleError }) => {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

  function close() {
    toggleError(false);
  }

  return (
    <div className="fixed inset-0 flex items-start pt-30 justify-center z-12 flex h-full w-full max-w-full items-center justify-center bg-black/50">
      <div className="rounded-md border-2 border-red-500 bg-[url(./assets/backgroundmap.jpg)] shadow-lg max-lg:top-1/16 max-sm:w-9/10 md:w-5/10 lg:w-3/10 dark:border-red-400">
        <div className="colored-marker flex h-fit w-full flex-col justify-center rounded-sm bg-[#d6d4d4]/80 dark:bg-black/80">
          <div className="text-md flex h-fit flex-col items-center justify-center p-3 text-center text-neutral-700 max-sm:text-sm dark:text-neutral-200">
            <p className="mt-3">
              Locations inaccessible to each other. Some locations or entrances could be
              inaccessible depending on your map options.{" "}
            </p>
            <p className="mt-3">
              If this is likely incorrect, please submit a issue report{" "}
              <a
                href="https://forms.gle/XmwzZMkAw9f15xzs6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline font-bold text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
              >
                here
              </a>{" "}
              with the names & entrances of these two locations.
            </p>
          </div>
          <div className="mt-3 mb-5 flex h-2/8 w-full items-center justify-center justify-self-end">
            <button
              className="h-10 cursor-pointer rounded-xl border-2 border-red-500/75 bg-white/70 px-2 py-1.5 hover:bg-red-400/20 dark:border-red-400/75 dark:bg-black/40"
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

export default Error;
