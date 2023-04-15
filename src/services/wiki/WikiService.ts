import { array } from "../types";

/**
 * Wiki RPC Interface 2.0 services
 *
 * The documentation is from Dokuwiki.
 *
 * @link http://www.jspwiki.org/wiki/WikiRPCInterface2
 * @link https://web.archive.org/web/20130526043929/http://www.jspwiki.org/wiki/WikiRPCInterface2
 * @link https://www.dokuwiki.org/devel:xmlrpc#available_functions
 */
export interface WikiService {
  /**
   * @return Returns 2 with the supported RPC API version.
   */
  ["wiki.getRPCVersionSupported"](): Promise<string>;

  /**
   * Returns the permission of the given wikipage.
   *
   * @param {string} pagename
   * @return {number} Permissions of given wiki page
   */
  ["wiki.aclCheck"](pagename: string): Promise<number>;

  /**
   * Returns the raw Wiki text for a page.
   *
   * @return raw Wiki text
   */
  ["wiki.getPage"](pagename: string, timestamp?: number): Promise<string>;

  /**
   * Returns the raw Wiki text for a specific revision of a Wiki page.
   *
   * @return raw Wiki text
   */
  ["wiki.getPageVersion"](pagename: string, version: number): Promise<string>;

  /**
   * Returns the available versions of a Wiki page.
   * The number of pages in the result is controlled via the recent
   * configuration setting.
   * The offset can be used to list earlier versions in the history.
   *
   * @return (array) each array item holds the following data:
   *
   * $data['user'] = username
   * $data['ip'] = ip address
   * $data['type'] = type of change
   * $data['sum'] = summary
   * $data['modified'] =  modification date as IXR_Date Object
   * $data['version'] = page version as timestamp
   */
  ["wiki.getPageVersions"](pagename: string, offset: number): Promise<string>;

  /**
   * Returns information about a Wiki page.
   *
   * @returns {array} an array containing the following data:
   * $data['name'] = pagename
   * $data['lastModified'] = modification date as IXR_Date Object
   * $data['author'] = author of the Wiki page.
   * $data['version'] = page version as timestamp
   */
  ["wiki.getPageInfo"](pagename: string): Promise<array>;

  /**
   * Returns information about a specific version of a Wiki page.
   *
   * @param {string} pagename
   * @param {number} version
   * @return {array} an array containing the following data:
   * $data['name'] = pagename
   * $data['lastModified'] = modification date as UTC timestamp
   * $data['author'] = author of the Wiki page.
   * $data['version'] = page version as timestamp
   */
  ["wiki.getPageInfoVersion"](pagename: string, version: number): Promise<array>;

  /**
   * Returns the rendered XHTML body of a Wiki page.
   *
   * @param {string} pagename
   * @return {string} rendered HTML
   */
  ["wiki.getPageHTML"](pagename: string): Promise<string>;

  /**
   * Returns the rendered HTML of a specific version of a Wiki page.
   *
   * @param {string} pagename
   * @param {number} version
   * @return {string} rendered HTML
   */
  ["wiki.getPageHTMLVersion"](pagename: string, version: number): Promise<void>;

  /**
   * Saves a Wiki Page.
   *
   * @param {string} pagename
   * @param {string} raw Wiki text
   * @param {array} attrs Where attrs can contain the following:
   * $attrs['sum'] = (string) change summary
   * $attrs['minor'] = (boolean) minor
   */
  ["wiki.putPage"](pagename: string, raw: string, attrs: array): Promise<boolean>;

  /**
   * Returns a list of all links contained in a Wiki page.
   *
   * @param {string} pagename
   * @return {array} (array) each array item holds the following data:
   * $data['type'] = local/extern
   * $data['page'] = the wiki page (or the complete URL if extern)
   * $data['href'] = the complete URL
   */
  ["wiki.listLinks"](pagename: string): Promise<void>;

  /**
   * Returns a list of all Wiki pages in the remote Wiki.
   *
   * @return {array} (array) One item for each page, each item containing the following data:
   * $data['id'] = id of the page
   * $data['perms'] = integer denoting the permissions on the page
   * $data['size'] = size in bytes
   * $data['lastModified'] = dateTime object of last modification date
   */
  ["wiki.getAllPages"](): Promise<array>;

  /**
   * Returns a list of backlinks of a Wiki page.
   *
   * @param {string} pagename
   */
  ["wiki.getBackLinks"](pagename: string): Promise<string[]>;

  /**
   * Returns a list of recent changes since given timestamp.
   *
   * As stated in recent_changes: Only the most recent change for each page is
   * listed, regardless of how many times that page was changed.
   *
   * @param {number} timestamp
   * @return {array[]} (array) each array item holds the following data:
   * $data['name'] = page id
   * $data['lastModified'] =  modification date as UTC timestamp
   * $data['author'] = author
   * $data['version'] = page version as timestamp
   */
  ["wiki.getRecentChanges"](timestamp: number): Promise<array[]>;

  /**
   * Returns a list of recent changed media since given timestamp.
   *
   * @param {number} timestamp
   * @return {array[]}  (array) each array item holds the following data:
   * $data['name'] = media id
   * $data['lastModified'] =  modification date as UTC timestamp
   * $data['author'] = author
   * $data['version'] = page version as timestamp
   * $data['perms'] = media permissions
   * $data['size'] = media size in bytes
   */
  ["wiki.getRecentMediaChanges"](timestamp: number): Promise<void>;

  /**
   * Returns a list of media files in a given namespace.
   * The options are passed directly to search_media().
   *
   * @param {string} namespace
   * @param {array} options
   */
  ["wiki.getAttachments"](namespace: string, options: array): Promise<void>;

  /**
   * Returns the binary data of a media file.
   *
   * @param {string} id
   * @return {string} the data of the file, encoded in base64
   */
  ["wiki.getAttachment"](id: string): Promise<string>;

  /**
   * Returns information about a media file.
   * @param {string} id
   * @return {array} an array containing the following information about the file:
   * $data['size'] = size in bytes
   * $data['lastModified'] = modification date as XML-RPC Date object
   */
  ["wiki.getAttachmentInfo"](id: string): Promise<void>;

  /**
   * Uploads a file as a given media id.
   * @param {string} id
   * @param {string} data base64 encoded data
   * @param {array} params Available parameters are:
   * $params['ow'] = true if file is to overwrite an already
   * existing media object of the given id.
   */
  ["wiki.putAttachment"](id: string, data: string, params: array): Promise<void>;

  /**
   * Deletes a file. Fails if the file is still referenced from any page in the wiki.
   *
   * @param {string} id
   */
  ["wiki.deleteAttachment"](id: string): Promise<void>;
}
