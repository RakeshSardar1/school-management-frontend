export const findExistingUser = <T extends object>(
  listOfUsers: T[],
  newUser: T | null | undefined,
  requiredMatches: (keyof T)[] = ["id"] as (keyof T)[],
): T | false => {
  if (!newUser) return false;

  // Check if a user exists where ALL provided keys match
  const isDuplicate = listOfUsers.some((user) =>
    requiredMatches.every((key) => user[key] === newUser[key]),
  );

  // If it's a duplicate, return false. Otherwise, return the new user.
  return isDuplicate ? false : newUser;
};
