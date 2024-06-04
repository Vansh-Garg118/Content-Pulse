
import {config}  from "../config/config";
import {Client,Account , ID ,Databases, Query,Storage} from 'appwrite';

export class Functionality{
     client=new Client()
     databases;
     storage;

     constructor(){
        this.Account=new Account(this.client)
        this.client.setEndpoint(config.appwriteurl)
        this.client.setProject( config.projectid)
        this.databases=new Databases(this.client)
        this.storage = new Storage(this.client);

     }

      async addPost({title,slug,content,userid, image,status}){
        try {
            return await this.databases.createDocument(config.dbid, config.collectionid,slug,
                {
                    title,
                    content,
                    image,
                    userid,
                    status
            })
        } catch (error) {
            console.log("appwrite error:: add post::",error)
        }
     }

     async updatePost(slug,{title,content,userId, image,status}){
        try {
              return updateres= await this.databases.updateDocument(config.dbid,config.collectionid,slug,{
                title,
                    content,
                    image,
                    userId,
                    status
              })
        } catch (error) {
            console.log("aapwrite error:: update service::",error)
        }

     }

     async deletepost({slug}){
        try {
             this.databases.deleteDocument(config.dbid,config.collectionid,slug)
             return true
        } catch (error) {
            console.log("appwrite error:: delete operation::",error)
            return false
        }
     }

     async getpost(slug){
        // console.log(slug.slug)
        try {
            return await this.databases.getDocument(config.dbid,config.collectionid,slug.slug)
        } catch (error) {
            console.log("Appwrite error :: getPost",error)
        }
     }

     async listpost(queries=[Query.equal("status","active")]){
        try {
            const res= await this.databases.listDocuments(config.dbid, config.collectionid,queries)
            // console.log(res);
            return res;
        } catch (error) {
            console.log("appwrite error :: listPost ",error)
        }
     }

     async uploadfile(file){
        try {
            return await this.storage.createFile(config.bucketid,ID.unique(),file)
        } catch (error) {
            console.log("appwrite error :: uploadfile::",error)
            return false;
        }
     }

     async deletefile(fileId){
        try {
             await this.storage.deleteFile(config.bucketid,fileId)
             return false;
        } catch (error) {
            console.log("appwrite error :: deletefile::",error)
        }
     }

     async updatefile(fileId){
        try {
            return await this.storage.updateFile(config.bucketid,fileId)
            
        } catch (error) {
            console.log("appwrite error :: updatefile::",error)
        }
     }

      filePreview(image){
       return this.storage.getFilePreview(config.bucketid, image)
     }


}

const functionality=new Functionality()

export default functionality;