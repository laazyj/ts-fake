import { fake } from "../src/index";

// Example: Complex nested structures
interface Permission {
  resource: string;
  actions: string[];
}

interface Role {
  id: string;
  name: string;
  permissions: Permission[];
}

interface Organization {
  id: string;
  name: string;
  settings: Record<string, unknown>;
}

interface UserProfile {
  userId: string;
  username: string;
  email: string;
  roles: Role[];
  organization: Organization;
  metadata: Record<string, string>;
}

const complexFake = fake<UserProfile>({
  userId: "user-789",
  username: "testuser",
  roles: [
    fake<Role>({
      id: "role-1",
      name: "admin",
      permissions: [
        fake<Permission>({
          resource: "users",
          actions: ["read", "write"],
        }),
      ],
    }),
  ],
  organization: {
    id: "org-1",
    name: "Test Org",
    settings: {},
  },
});

console.log("Complex fake:", JSON.stringify(complexFake, null, 2));

// Example: Using in test scenarios
function processUser(user: UserProfile): string {
  return `Processing user ${user.username} from ${user.organization.name}`;
}

// Create minimal fake for testing
const minimalUser = fake<UserProfile>({
  username: "testuser",
  organization: {
    name: "Test Company",
    settings: {},
  },
});

console.log(processUser(minimalUser));
