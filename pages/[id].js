import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import ProfileSection from "../components/ProfileSection";

function Profile() {
  const { data: session } = useSession();
  return (
    <div
      className={`min-h-screen w-full bg-slate-50 text-slate-900 antialiased`}
    >
      <Head>
        <title>welcome {session?.user?.email}</title>
        <link rel="icon" href="/1logo.png" />
      </Head>
      <Navbar />
      <div className="w-screen px-5 md:px-0 md:max-w-screen-2xl xl:max-w-screen-xl mx-auto flex items-center justify-between h-full">
        <div className="py-5 w-full">
          <ProfileSection />
        </div>
      </div>
    </div>
  );
}

export default Profile;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
