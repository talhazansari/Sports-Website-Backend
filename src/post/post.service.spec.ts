import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
import { getModelToken } from '@nestjs/mongoose';
import { Post } from 'src/schema/post.schema';
import { Model } from 'mongoose';
import { CreatePostDto } from 'src/dto/create-post-dto';
import { UpdatePostDto } from 'src/dto/update-post-dto';
describe('PostService', () => {
  let postService: PostService;
  let model: Model<Post>;
  const mockPostService = {
    findById: jest.fn(),
    findByIdAndDelete: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  };
  const mockPost = {
    _id: '64de05b3e43204f4f21519725',
    description: 'Hello Talha',
    title: 'Here is the title',
    markdown: 'Yaar kesay ho',
    createdAt: '2023-08-18T07:17:30.631+00:00',
    updatedAt: '2023-08-18T07:17:30.631+00:00',
  };
  const mockDB = [
    {
      _id: '64de05b3e4304f4f21519725',
      description: 'Hello Talha',
      title: 'Here is the title',
      markdown: 'Yaar kesay ho',
      createdAt: '2023-08-18T07:17:30.631+00:00',
      updatedAt: '2023-08-18T07:17:30.631+00:00',
    },
    {
      _id: '64de05b3e4304f4f21519721',
      description: 'Zed Talha',
      title: 'Here is the title',
      markdown: 'Yaar kesay ho',
      createdAt: '2023-08-18T07:17:30.631+00:00',
      updatedAt: '2023-08-18T07:17:30.631+00:00',
    },
  ];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: getModelToken('Post'),
          useValue: mockPostService,
        },
      ],
    }).compile();
    postService = module.get<PostService>(PostService);
    model = module.get<Model<Post>>(getModelToken('Post'));
  });
  describe('findAll', () => {
    it('should return an array of posts', async () => {
      model.find = jest.fn().mockReturnValue(mockDB);
      const result = await postService.getAllPosts();
      expect(result).toEqual(mockDB);
    });
    it('should handle error if finding posts fails', async () => {
      const error = new Error('Database error');
      model.find = jest.fn().mockRejectedValue(error);
      await expect(postService.getAllPosts()).rejects.toThrow(error);
    });
  });
  describe('getPost', () => {
    it('it should find a post and return by post ID', async () => {
      jest.spyOn(model, 'findById').mockResolvedValue(mockPost);
      const result = await postService.getPost(mockPost._id);
      expect(result).toEqual(mockPost);
    });
    it('it should return error if post not found', async () => {
      jest.spyOn(model, 'findById').mockResolvedValue(null);
      const result = postService.getPost(mockPost._id);
      await expect(result).rejects.toThrow();
    });
  });
  describe('create', () => {
    const mockCreatePostDto: CreatePostDto = {
      id: '64de05b3e4304f4f21519721',
      description: 'Zed Talha',
      title: 'Here is the title',
      markdown: 'Yaar kesay ho',
      createdAt: '2023-08-18T07:17:30.631+00:00',
      image: 'This is an image',
    };
    const createdPost: CreatePostDto = {
      id: '64de05b3e4304f4f21519721',
      description: 'Zed Talha',
      title: 'Here is the title',
      markdown: 'Yaar kesay ho',
      createdAt: '2023-08-18T07:17:30.631+00:00',
      image: 'This is an image',
    };
    const notCreatedPost: CreatePostDto = {
      id: '64de05b3e4304f4f21519721',
      description: 'Zed Talha',
      title: 'Here is the title',
      markdown: 'Yaar kesay ho',
      createdAt: '2023-08-18T07:17:30.631+00:00',
      image: 'This is an image',
    };

    it('should create a new post', async () => {
      model.create = jest.fn().mockResolvedValue(mockCreatePostDto);
      const result = await postService.createPost(createdPost);
      expect(result).toEqual(createdPost);
    });
    it('should not create a new post', async () => {
      const error = new Error('Database error');
      model.create = jest.fn().mockRejectedValue(error);
      await expect(postService.createPost(notCreatedPost)).rejects.toThrow(
        error,
      );
    });
  });
  //Delete
  describe('deletePost', () => {
    const deletedPost = {
      _id: '64de05b3e43204f4f21519725',
      description: 'Hello Talha',
      title: 'Here is the title',
      markdown: 'Yaar kesay ho',
      createdAt: '2023-08-18T07:17:30.631+00:00',
      updatedAt: '2023-08-18T07:17:30.631+00:00',
    };
    it('it should delete the post', async () => {
      jest.spyOn(model, 'findByIdAndDelete').mockResolvedValue(mockPost);
      const result = await postService.deletePost(mockPost._id);
      expect(result).toEqual(deletedPost);
    });
    it('should handle error if deleting a post fails', async () => {
      const postId = 'mockId';
      const error = new Error('Database error');
      model.findByIdAndDelete = jest.fn().mockRejectedValue(error);
      await expect(postService.deletePost(postId)).rejects.toThrow(error);
    });
  });
  // Update
  describe('updatePost', () => {
    const updatedPost: UpdatePostDto = {
      id: '64de05b3e43204f4f21519725',
      description: 'Hello Talha',
      title: 'Here is the title',
      markdown: 'Yaar kesay ho',
      createdAt: '2023-08-18T07:17:30.631+00:00',
    };
    const dummyPostDto: UpdatePostDto = {
      id: '64de05b3e43204f4f21519725',
      description: 'Hello Talha',
      title: 'Here is the title',
      markdown: 'Yaar kesay ho',
      createdAt: '2023-08-18T07:17:30.631+00:00',
    };
    it('it should find and update the post', async () => {
      jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValue(dummyPostDto);
      const result = await postService.updatePost(dummyPostDto.id, updatedPost);
      expect(result).toEqual(updatedPost);
    });

    it('should handle error if updating a post fails', async () => {
      const error = new Error('Database error');
      model.findByIdAndUpdate = jest.fn().mockRejectedValue(error);
      await expect(
        postService.updatePost(dummyPostDto.id, updatedPost),
      ).rejects.toThrow(error);
    });
  });
});
