/* eslint-disable no-useless-catch */
import conf from '../conf/conf';
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async createUser({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // Call another method
                // this.login({ email, password })
                const token = await this.generateEmailOtp(userAccount.$id, userAccount.email);
                return token;
            } 
        } catch (error) {
            // console.log("Appwrite service :: createUser :: error ", error);
            throw error;
        }
    }

    async generateEmailOtp(userId, email) {
        try {
            const token = await this.account.createEmailToken(userId, email, false);
            return token;
        } catch (error) {
            // console.log("Appwrite service :: generateEmailOtp :: error ", error);
            throw error;
        }
    }

    async createSessionOtp({ userId, otp }) {
        try {
            return await this.account.createSession(userId, otp);
        } catch (error) {
            // console.log("Appwrite service :: createSessionOtp :: error ", error);
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            // console.log("Appwrite service :: login :: error ", error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            // console.log("Appwrite service :: getCurrentUser :: error ", error);
            // throw error;
        }
        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            // console.log("Appwrite service :: logout :: error ", error);
            // throw error;
        }
    }
}

const authService = new AuthService();

export default authService;
