import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Exit from '../assets/exit.svg';
import Input from '../components/Input';
import { ActiveState } from '../models/misc';

type AddActionModalProps = {
  modalState: ActiveState;
  setModalState: (state: ActiveState) => void;
  handleSubmit: (actionName: string) => void;
};

const isValidFunctionName = (name: string): boolean => {
  const pattern = /^[a-zA-Z0-9_-]+$/;
  return pattern.test(name);
};

export default function AddActionModal({
  modalState,
  setModalState,
  handleSubmit,
}: AddActionModalProps) {
  const { t } = useTranslation();
  const [actionName, setActionName] = React.useState('');
  const [functionNameError, setFunctionNameError] = useState<boolean>(false);

  const handleAddAction = () => {
    if (!isValidFunctionName(actionName)) {
      setFunctionNameError(true);
      return;
    }
    setFunctionNameError(false);
    handleSubmit(actionName);
    setActionName('');
    setModalState('INACTIVE');
  };
  return (
    <div
      className={`${
        modalState === 'ACTIVE' ? 'visible' : 'hidden'
      } fixed top-0 left-0 z-30  h-screen w-screen  bg-gray-alpha flex items-center justify-center`}
    >
      <article className="flex w-11/12 sm:w-[512px] flex-col gap-4 rounded-2xl bg-white shadow-lg dark:bg-[#26272E]">
        <div className="relative">
          <button
            className="absolute top-3 right-4 m-2 w-3"
            onClick={() => {
              setFunctionNameError(false);
              setModalState('INACTIVE');
              setActionName('');
            }}
          >
            <img className="filter dark:invert" src={Exit} />
          </button>
          <div className="p-6">
            <h2 className="font-semibold text-xl text-jet dark:text-bright-gray px-3">
              New Action
            </h2>
            <div className="mt-6 relative px-3">
              <span className="z-10 absolute left-5 -top-2 bg-white px-2 text-xs text-gray-4000 dark:bg-[#26272E] dark:text-silver">
                Action Name
              </span>
              <Input
                type="text"
                value={actionName}
                onChange={(e) => {
                  const value = e.target.value;
                  setActionName(value);
                  setFunctionNameError(!isValidFunctionName(value));
                }}
                borderVariant="thin"
                placeholder={'Enter name'}
              />
              <p
                className={`mt-2 ml-1 text-xs italic ${
                  functionNameError ? 'text-red-500' : 'text-gray-500'
                }`}
              >
                {functionNameError
                  ? 'Invalid function name format. Use only letters, numbers, underscores, and hyphens.'
                  : 'Use only letters, numbers, underscores, and hyphens (e.g., `get_data`, `send_report`, etc.)'}
              </p>
            </div>
            <div className="mt-3 flex flex-row-reverse gap-1 px-3">
              <button
                onClick={handleAddAction}
                className="rounded-3xl bg-purple-30 px-5 py-2 text-sm text-white transition-all hover:bg-[#6F3FD1]"
              >
                Add
              </button>
              <button
                onClick={() => {
                  setFunctionNameError(false);
                  setModalState('INACTIVE');
                  setActionName('');
                }}
                className="cursor-pointer rounded-3xl px-5 py-2 text-sm font-medium hover:bg-gray-100 dark:bg-transparent dark:text-light-gray dark:hover:bg-[#767183]/50"
              >
                {t('modals.configTool.closeButton')}
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
