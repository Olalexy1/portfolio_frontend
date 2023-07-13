import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const client = createClient({
    // projectId: process.env.SANITY_PROJECT_ID, // you can find this in sanity.json
    projectId: 'akgqdtm6',
    dataset: 'production', // or the name you chose in step 1
    useCdn: true, // `false` if you want to ensure fresh data
    // token: process.env.SANITY_PROJECT_API_TOKEN,
    token:'skgDj37AlckMjtE4DaDIzMYvqPHXMoCRmglalHhK17XN0dtU8i3fomFZHiaH9zgZ2CYCX8NchRT5WwLOHSToFpA7IaIu8qVsC8GaF5swXuFcvqVTPv3uYae5OuSQNjxFOQLPm0Nh9nnUVGr3lxCuxKUEf1yVsgGXHANA3Cx1U889uRn428yf',
    // apiVersion: '',
})

const builder = imageUrlBuilder(client);

export const urlFor = (source: SanityImageSource) => builder.image(source)