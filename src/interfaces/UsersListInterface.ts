/* I had this interface before when I received from API all users without their roles
export default interface UsersListInterface {
  name: string
  id: string
  email: string
  phoneNumber: string
}
*/

export default interface UsersListInterface {
  user: {
    name: string
    id: string
    email: string
    phoneNumber: string
  },
  role: string
}