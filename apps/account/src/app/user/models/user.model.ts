import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document } from "mongoose";
import {IUser, UserRole} from '@school-nestjs/interfaces';

@Schema({
    timestamps: true
})
export class User extends Document implements IUser {
    @Prop()
    displayName?: string;

    @Prop({
        required: true,
        unique: true
    })
    email: string;

    @Prop({
        required: true,
    })
    passwordHash: string;

    @Prop({
        default: UserRole.Student,
        enum: UserRole,
        type: String
    })
    role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);