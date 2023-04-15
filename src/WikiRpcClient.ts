import { Options } from "./Options";
import { XmlRpcClient, XmlRpcValue } from "@foxglove/xmlrpc";

/**
 * This is generic Wiki RPC Interface 2.0 client.
 *
 * @link http://www.jspwiki.org/wiki/WikiRPCInterface2
 * @link https://web.archive.org/web/20130526043929/http://www.jspwiki.org/wiki/WikiRPCInterface2
 */
export class WikiRpcClient {
  private readonly client: XmlRpcClient;

  public constructor(private readonly url: string, options: Options = {}) {
    this.client = this.createClient(this.url, options);
  }

  public async call<T extends XmlRpcValue>(methodName: string, params: XmlRpcValue[] = []): Promise<T> {
    return await this.client.methodCall(methodName, params) as T;
  }

  private createClient(url: string, options: Options): XmlRpcClient {
    const headers = this.createHeaders(options);

    return new XmlRpcClient(url, { headers });
  }

  private createHeaders(options: Options) {
    if (!options.basic_auth) {
      return undefined;
    }

    const { user, pass } = options.basic_auth;
    const encoded = Buffer.from(user + ":" + pass).toString("base64");
    return {
      Authorization: "Basic " + encoded,
    };
  }
}
