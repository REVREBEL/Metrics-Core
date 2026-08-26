import { IconGitBranch, IconGitFork } from "@tabler/icons-react";
import { Button } from "@buttons/button";

export default function ButtonWithIcon() {
  return (
    <div className="flex gap-2">
      <Button variant="outline">
        <IconGitBranch data-icon="inline-start" strokeWidth={1.5} size={20} />{" "}
        New Branch
      </Button>
      <Button variant="outline">
        Fork
        <IconGitFork data-icon="inline-end" strokeWidth={1.5} size={20} />
      </Button>
    </div>
  );
}
