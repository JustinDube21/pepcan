import handler from "../../../api/create-checkout-session";
import { runVercelHandler } from "../_adapter";

export const runtime = "nodejs";

export async function POST(request: Request) {
  return runVercelHandler(handler, request);
}
