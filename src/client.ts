import sanityClient, { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export default createClient({
    projectId: process.env.SANITY_PROJECT_ID, // you can find this in sanity.json
    dataset: 'production', // or the name you chose in step 1
    useCdn: true, // `false` if you want to ensure fresh data
    token: process.env.SANITY_PROJECT_API_TOKEN,
    // apiVersion: '',
})