import http from './httpService'

class FileService {
  public async upload(params: any): Promise<any> {
    const formData = new FormData();
    formData.append('file', params.file);
    formData.append('name', '123');
    return http.post('/api/file/upload', formData)
  }
}
export default new FileService()