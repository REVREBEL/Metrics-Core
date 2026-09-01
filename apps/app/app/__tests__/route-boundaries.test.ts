import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, test } from "node:test";

const appDir = path.resolve(process.cwd(), "app");

describe("App Router Contract", () => {
  test("should have required top-level route groups", () => {
    const expectedGroups = [
      "(auth)",
      "(errors)",
      "(mission-control)",
      "(workspace)",
    ];
    for (const group of expectedGroups) {
      const groupPath = path.join(appDir, group);
      assert.ok(
        fs.existsSync(groupPath) && fs.statSync(groupPath).isDirectory(),
        `Route group directory '${group}' should exist`,
      );
    }
  });

  test("should have required root boundary files", () => {
    const expectedFiles = [
      "layout.tsx",
      "error.tsx",
      "loading.tsx",
      "not-found.tsx",
    ];
    for (const file of expectedFiles) {
      const filePath = path.join(appDir, file);
      assert.ok(
        fs.existsSync(filePath) && fs.statSync(filePath).isFile(),
        `Root boundary file '${file}' should exist`,
      );
    }
  });

  test("should have all Core Workspace route roots", () => {
    const workspaceDir = path.join(appDir, "(workspace)");
    const expectedRoutes = [
      "broadcast",
      "commercial-plan",
      "growth-plan",
      "help-desk",
      "metrics-library",
      "metrics",
      "playbook",
      "threads",
    ];
    for (const route of expectedRoutes) {
      const routePath = path.join(workspaceDir, route);
      assert.ok(
        fs.existsSync(routePath) && fs.statSync(routePath).isDirectory(),
        `Core Workspace route '${route}' should exist in (workspace) group`,
      );
    }
  });

  test("should enforce Mission Control separation from workspace", () => {
    const missionControlInWorkspace = path.join(
      appDir,
      "(workspace)",
      "mission-control",
    );
    assert.ok(
      !fs.existsSync(missionControlInWorkspace),
      "Mission Control must NOT be nested inside the (workspace) route group",
    );

    const missionControlGroup = path.join(appDir, "(mission-control)");
    assert.ok(
      fs.existsSync(missionControlGroup),
      "Mission Control should be in its own '(mission-control)' route group",
    );
  });
});
