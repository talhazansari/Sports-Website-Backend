import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
import { getModelToken } from '@nestjs/mongoose';
import { Post } from 'src/schema/post.schema';
import { Model } from 'mongoose';



describe('PostService', () => {
    let postService: PostService;
    let model: Model<Post>;
    const mockPostService = {
        findById: jest.fn()
    }

    const mockPost = {
        _id: '64de05b3e4304f4f21519725',
        description: 'Hello Talha',
        title: 'Here is the title', 
        markdown: 'Yaar kesay ho',
        createdAt: '2023-08-18T07:17:30.631+00:00',
        updatedAt: '2023-08-18T07:17:30.631+00:00',
    };





    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
            PostService,
            {
                provide: getModelToken('Post'),
                useValue: mockPostService,
            }
        ],
      }).compile();
  
      postService = module.get<PostService>(PostService);
      model = module.get<Model<Post>>(getModelToken('Post'));
    });


    describe('findById', () => {

        it('it should find a post and return by post ID', async () => {
            jest.spyOn(model,'findById').mockResolvedValue(mockPost);
            const result = await postService.getPost(mockPost._id);
            expect(model.findById).toHaveBeenCalledWith(mockPost._id)
            expect(result).toEqual(mockPost);
        })


    })
  
  

  
  
  });
  