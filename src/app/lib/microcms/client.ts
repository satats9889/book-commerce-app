import { BookType } from '@/app/type/type';
import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_SERVICE_DOMEIN!, 
  apiKey: process.env.NEXT_PUBLIC_API_KEY!,
});

export const getAllBooks = async () => {
  const allBooks = await client.getList<BookType>({
      endpoint: "bookcommerce",
  });

  return allBooks;
};

export const getDetailBook = async ( contentId: string ) => {
  const detailBook = await client.getListDetail<BookType>({
    endpoint: "bookcommerce",
    contentId
  });
  return detailBook;
}
