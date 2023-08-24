import {Document} from 'mongoose';

export interface IPost extends Document{
    readonly description:string;
    readonly title: string;
    readonly createdAt; string;
    readonly id:string;
    readonly markdown:string;

    readonly image:string;
}
