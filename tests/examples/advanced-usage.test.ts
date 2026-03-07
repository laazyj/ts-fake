import { describe, it, expect } from "vitest";
import { fake } from "../../src/index";

describe("advanced usage examples", () => {
  it("should create complex nested user profile", () => {
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
        {
          id: "role-1",
          name: "admin",
          permissions: [
            {
              resource: "users",
              actions: ["read", "write"],
            },
          ],
        },
      ],
      organization: {
        id: "org-1",
        name: "Test Org",
        settings: {},
      },
    });

    expect(complexFake.userId).toBe("user-789");
    expect(complexFake.username).toBe("testuser");
    expect(complexFake.roles).toHaveLength(1);
    expect(complexFake.roles[0].id).toBe("role-1");
    expect(complexFake.roles[0].name).toBe("admin");
    expect(complexFake.roles[0].permissions).toHaveLength(1);
    expect(complexFake.roles[0].permissions[0].resource).toBe("users");
    expect(complexFake.roles[0].permissions[0].actions).toEqual(["read", "write"]);
    expect(complexFake.organization.id).toBe("org-1");
    expect(complexFake.organization.name).toBe("Test Org");
  });

  it("should work in test scenarios with minimal fakes", () => {
    interface Organization {
      id: string;
      name: string;
      settings: Record<string, unknown>;
    }

    interface UserProfile {
      userId: string;
      username: string;
      email: string;
      roles: unknown[];
      organization: Organization;
      metadata: Record<string, string>;
    }

    function processUser(user: UserProfile): string {
      return `Processing user ${user.username} from ${user.organization.name}`;
    }

    const minimalUser = fake<UserProfile>({
      username: "testuser",
      organization: {
        // Minimal Organization
        name: "Test Company",
      },
    });

    const result = processUser(minimalUser);

    expect(result).toBe("Processing user testuser from Test Company");
  });

  it("should handle records and complex metadata", () => {
    interface WithMetadata {
      id: string;
      metadata: Record<string, string>;
      settings: Record<string, unknown>;
    }

    const result = fake<WithMetadata>({
      id: "test-123",
      metadata: {
        key1: "value1",
        key2: "value2",
      },
      settings: {
        enabled: true,
        count: 42,
      },
    });

    expect(result.id).toBe("test-123");
    expect(result.metadata.key1).toBe("value1");
    expect(result.metadata.key2).toBe("value2");
    expect(result.settings.enabled).toBe(true);
    expect(result.settings.count).toBe(42);
  });
});
