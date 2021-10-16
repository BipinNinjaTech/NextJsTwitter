import { useState } from "react";
import { signIn, signOut, getSession } from "next-auth/client";
import { Input, FormControl, Button } from "@chakra-ui/react";
import styles from "../styles/Home.module.css";

const Home = ({ session }) => {
  const [statuses, setStatuses] = useState();

  const getTweetsByHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("query");
    const results = await fetch("/api/twitter/searchtweets", {
      method: "POST",
      body: JSON.stringify({
        q: query,
        result_type: "recent",
      }),
    }).then((res) => res.json());
    setStatuses(results.data);
  };

  return (
    <div>
      <main className={styles.main}>
        <p className={styles.description}>
          {!session && (
            <>
              Not signed in <br />
              <button onClick={() => signIn()}>Sign in</button>
            </>
          )}
          {session && (
            <>
              Signed in as {session.user.email} <br />
              <button onClick={() => signOut()}>Sign out</button>
            </>
          )}
        </p>
        <div>
          <form onSubmit={getTweetsByHandle}>
            <FormControl>
              <Input
                id="search"
                name="query"
                placeholder="Input handler e.g @xyz"
              />
            </FormControl>
            <Button mt={4} colorScheme="teal" type="submit">
              Search
            </Button>
          </form>
          {statuses && (
            <ul>
              {statuses.map(({ id, text, user }) => {
                return (
                  <li key={id}>
                    <p>{text}</p>
                    <p>
                      By {user.name} ({user.screen_name})
                    </p>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}
export default Home;
