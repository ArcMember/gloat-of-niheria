import type { RequestEvent } from '@builder.io/qwik-city';
 
export const onGet = async ({ params, redirect }: RequestEvent) => {
//   const isAuthorized = checkAuthorization(cookie.get('cookie'));
    console.log(params)
    throw redirect(302, '../news/04-24?fresh');

};