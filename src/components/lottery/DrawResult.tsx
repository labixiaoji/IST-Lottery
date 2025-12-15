import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { PrizeLevel } from '../../types';

interface DrawResultProps {
  isOpen: boolean;
  onClose: () => void;
  winner: number | null;
  prize: PrizeLevel | null;
}

export const DrawResult = ({ isOpen, onClose, winner, prize }: DrawResultProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-50 rotate-[-10deg]"
              enterTo="opacity-100 scale-100 rotate-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100 rotate-0"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 p-10 text-center align-middle shadow-2xl transition-all relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent pointer-events-none" />
                
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-medium leading-6 text-slate-300 mb-2"
                >
                  恭喜获得 {prize?.name}
                </Dialog.Title>
                
                <div className="my-8 relative">
                    <div className="text-[120px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 to-cyan-500 drop-shadow-[0_0_30px_rgba(34,211,238,0.6)] animate-bounce">
                        {winner}
                    </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
