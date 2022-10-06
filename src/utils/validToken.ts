export const validToken = async (token: string) => {
  const response = await fetch('http://localhost:5002/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body(token),
  });
  const { data } = await response.json();
  return { ...data?.validToken };
};

const body = (token: string) =>
  JSON.stringify({
    query,
    variables: {
      token,
    },
  });

const query = `query Query($token: String) {
                validToken(token: $token) {
                  node {
                    errors {
                      token
                    }
                    expired
                  }
                  status {
                    code
                    message
                    error
                  }
                }
              }`;
