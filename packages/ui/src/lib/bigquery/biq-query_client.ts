import { BigQuery } from "@google-cloud/bigquery";

import { getDataLocation } from "./config";

let _client: BigQuery | null = null;

export function getBigQueryClient(): BigQuery {
  if (_client) {
    return _client;
  }

  const credentialsJson = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;

  if (credentialsJson) {
    let credentials: Record<string, unknown>;
    try {
      credentials = JSON.parse(credentialsJson) as Record<string, unknown>;
    } catch {
      throw new Error(
        "BigQuery setup error: GOOGLE_APPLICATION_CREDENTIALS_JSON is set but could not be parsed as JSON. " +
          "Ensure the environment variable contains valid service account JSON. " +
          "See docs/bigquery-setup.md for instructions.",
      );
    }
    _client = new BigQuery({ credentials, location: getDataLocation() });
    return _client;
  }

  _client = new BigQuery({ location: getDataLocation() });
  return _client;
}
