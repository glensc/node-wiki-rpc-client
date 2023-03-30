import { array } from "../types";

import { CreateUserInput, PageidsInput, PageidsReturn } from "./types";

/**
 * Dokuwiki RPC Interface 2.0 services
 *
 * @link https://www.dokuwiki.org/devel:xmlrpc#available_functions
 */
export interface DokuwikiService {
  /**
   * Lists all pages within a given namespace.
   * The options are passed directly to search_allpages().
   *
   * @return {Array} list of page items
   */
  ["dokuwiki.getPagelist"](namespace: string, options: array): Promise<array>;

  /**
   * Returns the DokuWiki version of the remote Wiki.
   *
   * @return {string} version number
   */
  ["dokuwiki.getVersion"](): Promise<string>;

  /**
   * Returns the current time at the remote wiki server as Unix timestamp.
   *
   * @return {number} timestamp
   */
  ["dokuwiki.getTime"](): Promise<number>;

  /**
   * Returns the XML RPC interface version of the remote Wiki.
   * This is DokuWiki implementation specific and independent of the supported
   * standard API version returned by wiki.getRPCVersionSupported.
   *
   * @return {number} version number
   */
  ["dokuwiki.getXMLRPCAPIVersion"](): Promise<number>;

  /**
   * Uses the provided credentials to execute a login and will set cookies.
   * This can be used to make authenticated requests afterwards. Your client
   * needs to support cookie handling. Alternatively use HTTP basic auth
   * credentials.
   *
   * @return {boolean} login successful
   */
  ["dokuwiki.login"](user: string, password: string): Promise<boolean>;

  /**
   * Performs a fulltext search.
   *
   * @param {string} query a query string as described on search
   * @return {array} associative array with matching pages similar to what is
   * returned by dokuwiki.getPagelist, snippets are provided for the first 15
   * results
   */
  ["dokuwiki.search"](query: string): Promise<array>;

  /**
   * Returns the title of the wiki.
   *
   * @return {string} The title of the wiki
   */
  ["dokuwiki.getTitle"](): Promise<string>;

  /**
   * Appends text to a Wiki Page.
   *
   * @param {string} pagename
   * @param {string} raw  Wiki text
   * @param {array} attrs Where attrs can contain the following:
   * $attrs['sum'] = (string) change summary
   * $attrs['minor'] = (boolean) minor
   */
  ["dokuwiki.appendPage"](pagename: string, raw: string, attrs: array): Promise<boolean>;

  /**
   * Allows you to lock or unlock a bunch of pages at once.
   * Useful when you are about to do an operation over multiple pages.
   *
   * @param {pageids} pageids list of two lists of page ids
   * [
   *     'lock' => [...],
   *     'unlock' => [...]
   * ]
   * @return {PageidsReturn} array with 4 lists of pageids
   */
  ["dokuwiki.setLocks"](pageids: PageidsInput): Promise<PageidsReturn>;

  /**
   * Create a user.
   * Returns 400 range error codes if input is not accepted.
   *
   * @param {CreateUserInput} params
   * @return {boolean} true if the user is created
   */
  ["dokuwiki.createUser"](params: CreateUserInput): Promise<boolean>;

  /**
   * Allows you to delete one or more users.
   * Useful to implement GDPR right to be forgotten tools.
   *
   * @param {strong[]} usernames list of usernames to delete
   * @return {boolean} true if the users were deleted
   */
  ["dokuwiki.deleteUsers"](usernames: string[]): Promise<boolean>;
}
