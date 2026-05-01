import handler from "../../../api/stripe-webhook";
import { runVercelHandler } from "../_adapter";

export const runtime = "nodejs";

export async function POST(request: Request) {
  return runVercelHandler(handler, request);
}
