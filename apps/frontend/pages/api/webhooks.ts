import { RouteHandler } from "../../lib/routeHandler";
import type { NextApiRequest, NextApiResponse } from "next";
import mail from "@sendgrid/mail";

mail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: "andrew@hatchhead.co", // Change to your recipient
  from: "mortocks@gmail.com", // Change to your verified sender
  subject: "Sending with SendGrid is Fun",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>",
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await RouteHandler(req, res, {
    POST: async (req, res) => {
      // https://docs.snipcart.com/v3/webhooks/introduction
      // spell-checker:disable-next-line
      const token = req.headers[`x-snipcart-requesttoken`];
      const url = `https://app.snipcart.com/api/requestvalidation/${token}`;

      console.log("token", token, req.body);

      if (!token) {
        res.send(401);
      }

      const response = await fetch(url, {
        headers: {
          Authorization: `Basic ${process.env.SNIPCART_PUBLIC_KEY}`,
          Accept: "application/json",
        },
      });
      console.log("status", response.status);
      console.log("data", response.body);

      if (response.status === 200) {
        console.log("VALID TOKEN");
      }

      mail
        .send(msg)
        .then((response) => {
          console.log(response[0].statusCode);
          console.log(response[0].headers);
        })
        .catch((error) => {
          console.error(error);
        });

      res.status(200);
    },
  });
}
