import { FC } from 'react';

export const Tag: FC = ({ children }) => (
  <div className="text-2xs absolute top-2 -left-[2px] flex h-3.5 items-start font-medium tracking-wide text-white md:-left-[3px] md:top-4 md:text-sm">
    <svg
      className="w-[4px] md:w-[6px]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 4 18"
    >
      <path className="fill-green-700" d="M2 14a2 2 0 1 0 0 4v-4Z" />
      <path
        className="fill-green-500"
        d="M4 0H2a2 2 0 0 0-2 2v14c0-1.1.9-2 2-2h2V0Z"
      />
    </svg>
    <div className="flex h-[14px] items-center bg-green-500 pl-1 pr-2 md:h-[21px] md:pl-5">
      {children}
    </div>
    <svg
      className="w-[4px] md:w-[6px]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 4 18"
    >
      <path
        className="fill-green-500"
        d="M0 14h3.1c.4 0 .7-.4.5-.7L.3 7.5a1 1 0 0 1 0-1L3.6.7C3.8.4 3.6 0 3 0H0v14Z"
      />
    </svg>
  </div>
);
