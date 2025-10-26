export const STATUS = {
  NOT_SET: -1,
  INACTIVE: 0,
  ACTIVE: 1,
};

export const STATUS_LABELS = {
  [STATUS.NOT_SET]: "Not Set",
  [STATUS.INACTIVE]: "Inactive",
  [STATUS.ACTIVE]: "Active",
};

// Convert to an array for selects dropdown
export const STATUS_SELECT_OPTIONS = Object.entries(STATUS_LABELS).map(
  ([value, label]) => ({
    value: Number(value),
    label,
  })
);

// export const ROLES_LABELS = { // todo read from db
//   [0]: "Not Set",
//   [1]: "Driver",
//   [2]: "Porter",
//   [3]: "Director",
// };

// // Convert to an array for selects dropdown
// export const ROLES_SELECT_OPTIONS = Object.entries(ROLES_LABELS).map(
//   ([value, label]) => ({
//     value: Number(value),
//     label,
//   })
// );
