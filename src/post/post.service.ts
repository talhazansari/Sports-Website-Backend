import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDto } from 'src/dto/create-post-dto';
import { UpdatePostDto } from 'src/dto/update-post-dto';
import { IPost } from 'src/interface/post.interface';
@Injectable()
export class PostService {
  constructor(@InjectModel('Post') private postModel: Model<IPost>) {}

  async createPost(postDTO: CreatePostDto): Promise<IPost> {
    const newItem = await this.postModel.create(postDTO);
    return newItem;
  }
  async getAllPosts(): Promise<IPost[]> {
    const itemData = await this.postModel.find();
    if (!itemData || itemData.length == 0) {
      throw new NotFoundException('Item Data Not Found');
    }
    return itemData;
  }
  // async getPost(title: string): Promise<IPost> {
  //   const existingPost = await this.postModel.findById(title);
  //   if (!existingPost) throw new NotFoundException('Item ${title} not found');
  //   return existingPost;
  // }

  async deletePost(postID: string): Promise<IPost> {
    const deletedPost = await this.postModel.findByIdAndDelete(postID);
    if (!deletedPost) {
      throw new NotFoundException('Item #${title} not found');
    }
    return deletedPost;
  }

  async updatePost(
    postID: string,
    updatePostDto: UpdatePostDto,
  ): Promise<IPost> {
    const updatedItem = await this.postModel.findByIdAndUpdate(
      postID,
      updatePostDto,
      { new: true },
    );
    if (!updatedItem) {
      throw new Error('Item #${title} not found');
    }
    return updatedItem;
  }




  async getPost(postId:string): Promise <IPost>
{
const existingUser= await this.postModel.findById(postId);
if(!existingUser){
  throw new Error('Student #${postID} not found')
}
return existingUser;
}




}
