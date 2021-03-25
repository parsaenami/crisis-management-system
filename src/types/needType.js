export interface NeedType {
  category: string,
  title: string,
  amount: number,
  urgent: number,
  desc: string,
}

export const emptyNeed = {
  category: '',
  title: '',
  amount: 0,
  urgent: 3,
  desc: '',
}