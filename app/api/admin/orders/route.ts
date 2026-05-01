import handler from "../../../../api/admin/orders";
import { runVercelHandler } from "../../_adapter";

export const runtime = "nodejs";

export async function GET(request: Request) {
  return runVercelHandler(handler, request);
}
