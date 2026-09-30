const signedIn = true;
const hasPermission = true;
const missingName = undefined;
const emptyName = "";

export const mayEnter = signedIn && hasPermission;
export const missingDisplay = missingName ?? "Guest";
export const emptyDisplay = emptyName ?? "Guest";
