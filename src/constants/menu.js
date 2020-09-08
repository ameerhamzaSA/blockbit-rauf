import { adminRoot } from "./defaultValues";

const data = [
  {
    id: 'userlist',
    icon: 'iconsminds-air-balloon-1',
    label: 'User List',
    to: `${adminRoot}`,
    subs: [
      {
        icon: 'simple-icon-paper-plane',
        label: 'Start',
        to: `${adminRoot}/app`,
      },
    ],
  },
];
export default data;
