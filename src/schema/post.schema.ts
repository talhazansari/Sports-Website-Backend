import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({timestamps:true})
export class Post {
  @Prop()
  id: string;
  @Prop()
  description: string;
  @Prop()
  title: string;
  
  @Prop()
  markdown: string;


  @Prop()
  image:string;


}
export const PostSchema = SchemaFactory.createForClass(Post);
