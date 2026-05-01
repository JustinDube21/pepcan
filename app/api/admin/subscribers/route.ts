import handler from "../../../../api/admin/subscribers";
import { runVercelHandler } from "../../_adapter";

export const runtime = "nodejs";

export async function GET(request: Request) {
  return runVercelHandler(handler, request);
}
