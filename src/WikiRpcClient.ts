import xmlrpc, { Client } from "xmlrpc";

import { Options } from "./Options";

/**
 * This is generic Wiki RPC Interface 2.0 client.
 *
 * @link http://www.jspwiki.org/wiki/WikiRPCInterface2
 * @link https://web.archive.org/web/20130526043929/http://www.jspwiki.org/wiki/WikiRPCInterface2
 */
export class WikiRpcClient {
  private readonly client: Client;

  public constructor(private readonly url: string, options: Options = {}) {
    this.client = this.createClient(this.url, options);
  }

  public async call<R>(methodName: string, params: unknown[] = []): Promise<R> {
    return new Promise<R>((resolve, reject) => {
      this.client.methodCall(methodName, params, (error, value) => {
        if (error) {
          reject(error);
        }

        resolve(value);
      });
    });
  }

  private createClient(url: string, options: Options): Client {
    const {
      protocol,
      hostname,
      port,
      href,
    } = new URL(url);

    const isSecure = protocol == "https:";
    const factory = isSecure ? xmlrpc.createSecureClient : xmlrpc.createClient;

    return factory({
      host: hostname,
      port: Number(port),
      url: href,
      basic_auth: options.basic_auth,
    });
  }
}
