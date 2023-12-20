const allRoles = {
  user: ['managePremium'],
  admin: ['getUsers', 'manageUsers'],
  lawyer: ['getUsers', 'manageUsers'],
  member: ['managePremium'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
