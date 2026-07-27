import "server-only";

export type DataLibraryPublicationResult = {
  status: "published";
  publishedAt: string;
};

export interface DataLibraryPublicationAdapter {
  publish(changeRequestId: string): Promise<DataLibraryPublicationResult>;
}

/**
 * Publication stays server-only and disabled until Metrics-Core has an
 * approved, authenticated warehouse publication service.
 */
export class DeferredDataLibraryPublicationAdapter
  implements DataLibraryPublicationAdapter
{
  async publish(
    _changeRequestId: string,
  ): Promise<DataLibraryPublicationResult> {
    throw new Error("Data Library publication is not configured");
  }
}
