import Mock from 'mockjs';
import account from './eggapi/account';
import auth from './eggapi/auth';
import member from './eggapi/member';
import message from './eggapi/message';
import race from './eggapi/race';
import schedule from './eggapi/schedule';
import school from './eggapi/school';

account.forEach((item) => Mock.mock(item.url, item.method, item.response()));
auth.forEach((item) => Mock.mock(item.url, item.method, item.response()));
member.forEach((item) => Mock.mock(item.url, item.method, item.response()));
message.forEach((item) => Mock.mock(item.url, item.method, item.response()));
race.forEach((item) => Mock.mock(item.url, item.method, item.response()));
schedule.forEach((item) => Mock.mock(item.url, item.method, item.response()));
school.forEach((item) => Mock.mock(item.url, item.method, item.response()));
