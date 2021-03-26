export interface NeedType {
  category: string,
  title: string,
  amount: string,
  urgent: number,
  desc: string,
}

export const emptyNeed = {
  category: '',
  title: '',
  amount: "",
  urgent: 3,
  desc: '',
}