
import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Row,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import * as React from "react";

interface ForgetPasswordEmailProps {
  username?: string;
  number?: string | number;
  store_name?: string;
}

const ForgetPasswordEmailTemplate: React.FunctionComponent<ForgetPasswordEmailProps> = ({ username, number, store_name }) => {
  const resetPasswordLink = `http://localhost:3000/reset-password/${number}`;

  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-white my-auto text-left mx-auto font-sans px-2">
          <Container className="border border-solid border-gray-300 rounded my-10 mx-auto p-8 w-[55rem]">
            <Row>
              <Img
                className="rounded-full w-16 h-16 aspect-square object-cover"
                alt="Reset Password Form"
                src="https://ytufhhjagjdypstaklfh.supabase.co/storage/v1/object/public/data/impressed.png"
                width={40}
                height={40}
              />
            </Row>
            <Row>
              <Column>
                <Heading className="text-3xl font-bold text-gray-900">
                  Hello, {username}
                </Heading>
              </Column>
            </Row>
            <Row>
              <Column>
                <Text className="text-gray-900 mt-4">
                  We received a request to reset your password. If you did not make this request, you can safely ignore this email.
                </Text>
              </Column>
            </Row>
            <Row>
              <Column>
                <Link className="text-white bg-[#ff5420] rounded px-4 py-2 mt-2 inline-block" href={resetPasswordLink}>
                  Reset Password
                </Link>
              </Column>
            </Row>
            <Row>
              <Column>
                <Text className="text-gray-600 text-sm">
                  Please ignore this email if you did not request a password reset.
                </Text>
              </Column>
            </Row>
            <Row>
              <Column>
                <Text className="text-gray-900 font-semibold mt-4">Thank you,</Text>
              </Column>
            </Row>
            <Row>
              <Column>
                <span
                className="px-4 text-sm text-[#ff5420] bg-[#ff842096] rounded-full mt-4 inline-block"
                >
                  {store_name}
                </span>
              </Column>
            </Row>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ForgetPasswordEmailTemplate;
