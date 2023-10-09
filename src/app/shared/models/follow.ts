import { User } from './user';

export interface Follow {
  follower: User;
  followerId: string;
  following: User;
  followingId: string;
}
