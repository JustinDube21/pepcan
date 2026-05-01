import { Readable } from "stream";

type VercelHandler = (req: NodeJS.ReadableStream & { method?: string; headers: Record<string, string>; url?: string }, res: VercelResponse) => unknown | Promise<unknown>;

type VercelResponse = {
  statusCode: number;
  setHeader: (name: string, value: string | string[]) => void;
  getHeader: (name: string) => string | null;
  write: (chunk: string | Buffer) => void;
  end: (chunk?: string | Buffer) => void;
};

function requestHeaders(request: Request) {
  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    headers[key.toLowerCase()] = value;
  });
  return headers;
}

export async function runVercelHandler(handler: VercelHandler, request: Request) {
  const body = request.body ? Buffer.from(await request.arrayBuffer()) : Buffer.alloc(0);
  const req = Readable.from(body.length ? [body] : []) as unknown as NodeJS.ReadableStream & {
    method?: string;
    headers: Record<string, string>;
    url?: string;
  };
  req.method = request.method;
  req.headers = requestHeaders(request);
  req.url = request.url;

  let ended = false;
  let statusCode = 200;
  const headers = new Headers();
  const chunks: Buffer[] = [];

  const response = new Promise<Response>((resolve) => {
    const res: VercelResponse = {
      get statusCode() {
        return statusCode;
      },
      set statusCode(value: number) {
        statusCode = value;
      },
      setHeader(name, value) {
        headers.set(name, Array.isArray(value) ? value.join(", ") : value);
      },
      getHeader(name) {
        return headers.get(name);
      },
      write(chunk) {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk)));
      },
      end(chunk) {
        if (chunk) this.write(chunk);
        ended = true;
        resolve(
          new Response(Buffer.concat(chunks), {
            status: statusCode,
            headers,
          })
        );
      },
    };

    Promise.resolve(handler(req, res)).then(
      () => {
        if (!ended) res.end();
      },
      (error) => {
        if (!ended) {
          headers.set("Content-Type", "application/json");
          statusCode = 500;
          res.end(JSON.stringify({ error: error instanceof Error ? error.message : "Internal server error." }));
        }
      }
    );
  });

  return response;
}
