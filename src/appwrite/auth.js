import conf from '../conf/conf.js'
import { Client, Account, ID } from "appwrite"
export class AuthService {
  client = new Client()
  account

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)
    this.account = new Account(this.client)
  }
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      )
      if (userAccount) {
        // return userAccount
        return this.login({ email, password })
      } else {
        return userAccount
      }
    } catch (error) {
      throw error
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password)
    } catch (error) {
      throw error
    }
  }
  async getUser() {
    try {
       const session = await this.account.getSession("current") // Check active session
       if (session) {
         return await this.account.get() // Now safely fetch user details
       }
    } catch (error) {
      console.log("Appwrite getUser error", error)
    }
    return null
  }
  async logout() {
    try {
      await this.account.deleteSessions()
    } catch (error) {
      console.log("Appwrite logout error", error)
      throw error
    }
  }
}
const authService = new AuthService()
export default authService
