export const USER_ROLES = ["user", "guide", "admin"] as const;
export type UserRole = (typeof USER_ROLES)[number];
