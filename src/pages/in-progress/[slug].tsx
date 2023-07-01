import { type Program } from "@prisma/client";
import {
  type GetServerSideProps,
  type InferGetServerSidePropsType,
} from "next";
import { prisma } from "~/server/db";

const InProgress = ({
  name,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <main className="container py-6">
      <h1 className="text-2xl font-semibold">
        Program <span className="text-blue-700">{name}</span> is in progress
      </h1>
    </main>
  );
};

// This gets called on every request
export const getServerSideProps: GetServerSideProps<
  Omit<Program, "createdAt">
> = async (req) => {
  // Get slug from the URL
  const { slug: programSlug } = req.query;
  // Fetch program from API
  const program = await prisma.program.findFirst({
    where: { slug: programSlug as string },
  });

  if (!program) return { notFound: true };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { createdAt, ...rest } = program;

  // Pass data to the page via props
  return { props: { ...rest } };
};

export default InProgress;
