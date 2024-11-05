import { Account, Avatars, Client, Databases, ID, Query, Storage } from "react-native-appwrite";

// Appwrite configuration
export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  projectId: "66f52c08003b66cfb0b4",
  databaseId: "66f52fc000368110fbca",
  userCollectionId: "66f5300600228680cebf",
  videoCollectionId: "66f5315f003e16a98c42",
  storageId: "66f530fa001fae06f7e9"
};

// Initialize Appwrite client and services
const client = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const getSession = async () => {
    try {
        const session = await account.getSession('current');
        return session; // This will return the session if it exists
    } catch (error) {
        return null; // Return null if no session exists
    }
};


// User account functions
export async function createUser(email, password, username) {
  try {
    const newAccount = await account.create(ID.unique(), email, password, username);
    const avatarUrl = avatars.getInitials(username);
    await signIn(email, password);

    return await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      { accountId: newAccount.$id, email, username, avatar: avatarUrl }
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getUserProfile() {
    try {
      const currentAccount = await account.get();
      const currentUser = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.equal('accountId', currentAccount.$id)]
      );
  
      // Assuming you want to return the username and email
      return {
        username: currentUser.documents[0]?.username || "Unknown User",
        email: currentUser.documents[0]?.email || "No Email",
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

export async function signIn(email, password) {
  try {
    return await account.createEmailPasswordSession(email, password);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function signOut() {
  try {
    return await account.deleteSession("current");
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    );

    return currentUser.documents[0];
  } catch (error) {
    throw new Error(error.message);
  }
}


export { client, account, databases };
