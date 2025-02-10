import { Client, Account, ID, Avatars, Databases, Query, Storage } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.apk.aura",
    projectId: "6773c4d40003d91bd77f",
    storageId: "67945ddd0037aa805ada",
    databaseId: "6773c69c0003506284ee",
    userCollectionId: "6773c81f00095926d96a",
    videoCollectionId: "67aa1aa4002d59b0592e",
  };

const client = new Client()
    .setEndpoint(appwriteConfig.endpoint)
    .setProject('6773c4d40003d91bd77f')
    .setPlatform('com.apk.aura');

    const account = new Account(client)
    const avatar = new Avatars(client)
    const databases = new Databases(client);
    const storage = new Storage(client);

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
    
        await signIn(email, password);
    
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

export const signIn = async(username:string, password:string)=>{
    try {
        const response = await account.createEmailPasswordSession(username, password);
        return response;
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : String(error));
      }
}

// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error:any) {
    throw new Error(error);
  }
}

// Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Sign Out
export async function signOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error:any) {
    throw new Error(error);
  }
}


// Upload File
export async function uploadFile(file:any, type:any) {
  if (!file) return;

  const { mimeType, ...rest } = file;
  const asset = { type: mimeType, ...rest };

  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      asset
    );
    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error:any) {
    throw new Error(error);
  }
}

// Get File Preview
export async function getFilePreview(fileId:any, type:any) {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFileView(
        appwriteConfig.storageId,
        fileId,
      );
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error:any) {
    throw new Error(error);
  }
}

// Create Video Post
export async function createVideoPost(form:any) {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"),
    ]);
console.log(form.title, form.prompt);
    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId,
      }
    );

    return newPost;
  } catch (error:any) {
    throw new Error(error);
  }
}

// Get all video Posts
export async function getAllPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId
    );

    return posts.documents;
  } catch (error:any) {
    throw new Error(error);
  }
}

// Get video posts created by user
export async function getUserPosts(userId:any) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.equal("creator", userId)]
    );

    return posts.documents;
  } catch (error:any) {
    throw new Error(error);
  }
}