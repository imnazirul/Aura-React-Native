import { Client, Account, ID, Avatars, Databases } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.apk.aura",
    projectId: "6773c4d40003d91bd77f",
    // storageId: "660d0e59e293896f1eaf",
    databaseId: "6773c69c0003506284ee",
    userCollectionId: "6773c81f00095926d96a",
    // videoCollectionId: "660d157fcb8675efe308",
  };

const client = new Client()
    .setEndpoint(appwriteConfig.endpoint)
    .setProject('6773c4d40003d91bd77f')
    .setPlatform('com.apk.aura');

    const account = new Account(client)
    const avatar = new Avatars(client)
    const databases = new Databases(client);

export const CreateUser = async(email:string, password:string, username:string)=>{
    try {
        const newAccount = await account.create(
          ID.unique(),
          email,
          password,
          username
        );
    
        if (!newAccount) throw Error;
    
        const avatarUrl = avatar.getInitials(newAccount.name);
    
        // await signIn(email, password);
    
        const newUser = await databases.createDocument(
          appwriteConfig.databaseId,
          appwriteConfig.userCollectionId,
          ID.unique(),
          {
            accountId: newAccount.$id,
            email: email,
            username: username,
            password: password,
            avatar: avatarUrl,
          }
        );
    
        return newUser;
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : String(error));
      }
}