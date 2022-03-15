import { FC } from 'react';

export const Tag: FC = ({ children }) => (
  <div className="absolute top-2 -left-0.5 flex h-3.5 items-start text-2xs font-bold text-cyan-700">
    <svg
      className="w-1"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 4 18"
    >
      <path className="fill-cyan-900" d="M2 14a2 2 0 1 0 0 4v-4Z" />
      <path
        className="fill-white"
        d="M4 0H2a2 2 0 0 0-2 2v14c0-1.1.9-2 2-2h2V0Z"
      />
    </svg>
    <div className="flex h-3.5 items-center bg-white pl-1 pr-2">{children}</div>
    <svg className="w-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 18">
      <path
        className="fill-white"
        d="M0 14h3.1c.4 0 .7-.4.5-.7L.3 7.5a1 1 0 0 1 0-1L3.6.7C3.8.4 3.6 0 3 0H0v14Z"
      />
    </svg>
  </div>
);
