export const getPerms = async user => user ? (await user.getRoles()).map(r => r.permissions).flat() : []
