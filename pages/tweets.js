import { Text, Stack, Link, Box, Image } from "@chakra-ui/react";
import styles from "../styles/Home.module.css";

const Tweets = ({ statuses }) => {
  return (
    <div className={styles.tweetsList}>
      <Box p={4}>
        {statuses && (
          <Stack direction="row" justify="center" spacing={4}>
            <ul>
              {statuses.map(({ id, text, user, created_at }) => {
                return (
                  <li key={id} style={{ listStyleType: "none" }}>
                    <Box
                      maxW="md"
                      borderWidth="1px"
                      borderRadius="lg"
                      mb={2}
                      padding={4}
                    >
                      <div>
                        <Stack display="flex" direction="row" spacing={4}>
                          <Link>
                            <Image
                              borderRadius="full"
                              boxSize="40px"
                              src={user.profile_image_url}
                            />
                          </Link>
                          <div>
                            <Text>{user.name}</Text>
                            <Link
                              href={`https://twitter.com/${user.screen_name}`}
                              isExternal
                              color="gray.500"
                            >
                              @{user.screen_name}
                            </Link>
                          </div>
                          {text}
                        </Stack>
                      </div>
                      <div>{text}</div>
                      <hr />
                      <Stack
                        display="flex"
                        direction="row"
                        justify="space-between"
                      >
                        <Text>Followers : {user.followers_count}</Text>
                        <Link
                          href={
                            user.entities?.description?.urls[0]?.expanded_url
                          }
                          color="blue.400"
                        >
                          {user.entities?.description?.urls[0]?.expanded_url}
                        </Link>
                      </Stack>
                    </Box>
                  </li>
                );
              })}
            </ul>
          </Stack>
        )}
      </Box>
    </div>
  );
};

export default Tweets;
