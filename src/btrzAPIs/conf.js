export function getConfig(env) {
  let domain = null;
  switch (env) {
    case "production":
      domain = "api.betterez.com";
      break;
    case "sandbox":
      domain = "sandbox-api.betterez.com";
      break;
    default:
      console.log(
        "Please make sure to set the env"
      );
      break;
  }

  if (!domain) {
    return {}
  }

  return {
    inventory: `https://${domain}/inventory`,
    operations: `https://${domain}/operations`,
    gps: `https://${domain}/gps`
  }
}

