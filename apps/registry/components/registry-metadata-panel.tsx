import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/primitives/ui-core/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/primitives/tables/table";

import type { ComponentMetadata } from "@lib/registry";

export function RegistryMetadataPanel({
  metadata,
}: {
  metadata?: ComponentMetadata;
}) {
  if (!metadata) return null;

  const props = metadata.props ?? [];
  const hasDescription = Boolean(metadata.description?.trim());

  if (!hasDescription && props.length === 0) {
    return null;
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Documentation</CardTitle>
        <CardDescription>
          Props and notes come from the generated metadata layer, not the install manifest.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {hasDescription ? (
          <div className="space-y-2">
            <h2 className="font-medium text-base">Description</h2>
            <p className="text-muted-foreground text-sm">{metadata.description}</p>
          </div>
        ) : null}

        {props.length > 0 ? (
          <div className="space-y-3">
            <h2 className="font-medium text-base">Props</h2>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prop</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Default</TableHead>
                    <TableHead>Required</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {props.map((prop) => (
                    <TableRow key={prop.name}>
                      <TableCell className="font-medium">{prop.name}</TableCell>
                      <TableCell className="font-mono text-xs">{prop.type}</TableCell>
                      <TableCell className="font-mono text-xs">
                        {prop.defaultValue ?? "—"}
                      </TableCell>
                      <TableCell>{prop.required ? "Yes" : "No"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
