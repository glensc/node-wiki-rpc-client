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

Additionally, you can create client proxy and specify function signatures

```ts
import { WikiRpcClient, WikiService, DokuwikiService, DokuwikiPluginStructService } from "@glen/wiki-rpc-client";

// create client proxy with DokuwikiService service definitions
const client = WikiRpcClient.create<DokuwikiService>(url);

// the services can be combined as well:
const client = WikiRpcClient.create<WikiService & DokuwikiService>(url);

// combine with "struct" plugin methods:
const client = WikiRpcClient.create<WikiService & DokuwikiService & DokuwikiPluginStructService>(url);

const dwVersion = await client["dokuwiki.getVersion"]();
console.log(dwVersion);

const data = await client["wiki.getPage"]("start");
console.log(data);
```

## Authentication

For Dokuwiki you can pass username and password via options:

```ts
const options = {
    basic_auth: {
        user: "glen",
        pass: String(process.env.WIKI_PASSWORD),
    },
};
```

Dokuwiki has upcoming support for JWT authentication:
- https://github.com/dokuwiki/dokuwiki/pull/2432

```ts
const options = {
    bearer_auth: String(process.env.WIKI_TOKEN),
};
```
