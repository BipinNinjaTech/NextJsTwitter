import Twitter from 'twitter-lite';

export default async (req, res) => {
  const body = JSON.parse(req.body);
  const { q, result_type } = body;
  
  const client = new Twitter({
    subdomain: 'api',
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    bearer_token: process.env.TWITTER_BEARER_TOKEN
   });

  try {
    const results = await client.get('search/tweets', {
      q,
      result_type
    });
    return res.status(200).json({
      status: 'Ok',
      data: results.statuses
    });
  } catch(e) {
    return res.status(400).json({
      status: e.message
    });
  }
}