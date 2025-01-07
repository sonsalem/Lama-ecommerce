import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { cookies } from "next/headers";
import { currentCart } from "@wix/ecom";
import { members } from "@wix/members";
import Cookies from "js-cookie";

export const WixCLientServer = async () => {
  let refreshToken;

  try {
    // const cookieStore = Cookies<string>();
    refreshToken = JSON.parse(Cookies.get("refreshToken") || "{}");
  } catch (error) {
    console.error("Error parsing refreshToken:", error);
  }

  const WixCLient = createClient({
    modules: {
      products,
      collections,
      currentCart,
      members,
    },
    auth: OAuthStrategy({
      clientId: `${`7391ac8c-1463-4e41-a195-6e94d06ec637`}`,
      tokens: {
        refreshToken,
        accessToken: { value: "", expiresAt: 0 },
      },
    }),
  });

  return WixCLient;
};
