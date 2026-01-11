import ImageKit from '@imagekit/nodejs';
import { configDotenv } from 'dotenv';
configDotenv();
const imageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
});

export default imageKit;