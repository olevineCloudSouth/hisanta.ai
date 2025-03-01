import config, { getCharacter } from '@/lib/config';
import { notFound } from 'next/navigation';
import { CallCharacter } from '../../components/CallCharacter';

// Set the runtime to Edge.
// @see https://nextjs.org/docs/app/building-your-application/rendering/edge-and-nodejs-runtimes#segment-runtime-option
export const runtime = 'edge';

// Enable dynamic routes.
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
export const dynamicParams = true;

// Set the revalidation period.
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate
export const revalidate = 60;

const characters = config.availableCharacters;

/**
 * Generate character pages for static generation.
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
  // Return the ids for each character.
  return characters.map((c) => ({
    character: c.characterId,
  }));
}

/**
 * The character page.
 */
export default async function Page({ params }: { params: { character: string } }) {
  // Get the content for the character.
  console.log(`Character: ${params.character}`);
  const character = getCharacter(params.character);
  if (!character) {
    notFound();
  }

  return (
    <div className="mx-auto flex flex-col w-full mt-4">
      <div className="text-center mx-auto text-2xl">Live from {character.location}!</div>
      <CallCharacter character={character} />
    </div>
  );
}
