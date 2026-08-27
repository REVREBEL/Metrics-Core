"use client";

import { Button } from "@buttons/button";
import { Input } from "@forms/fields/input";
import { IconSquareRoundedPlusFilled } from "@tabler/icons-react";
import { useState } from "react";

// Helper to generate a unique ID
let nextId = 0;
const generateId = () => {
  nextId += 1;
  return nextId;
};

const SocialUrl = () => {
  const [urls, setUrls] = useState([
    { id: generateId(), value: "" },
    { id: generateId(), value: "" },
    { id: generateId(), value: "" },
  ]);

  const addUrl = () =>
    setUrls((prev) => [...prev, { id: generateId(), value: "" }]);

  const updateUrl = (id: number, value: string) =>
    setUrls((prev) =>
      prev.map((url) => (url.id === id ? { ...url, value } : url)),
    );

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
      {/* Vertical Tabs List */}
      <div className="flex flex-col">
        <h3 className="text-foreground font-semibold">Social URLs</h3>
        <p className="text-muted-foreground text-sm">
          Manage your social URLs.
        </p>
      </div>

      {/* Content */}
      <div className="space-y-6 lg:col-span-2">
        <div className="space-y-4">
          {urls.map((url) => (
            <Input
              key={url.id}
              type="text"
              placeholder="Link to social profile"
              value={url.value}
              onChange={(e) => updateUrl(url.id, e.target.value)}
            />
          ))}
        </div>
        <div className="flex items-center justify-between gap-4">
          <Button type="button" variant="outline" onClick={addUrl}>
            <IconSquareRoundedPlusFilled className="size-4" />
            Add URL
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </div>
    </div>
  );
};

export default SocialUrl;
