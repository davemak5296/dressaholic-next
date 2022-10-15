import clsx from 'clsx';

const input = clsx(
  'peer',
  'block',
  'w-full',
  ['my-4'],
  // ['my-4', 'lg:my-6'],
  ['p-2.5', 'pl-1.5'],
  ['bg-none', 'bg-white'],
  ['border-b', 'border-solid', 'border-gray-500'],
  'outline-none',
  ['text-lg', 'text-gray-500']
);

const label = clsx(
  ['absolute', 'left-1.5'],
  'pointer-events-none',
  ['transition-top', 'delay-[0ms]', 'duration-300', 'ease-[cubic-bezier(0.2,1,0.2,1)]'],
  ['peer-focus:top-[-14px]', 'peer-focus:text-xs', 'peer-focus:text-black']
);

const label_isEmpty = clsx(label, 'top-2.5', 'text-gray-500');

const label_isNotEmpty = clsx(label, 'top-[-14px]', ['text-xs', 'text-black']);

export default { input, label_isEmpty, label_isNotEmpty };
