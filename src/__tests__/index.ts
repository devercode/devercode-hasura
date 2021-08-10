import { createcClient } from "../index";
import tag from "graphql-tag";
const client = createcClient({
  endpoint: "https://zilowproxydb.herokuapp.com/v1/graphql",
  secret: "Zilow1212@@",
});

client
  .query({
    query: tag`
  query getUnresolvedCaptcha {
    proxy_manager(
      order_by: { required_captcha: desc, updated_at: asc_nulls_first }
      limit: 100
    ) {
      cookies
      id
      user_agent
      proxy
      required_captcha
    }
  }
  
`,
  })
  .then((res) => {
    console.log(res);
  });
