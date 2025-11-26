interface IProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  data: string[];
}
import Carrusel from "./Carrusel";
export default function Modal({ isOpen, setIsOpen, data }: IProps) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/50 transition-opacity" />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full p-6 transform transition-all flex flex-col">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors size-6 shadow shadow-black/5 rounded-2xl z-50"
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <Carrusel images={data} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
