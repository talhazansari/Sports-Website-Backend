import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from 'src/dto/create-post-dto';
import { UpdatePostDto } from 'src/dto/update-post-dto';
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Post()
  async createPost(@Res() response, @Body() createPostDto: CreatePostDto) {
    try {
      const newPost = await this.postService.createPost(createPostDto);
      return response.status(HttpStatus.OK).json({
        message: 'Data Created Successfully',
        newPost,
      });
    } catch (error) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ statusCode: 400, message: 'Post Not Created' });
    }
  }
  @Get()
  async getPosts(@Res() response) {
    try {
      const itemData = await this.postService.getAllPosts();
      return response.status(HttpStatus.OK).json({
        message: 'All items found',
        itemData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async deletePost(@Res() response, @Param('id') title: string) {
    try {
      const postDelete = await this.postService.deletePost(
      title
      );
      return response.status(HttpStatus.OK).json({
        message: 'Data Deleted Successfully',
        postDelete,
      });
    } catch (error) {}
  }

  @Put('/edit/:id')
  async updateItem(
    @Res() response,
    @Param('id') postID: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    try {
      const existingPost = await this.postService.updatePost(
        postID,
        updatePostDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Data Updated Successfully',
        existingPost,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @Get('/edit/:id')
  async getPost(@Res() response,
  @Param('id') postID: string,) {
    try {
      const itemData = await this.postService.getPost(postID);
      return response.status(HttpStatus.OK).json({
        message: 'All items found',
        itemData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get('/show/:id')
  async getShowPost(@Res() response,
  @Param('id') postID: string,) {
    try {
      const itemData = await this.postService.getPost(postID);
      return response.status(HttpStatus.OK).json({
        message: 'All items found',
        itemData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }










}












