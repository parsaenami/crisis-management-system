export type UserInfoType = {
  firstName: string,
  lastName: string,
  phoneNumber: string,
  nationalId: string,
  address: string,
  location: {
    allow: boolean,
    lat: string,
    long: string,
  },
}

export const emptyUserInfo: UserInfoType = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  nationalId: '',
  address: '',
  location: {
    allow: false,
    lat: '',
    long: '',
  },
}