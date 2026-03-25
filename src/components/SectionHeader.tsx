interface Props{
  title: string;
  buttonLabel: string;
  onClick: () => void;
};

export const SectionHeader = ({ title, buttonLabel, onClick }: Props) => {


  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest">
        { title }
      </h2>
      <button
        className="flex items-center gap-2 bg-gray-900 text-white hover:bg-gray-700 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
        onClick={ onClick }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        { buttonLabel }
      </button>
    </div>
  );
};
