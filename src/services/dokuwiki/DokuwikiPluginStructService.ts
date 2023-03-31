/**
 * Dokuwiki RPC Interface 2.0 services
 *
 * @link https://www.dokuwiki.org/devel:xmlrpc#available_functions
 */
export interface DokuwikiPluginStructService {
  /**
   * Get the structured data of a given page
   *
   * @param {string} page The page to get data for
   * @param {string?} schema The schema to use, empty for all
   * @param {int?} timestamp A timestamp if you want historic data (0 for now)
   * @return {array} ('schema' ⇒ ( 'fieldlabel' ⇒ 'value', …))
   */
  ["plugin.struct.getData"](page: string, schema: string, timestamp: number): Promise<Record<string, any>>;

  /**
   * Saves data for a given page (creates a new revision)
   *
   * If this call succeeds you can assume your data has either been saved or it
   * was not necessary to save it because the data already existed in the
   * wanted form or the given schemas are no longer assigned to that page.
   * @param {string} page string page to edit or create
   * @param {array} data array ('schema' ⇒ ( 'fieldlabel' ⇒ 'value', …))
   * @param {string} summary
   * @return {boolean} always returns true
   */
  ["plugin.struct.saveData"]<T = string | string[]>(page: string, data: Record<string, Record<string, T>>, summary: string): Promise<boolean>;
}
