import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID, // you can find this in sanity.json
    dataset: 'production', // or the name you chose in step 1
    useCdn: true, // `false` if you want to ensure fresh data
    token: process.env.SANITY_PROJECT_API_TOKEN,
    // apiVersion: '',
})

const builder = imageUrlBuilder(client);

export const urlFor = (source: SanityImageSource) => builder.image(source)