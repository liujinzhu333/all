import http from './httpService'

class DocsService {
  public async getDocsMenu(): Promise<any> {
    return http.get('/docs/docsMenu.json')
  }
}
export default new DocsService()
