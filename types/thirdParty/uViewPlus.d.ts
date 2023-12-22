/* eslint-disable no-unused-vars */
declare module 'uview-plus';

interface Uni {
  $u: {
    toast(message: string): void;
    route(config: any): void;
  };
}
