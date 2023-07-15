import 'dotenv/config';
import Flickr from 'flickr-sdk';
import { useSelectedLayoutSegments } from 'next/navigation';

export async function getPhotos() {
  const flickr = new Flickr(
    Flickr.OAuth.createPlugin(
      process.env.FLICKR_API_KEY,
      process.env.FLICKR_API_SECRET,
      process.env.FLICKR_ACCESS_TOKEN,
      process.env.FLICKR_ACCESS_TOKEN_SECRET
    )
  );

  const data = await flickr.photosets.getPhotos({
    photoset_id: process.env.FLICKR_ALBUM_ID || '',
    user_id: process.env.FLICKR_USER_ID || '',
  });

  console.log('RESPONSE:', data.body.photoset.photo);

  const photo = data.body.photoset.photo[0];

  const first_photo = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_o.jpg`;

  console.log(first_photo);

  return data;
}
