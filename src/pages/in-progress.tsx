import { useRouter } from "next/router";

const InProgress = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <main>
      <h1>
        Program <span className="font-semibold">{slug}</span> is in progress
      </h1>
    </main>
  );
};

export default InProgress;
