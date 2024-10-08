export class UserModel {
  id: string = '';
  name: string = '';
  avatar: string = '';
  createdAt: string = '';

  constructor(data?: UserModel) {
    if (data) {
      this.id = data?.id || '';
      this.name = data?.name || '';
      this.avatar = data?.avatar || '';
      this.createdAt = data?.createdAt || '';
    }
  }
}
