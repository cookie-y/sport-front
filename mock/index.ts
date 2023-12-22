import Mock from 'better-mock';
import account from './api/account';
import auth from './api/auth';
import member from './api/member';
import message from './api/message';
import race from './api/race';
import schedule from './api/schedule';
import school from './api/school';

account.forEach((item) => Mock.mock(item.url, item.method, item.response()));
auth.forEach((item) => Mock.mock(item.url, item.method, item.response()));
member.forEach((item) => Mock.mock(item.url, item.method, item.response()));
message.forEach((item) => Mock.mock(item.url, item.method, item.response()));
race.forEach((item) => Mock.mock(item.url, item.method, item.response()));
schedule.forEach((item) => Mock.mock(item.url, item.method, item.response()));
school.forEach((item) => Mock.mock(item.url, item.method, item.response()));
