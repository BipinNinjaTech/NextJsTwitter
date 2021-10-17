import { useState } from "react";
import {
  Input,
  Button,
  Heading,
  Text,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import Tweets from "./tweets";
import styles from "../styles/Home.module.css";

const Home = () => {
  const [statuses, setStatuses] = useState();
  const [isLoading, setLoading] = useState(false);
  const [isDataFound, setIsDataFound] = useState(true);

  const getTweetsByHandle = async (e) => {
    setLoading(true);
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
    setIsDataFound(results.data.length > 0);
    setLoading(false);
  };

  return (
    <div className={styles.main}>
      <div>
        <Heading>Twitter champions 🦸🏻‍♂️</Heading>
        <Text fontSize="xl" mt={3} align="center">
          Find the best tweets. Based on twitter handler, not followers.
        </Text>
        <form onSubmit={getTweetsByHandle} className={styles.searchForm}>
          <Input
            id="search"
            name="query"
            placeholder="Input handler e.g @xyz"
            variant="outline"
            width="fit-content"
          />
          <Button ml={2} colorScheme="gray" type="submit" isLoading={isLoading}>
            Search
          </Button>
        </form>
        {isDataFound ? (
          <Tweets statuses={statuses} />
        ) : (
          <Alert status="info" mt={5}>
            <AlertIcon />
            No results found
          </Alert>
        )}
      </div>
    </div>
  );
};

export default Home;
