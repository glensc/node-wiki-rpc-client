# Client for Wiki RPC Interface 2.0

TypeScript client for [Wiki RPC Interface 2.0][1] ([web.archive.org][2]).

This is the [Remote API interface][3] that [Dokuwiki][4] implements.

[1]: http://www.jspwiki.org/wiki/WikiRPCInterface2
[2]: https://web.archive.org/web/20130526043929/http://www.jspwiki.org/wiki/WikiRPCInterface2
[3]: https://www.dokuwiki.org/xmlrpc
[4]: https://www.dokuwiki.org

## Usage

```ts
import { WikiRpcClient } from "@glen/wiki-rpc-client";

const main = async () => {
  const url = "http://localhost/lib/exe/xmlrpc.php";
  const client = new WikiRpcClient(url);
  const data = await client.call("wiki.getPage", ["start"]);
  console.log(data);
};

main().catch((e: Error) => console.error(e));
```
