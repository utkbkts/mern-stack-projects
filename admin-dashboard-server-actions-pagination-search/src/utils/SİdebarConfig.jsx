import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
} from "react-icons/md";

export const MenuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/",
        icon: <MdDashboard />,
      },
      {
        title: "Users",
        path: "/users",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Products",
        path: "/products",
        icon: <MdShoppingBag />,
      },
      {
        title: "Transactions",
        path: "/transactions",
        icon: <MdAttachMoney />,
      },
    ],
  },
  {
    title: "Analytics",
    list: [
      {
        title: "Revenue",
        path: "/revenue",
        icon: <MdWork />,
      },
      {
        title: "Reports",
        path: "/reports",
        icon: <MdAnalytics />,
      },
      {
        title: "Teams",
        path: "/teams",
        icon: <MdPeople />,
      },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "/settings",
        icon: <MdOutlineSettings />,
      },
      {
        title: "Help",
        path: "/help",
        icon: <MdHelpCenter />,
      },
    ],
  },
];
