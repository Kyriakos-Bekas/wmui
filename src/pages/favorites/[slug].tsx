import { type Program } from "@prisma/client";
import {
  type InferGetServerSidePropsType,
  type GetServerSideProps,
} from "next";
import { prisma } from "~/server/db";

// Similarly to programs/[slug].tsx but without the logic for saving the modified program to favorites.

const FavoriteProgramPage = ({
  program,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <main className="container py-6">
      <p>
        This will be like the configuration page of presets when the time pick
        is implemented
      </p>
    </main>
  );
};

// This gets called on every request
export const getServerSideProps: GetServerSideProps<{
  program: Omit<Program, "createdAt">;
}> = async (req) => {
  // Get slug from the URL
  const { slug: programSlug } = req.query;
  // Fetch program from API
  const program = await prisma.program.findFirst({
    where: { type: "CUSTOM", slug: programSlug as string },
  });

  if (!program) return { notFound: true };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { createdAt, ...rest } = program;

  // Pass data to the page via props
  return { props: { program: rest } };
};

export default FavoriteProgramPage;
